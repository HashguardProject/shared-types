import { Fingerprint } from './fingerprint.types';
import { RiskSeverity, SecurityFlag } from './security/security.types';

// auth.types.ts
export interface TokenMetadata {
  deviceId: string;
  sessionId: string;
  fingerprint: string;
  issuedAt: number;
  expiresAt: number;
  scope: string[];
}

export interface TokenValidationContext {
  type: TokenType;
  token: string;
  fingerprint: Fingerprint;
  sessionId?: string;
  userId?: string;
}

export interface TokenValidationResult {
  isValid: boolean;
  payload: TokenMetadata;
  security: {
    riskLevel: RiskSeverity;
    flags: SecurityFlag[];
    requiresRotation: boolean;
  };
}

export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  CSRF_TOKEN = 'csrf_token',
  MAGIC_LINK = 'magic_link',
}
