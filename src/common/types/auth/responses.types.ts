import { UserProfile } from '../objects/user.types';
import { RiskSeverity, SecurityFlag } from '../security/security.types';
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
export interface AuthResponse {
  user: {
    id: string;
    email: string;
    isEmailVerified: boolean;
    isNewUser: boolean;
  };
  session: SessionInfo;
  security: {
    isValid: boolean;
    riskLevel: RiskSeverity;
    flags: SecurityFlag[];
    requiresVerification: boolean;
    trustScore: number;
  };
  csrfToken: string;
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

export interface CurrentUserResponse {
  user: {
    id: string;
    email: string;
    isEmailVerified: boolean;
    profile?: UserProfile;
  };
  session: {
    id: string;
    status: SessionStatus;
    device: DeviceInfo;
    expiresAt: string;
    lastActivity: string;
  };
  recentActivity?: Array<{
    type: string;
    timestamp: string;
    details: Record<string, any>;
  }>;
}
