import { Fingerprint } from '../objects/fingerprint.types';
import { DeviceInfo } from '../objects/device.types';
import { User } from '../objects/user.types';
import { Session, SessionStatus, VerificationStatus } from '../objects/session.types';
import { RiskSeverity, SecurityFlag } from '../security/security.types';

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
  platform?: string;
}

export interface TokenRotationDto {
  fingerprint: Fingerprint;
}

export interface AuthTokenResponse {
  session_info: SessionInfo;
  csrf: {
    token: string;
    expiresAt: string;
  };
  user: {
    _id: string;
    email: string;
    isEmailVerified: boolean;
  };
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
}

export interface RefreshTokenDto {
  fingerprint: Fingerprint;
}

export type RefreshTokenResponse = AuthTokenResponse;

export interface LogoutRequestDto {
  sessionId: string;
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
 * Session Types
 */
export interface SessionInfo {
  id: string;
  userId: string;
  deviceInfo: DeviceInfo;
  createdAt: string;
  expiresAt: string;
  lastActive: string;
  status: SessionStatus;
  isCurrentSession?: boolean;
  securityState: {
    riskLevel: RiskSeverity;
    trustScore: number;
    verificationStatus: VerificationStatus;
    restrictions: SecurityFlag[];
  };
}

/**
 * Required Headers
 */
export interface RequiredHeaders {
  'x-csrf-token'?: string;
  Authorization?: string;
  'x-request-id'?: string;
  'x-device-type'?: string;
  'x-fingerprint'?: string;
}