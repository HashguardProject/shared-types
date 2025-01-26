import { Fingerprint } from '../objects/fingerprint.types';
import { DeviceInfo, Platform } from '../objects/device.types';
import { User } from '../objects/user.types';
import { Session, SessionStatus, VerificationStatus } from '../objects/session.types';
import { RiskSeverity, SecurityFlag } from '../security/security.types';
import { JwtPayload } from '../auth/passport.types';

export enum VerificationMethod {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  TOTP = 'TOTP',
  WEBAUTHN = 'WEBAUTHN',
}

/**
 * Authentication Routes DTOs
 */
export interface MagicLinkRequestDto {
  email: string;
  fingerprint: Fingerprint;
}

export interface MagicLinkResponse {
  email: string;
  expiresIn: number;
  isNewUser: boolean;
  message: string;
  deviceInfo?: {
    recognized: boolean;
    lastSeen?: string;
    location?: string;
  };
}

export interface MagicLinkVerifyDto {
  token: string;
  fingerprint: Fingerprint;
  platform?: Platform;
}

export interface TokenRotationDto {
  fingerprint: Fingerprint;
}

export interface AuthTokenResponse {
  session_info: Session;
  csrf: {
    token: string;
    expiresAt: string;
  };
  user: {
    id: string;
    isNewUser: boolean;
    email?: string;
    isEmailVerified?: boolean;
  };
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  token_type: 'Bearer';
  expires_in: number;
  scope?: string;
}

export interface RefreshTokenDto {
  fingerprint: Fingerprint;
  refresh_token: string;
}

export interface TokenValidationDto {
  token: string;
  fingerprint: Fingerprint;
}

export interface TokenValidationResponse {
  valid: boolean;
  payload?: JwtPayload;
  error?: string;
}

export type RefreshTokenResponse = AuthTokenResponse;

export interface LogoutRequestDto {
  sessionId: string;
  deviceId?: string;
}

export interface LogoutResponse {
  message: string;
  sessionId: string;
}

export interface CurrentUserResponse {
  user: User;
  session: Session;
}

/**
 * Required Headers
 */
export interface RequiredHeaders {
  'x-csrf-token'?: string;
  Authorization?: string;
  'x-request-id'?: string;
  'x-device-type'?: string;
  'x-device-platform'?: string;
  'x-browser-info'?: string;
  'x-fingerprint'?: string;
}
