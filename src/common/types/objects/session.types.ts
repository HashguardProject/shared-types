import { DeviceInfo } from './device.types';
import { RiskSeverity, SecurityFlag } from '../security/security.types';
import { GeoLocation, VerificationMethod } from '../../..';
import { DeviceType, Platform, DeviceTrustLevel } from './device.types';




  export interface Session {
    id: string;
    status: SessionStatus; 
    device: {
      id: string;
      type: DeviceType; 
      platform: Platform;
      info: {
        userAgent: string;
        lastKnownIp?: string;
        location?: string;
      };
      trustLevel: DeviceTrustLevel;
      firstSeen: Date;
      lastVerified: Date;
    };
    metadata: {
      lastActivity: Date;
      ipAddress: string;
      platform?: Platform;
    };
    expiresAt: Date;
    verification: {
      status: VerificationStatus; 
      method?: VerificationMethod; 
      lastVerified?: Date;
      expiresAt?: Date;
    };
  }

  // For session listing and management in frontend
  export interface SessionSummary {
    id: string;
    status: SessionStatus;
    device: {
      type: DeviceType;
      platform: Platform;
      info: {
        userAgent: string;
        location?: string;
      };
    };
    lastActivity: Date;
    isCurrent: boolean;
  }

  // For session verification in frontend
  export interface VerificationChallenge {
    id: string;
    type: VerificationMethod;
    expiresAt: Date;
  }

  // For session verification response
  export interface VerificationResult {
    success: boolean;
    method: VerificationMethod;
    timestamp: Date;
  }




export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  TERMINATED = 'TERMINATED',
  EXPIRED = 'EXPIRED',
  RECOVERED = 'RECOVERED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  BLOCKED = 'BLOCKED',
}

export enum VerificationStatus {
  NONE = 'NONE',
  PENDING = 'PENDING',
  REQUIRED = 'REQUIRED',
  VERIFIED = 'VERIFIED',
  BLOCKED = 'BLOCKED',
  EXPIRED = 'EXPIRED',
}

/**
 * Represents verification attempts and status for a session
 * @interface SessionVerification
 */
export interface SessionVerification {
  /** Current verification status */
  status: VerificationStatus;
  /** Method used for verification */
  method?: VerificationMethod;
  /** When the verification expires */
  expiresAt?: Date;
  /** Verification attempt tracking */
  attempts: {
    /** Number of attempts made */
    count: number;
    /** When attempts are blocked until */
    blockedUntil?: Date;
  };
  /** Timestamp of last verification attempt */
  lastAttempt?: Date;
}

export interface DeviceContext {
  id?: string;
  browserId?: string;
  info?: DeviceInfo;
  trustLevel?: DeviceTrustLevel;
  firstSeen: Date;
  lastVerified: Date;
}

