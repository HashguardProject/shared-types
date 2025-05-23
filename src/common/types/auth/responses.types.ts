import { UserProfile } from '../objects/user.types';
import { RiskSeverity, SecurityFlag, VerificationMethod } from '../security/security.types';
import { DeviceType, Platform, DeviceTrustLevel, DeviceInfo } from '../objects/device.types';
import { SessionStatus } from '../objects/session.types';

/**
 * Session specific types
 */
export interface SessionInfo {
  id: string;
  status: SessionStatus;
  device?: {
    id: string;
    type: DeviceType;
    platform: Platform;
    trustLevel: DeviceTrustLevel;
    lastVerified: string;
  };
  expiresAt: string;
  lastActivity: string;
}

// API Response types (what gets sent to the client)
export interface AuthResponseBase {
  status: 'success' | 'error';
  message: string;
  userId?: string;
}

export interface AuthResponseSuccess extends AuthResponseBase {
  status: 'success';
  message: string;
  userId: string;
  isNewUser: boolean;
  tokenInfo?: {
    accessExpiry: number;
    refreshExpiry: number;
  };
  mfaRequired?: boolean;
  mfaChallenge?: MfaChallengeResponse;
  csrfToken?: string;
  preAuthToken?: string;
}

export interface MfaChallengeResponse {
  challengeId: string;
  requiredMethod: VerificationMethod;
  availableMethods: VerificationMethod[];
  expiresAt: number;
  metadata?: {
    phoneMasked?: string;
    emailMasked?: string;
  };
}

export interface AuthResponseMfaVerify extends AuthResponseSuccess {
  verified: boolean;
  mfaPassed: boolean;
}

export interface AuthResponseError extends AuthResponseBase {
  status: 'error';
  code: string;
}

export interface AuthResponseMagicLinkRequest extends AuthResponseBase {
  status: 'success';
}

export interface TokenRotationResponse {
  session: {
    id: string;
    status: SessionStatus;
    expiresAt: string;
  };
  security: {
    isValid: boolean;
    riskLevel: RiskSeverity;
    flags: SecurityFlag[];
    requiresVerification: boolean;
    trustScore: number;
  };
  csrfToken: string;
}

export interface MagicLinkResponse {
  email: string;
  expiresIn: number;
  isNewUser: boolean;
  message: string;
  deviceInfo?: {
    recognized: boolean;
    trustLevel: DeviceTrustLevel;
    lastSeen: string;
    location?: string;
  };
}

export interface LogoutResponse {
  message: string;
  sessionId: string;
  timestamp: string;
}

export interface CurrentSessionResponse {
  id: string;
  status: SessionStatus;
  device: DeviceInfo;
  expiresAt: string;
  lastActivity: string;
}

export interface CurrentUserResponse {
  user: {
    id: string;
    email: string;
    isEmailVerified: boolean;
    profile?: UserProfile;
  };
  session: CurrentSessionResponse;
  recentActivity?: Array<{
    type: string;
    timestamp: string;
    details: Record<string, any>;
  }>;
  security: {
    isValid: boolean;
    riskLevel: RiskSeverity;
    flags: SecurityFlag[];
    requiresVerification: boolean;
    trustScore: number;
  };
}
