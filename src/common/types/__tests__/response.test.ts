import { z } from 'zod';
import {
  isApiResponseMeta,
  isPaginationMeta,
  isSecurityResponse,
  isAuthenticationResponse,
  isApiResponse,
  parseApiResponse,
  parseSecurityResponse,
} from '../guards/response.guards';
import { RiskSeverity } from '../security/security.types';
import { DeviceTrustLevel } from '../session.types';

describe('Response Types', () => {
  describe('ApiResponseMeta', () => {
    it('should validate correct metadata', () => {
      const validMeta = {
        apiVersion: '1.0',
        timestamp: new Date().toISOString(),
        requestId: '123e4567-e89b-12d3-a456-426614174000',
        responseTime: 100,
        region: 'us-east-1',
      };

      expect(isApiResponseMeta(validMeta)).toBe(true);
    });

    it('should validate metadata with optional fields', () => {
      const metaWithOptionals = {
        apiVersion: '1.0',
        timestamp: new Date().toISOString(),
        features: ['feature1', 'feature2'],
        deprecation: {
          message: 'Deprecated',
          sunsetDate: new Date().toISOString(),
          docUrl: 'https://api.example.com/docs',
        },
        pagination: {
          total: 100,
          page: 1,
          perPage: 10,
          totalPages: 10,
          hasNextPage: true,
          hasPreviousPage: false,
        },
      };

      expect(isApiResponseMeta(metaWithOptionals)).toBe(true);
    });

    it('should reject invalid metadata', () => {
      const invalidMeta = {
        apiVersion: '',
        timestamp: 'invalid-date',
      };

      expect(isApiResponseMeta(invalidMeta)).toBe(false);
    });
  });

  describe('PaginationMeta', () => {
    it('should validate correct pagination', () => {
      const validPagination = {
        total: 100,
        page: 1,
        perPage: 10,
        totalPages: 10,
        hasNextPage: true,
        hasPreviousPage: false,
      };

      expect(isPaginationMeta(validPagination)).toBe(true);
    });

    it('should reject invalid pagination', () => {
      const invalidPagination = {
        total: -1,
        page: 0,
        perPage: -10,
      };

      expect(isPaginationMeta(invalidPagination)).toBe(false);
    });
  });

  describe('ApiResponse', () => {
    const UserSchema = z.object({
      id: z.string().uuid(),
      name: z.string(),
    });

    it('should validate correct API response', () => {
      const validResponse = {
        data: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
        },
        meta: {
          apiVersion: '1.0',
          timestamp: new Date().toISOString(),
        },
        links: {
          self: 'https://api.example.com/users/1',
        },
      };

      expect(isApiResponse(validResponse, UserSchema)).toBe(true);
      expect(parseApiResponse(validResponse, UserSchema)).toEqual(validResponse);
    });

    it('should reject invalid API response', () => {
      const invalidResponse = {
        data: {
          id: 'invalid-uuid',
          name: '',
        },
        meta: {
          apiVersion: '',
        },
      };

      expect(isApiResponse(invalidResponse, UserSchema)).toBe(false);
      expect(parseApiResponse(invalidResponse, UserSchema)).toBeNull();
    });
  });

  describe('SecurityResponse', () => {
    const DataSchema = z.object({
      verified: z.boolean(),
    });

    it('should validate correct security response', () => {
      const validResponse = {
        success: true,
        data: { verified: true },
        meta: {
          requestId: '123e4567-e89b-12d3-a456-426614174000',
          timestamp: new Date(),
        },
        security: {
          riskLevel: RiskSeverity.LOW,
          requiresAction: false,
        },
      };

      expect(isSecurityResponse(validResponse, DataSchema)).toBe(true);
      expect(parseSecurityResponse(validResponse, DataSchema)).toEqual(validResponse);
    });

    it('should validate security response with error', () => {
      const responseWithError = {
        success: false,
        error: {
          code: 'SECURITY_ERROR',
          message: 'Security check failed',
        },
        meta: {
          requestId: '123e4567-e89b-12d3-a456-426614174000',
          timestamp: new Date(),
        },
      };

      expect(isSecurityResponse(responseWithError, DataSchema)).toBe(true);
    });
  });

  describe('AuthenticationResponse', () => {
    it('should validate correct authentication response', () => {
      const validResponse = {
        tokens: {
          accessToken: 'valid-token',
          refreshToken: 'valid-refresh-token',
        },
        session: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          expiresAt: new Date(),
          security: {
            deviceId: '123e4567-e89b-12d3-a456-426614174000',
            browserFingerprint: '0123456789abcdef0123456789abcdef',
            trustLevel: DeviceTrustLevel.TRUSTED,
            riskFlags: [],
          },
        },
        user: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'user@example.com',
          isEmailVerified: true,
        },
      };

      expect(isAuthenticationResponse(validResponse)).toBe(true);
    });

    it('should reject invalid authentication response', () => {
      const invalidResponse = {
        tokens: {
          accessToken: '',
        },
        session: {
          id: 'invalid-uuid',
        },
        user: {
          email: 'invalid-email',
        },
      };

      expect(isAuthenticationResponse(invalidResponse)).toBe(false);
    });
  });
});
