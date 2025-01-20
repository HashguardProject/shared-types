import {
  isSessionMetadata,
  isSessionSecurityContext,
  isDeviceTrustLevel,
  parseSessionMetadata,
  // parseSessionSecurityContext,
} from '../guards/session.guards';
import { DeviceTrustLevel } from '../objects/session.types';

describe('Session Types', () => {
  describe('SessionMetadata', () => {
    it('should validate correct metadata structure', () => {
      const validMetadata = {
        ip: '192.168.1.1',
        platform: 'Windows',
        browser: [{ brand: 'Chrome', version: '96.0.4664.110' }],
        location: {
          country: 'US',
          city: 'New York',
          coordinates: {
            latitude: 40.7128,
            longitude: -74.006,
          },
        },
      };

      expect(isSessionMetadata(validMetadata)).toBe(true);
      expect(parseSessionMetadata(validMetadata)).toEqual(validMetadata);
    });

    it('should validate minimal metadata structure', () => {
      const minimalMetadata = {
        ip: '192.168.1.1',
      };

      expect(isSessionMetadata(minimalMetadata)).toBe(true);
    });

    it('should reject invalid metadata structure', () => {
      const invalidMetadata = {
        ip: 'invalid-ip',
      };

      expect(isSessionMetadata(invalidMetadata)).toBe(false);
      expect(parseSessionMetadata(invalidMetadata)).toBeNull();
    });
  });

  describe('SessionSecurityContext', () => {
    it('should validate correct security context', () => {
      const validContext = {
        deviceId: '123e4567-e89b-12d3-a456-426614174000',
        browserFingerprint: '0123456789abcdef0123456789abcdef',
        trustLevel: DeviceTrustLevel.TRUSTED,
        riskFlags: [],
        lastVerification: new Date(),
        verificationMethod: '2FA',
      };

      expect(isSessionSecurityContext(validContext)).toBe(true);
      // expect(parseSessionSecurityContext(validContext)).toEqual(validContext);
    });

    it('should reject invalid security context', () => {
      const invalidContext = {
        deviceId: 'invalid-uuid',
        browserFingerprint: 'short',
        trustLevel: 'invalid-level',
        riskFlags: [],
      };

      expect(isSessionSecurityContext(invalidContext)).toBe(false);
      // expect(parseSessionSecurityContext(invalidContext)).toBeNull();
    });
  });

  describe('DeviceTrustLevel', () => {
    it('should validate trust level enum values', () => {
      expect(isDeviceTrustLevel(DeviceTrustLevel.UNTRUSTED)).toBe(true);
      expect(isDeviceTrustLevel(DeviceTrustLevel.NEW)).toBe(true);
      expect(isDeviceTrustLevel(DeviceTrustLevel.RECOGNIZED)).toBe(true);
      expect(isDeviceTrustLevel(DeviceTrustLevel.TRUSTED)).toBe(true);
      expect(isDeviceTrustLevel(DeviceTrustLevel.VERIFIED)).toBe(true);
    });

    it('should reject invalid trust level values', () => {
      expect(isDeviceTrustLevel('invalid-level')).toBe(false);
    });
  });
});
