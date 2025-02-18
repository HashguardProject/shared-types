import { Session, SessionStatus, VerificationStatus } from '../objects/session.types';
import { GeoLocation } from '../geolocation.types';
import { DeviceType, Platform, DeviceTrustLevel } from '../objects/device.types';
import { RiskSeverity, SecurityFlag } from '../security/security.types';
import { VerificationMethod } from '../auth/auth.types';

  export interface SessionResponse {
    id: string;
    userId: string;
    state: SessionState;
    metadata: SessionMetadata;
    device?: SessionDeviceInfo;
  }

  export interface SessionDeviceInfo {
    id: string;
    type: DeviceType;
    platform: Platform;
    info: {
      userAgent?: string;
      lastKnownIp?: string;
      location?: string;
    };
    metadata: {
      lastVerification: Date;
      nextVerification: Date;
      verificationAttempts?: number;
      source: string;
    };
    firstSeen: Date;
    lastSeen: Date;
    fingerprint?: string;
    trustLevel?: DeviceTrustLevel;
    verificationStatus?: VerificationStatus;
  }

  export interface SessionMetadata {
    source: string;
    timestamp: Date;
    userAgent: string;
    ipAddress: string;
    platform?: Platform;
    lastActivity: Date;
    [key: string]: any;
  }

  export interface SessionHistoryEntry {
    action: 'created' | 'activated' | 'suspended' | 'expired' | 'terminated' | 'updated';
    status: SessionStatus;
    timestamp: Date;
    reason?: string;
    metadata?: {
      source: string;
      timestamp: Date;
      [key: string]: any;
    };
  }

  export interface SessionState {
    status: SessionStatus;
    createdAt: Date;
    expiresAt: Date;
    lastModified: Date;
    isRevoked: boolean;
    revokedAt?: Date;
    revokedReason?: string;
    history: SessionHistoryEntry[];
  }

  export interface SessionUpdateOptions {
    preserveHistory?: boolean;
    action?: string;
    reason?: string;
    cache?: {
      skipCache?: boolean;
      invalidateRelated?: boolean;
      ttl?: number;
    };
    metadata?: Record<string, any>;
    validationType?: 'session' | 'device' | 'all';
  }



export interface SessionValidationResult {
  isValid: boolean;
  errors?: Array<{
    code: string;
    message: string;
    severity: RiskSeverity;
    details?: any;
  }>;
  session?: SessionResponse;
  // security?: {
  //   isValid: boolean;
  //   riskLevel: RiskSeverity;
  //   flags: SecurityFlag[];
  //   requiresVerification: boolean;
  //   trustScore: number;
  // };
  context?: {
    source: string;
    timestamp: Date;
    validationType: 'session' | 'security' | 'binding' | 'all';
    metadata: Record<string, any>;
  };
}
