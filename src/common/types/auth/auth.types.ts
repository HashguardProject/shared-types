import { Fingerprint } from '../objects/fingerprint.types';
import { RiskSeverity, SecurityFlag } from '../security/security.types';
import { Session } from '../objects/session.types';

// auth.types.ts
export interface TokenMetadata {
  deviceId: string;
  sessionId: string;
  fingerprint: string;
  issuedAt: number;
  expiresAt: number;
  scope: string[];
  jti?: string;
  iss?: string;
  aud?: string;
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
  ID_TOKEN = 'id_token',
}

export enum AuthState {
  LOGGED_IN = 'logged_in',
  LOGGED_OUT = 'logged_out',
  SESSION_EXPIRED = 'session_expired',
  SESSION_TERMINATED = 'session_terminated',
  PENDING_VERIFICATION = 'pending_verification',
}

export enum TokenState {
  VALID = 'valid',
  EXPIRED = 'expired',
  REFRESHING = 'refreshing',
  NONE = 'none',
  ERROR = 'error',
  REVOKED = 'revoked',
}

export interface TokenRotationOptions {
  userId: string;
  sessionId: string;
  deviceId: string;
  scope?: string[];
  audience?: string[];
  issuer?: string;
  expiresIn?: number;
}
