import { DeviceInfo } from './device.types';
import { RiskSeverity, SecurityFlag } from '../security/security.types';
import { GeoLocation, VerificationMethod } from '../../..';

/**
 * Represents metadata about a user's session
 * @interface SessionMetadata
 */
export interface SessionMetadata {
  /** IP address of the session */
  ip: string;
  /** Operating system platform */
  platform?: string;
  /** Array of browser information */
  browser?: BrowserInfo[];
  /** Geographic location information */
  location?: {
    /** ISO country code */
    country?: string;
    /** City name */
    city?: string;
    /** Geographic coordinates */
    coordinates?: {
      /** Latitude in decimal degrees */
      latitude: number;
      /** Longitude in decimal degrees */
      longitude: number;
    };
  };
}

/**
 * Represents the security context of a session
 * @interface SessionSecurityContext
 */
export interface SessionSecurityContext {
  /** Unique identifier for the device */
  deviceId: string;
  /** Hash of the browser's fingerprint */
  browserFingerprint: string;
  /** Current trust level of the device */
  trustLevel: DeviceTrustLevel;
  /** Array of security flags associated with the session */
  riskFlags: SecurityFlag[];
  /** Timestamp of the last security verification */
  lastVerification?: Date;
  /** Method used for the last verification */
  verificationMethod?: VerificationMethod;
}

/**
 * Represents the trust level of a device
 * @enum {string}
 */
export enum DeviceTrustLevel {
  /** Device is explicitly marked as untrusted */
  UNTRUSTED = 'untrusted',
  /** First time seeing this device */
  NEW = 'new',
  /** Device has been seen before */
  RECOGNIZED = 'recognized',
  /** Device has been blocked */
  BLOCKED = 'BLOCKED',
  /** Device has been revoked */
  REVOKED = 'REVOKED',
  /** Device has passed basic trust checks */
  TRUSTED = 'trusted',
  /** Device has passed advanced verification */
  VERIFIED = 'verified',
  /** Low risk */
  LOW = 'LOW',
  /** Medium risk */
  MEDIUM = 'MEDIUM',
  /** High risk */
  HIGH = 'HIGH',
}

/**
 * Represents browser brand and version information
 * @interface BrowserInfo
 */
export interface BrowserInfo {
  /** Browser brand name */
  brand: string;
  /** Browser version string */
  version: string;
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

/**
 * Represents a user session
 * @interface Session
 */
export interface Session {
  /** Unique session identifier */
  id: string;
  /** Associated user ID */
  userId: string;
  /** Device information */
  device: {
    /** Device identifier */
    id: string;
    /** Browser identifier */
    browserId: string;
    /** Device details */
    info: DeviceInfo;
    /** Trust level of device */
    trustLevel: DeviceTrustLevel;
    /** When device was first seen */
    firstSeen: Date;
    /** When device was last verified */
    lastVerified: Date;
  };
  /** Session risk level */
  riskLevel: RiskSeverity;
  /** Current session state */
  state: SessionStatus;
  /** When session expires */
  expiresAt: Date;
  /** Last activity timestamp */
  lastActivity: Date;
  /** Last token refresh timestamp */
  lastTokenRefresh?: Date;
  /** Whether session is revoked */
  isRevoked: boolean;
  /** When session was revoked */
  revokedAt?: Date;
  /** Reason for revocation */
  revokedReason?: string;
  /** Geographic location */
  location?: GeoLocation;
  /** Session verification details */
  verification: SessionVerification;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}
