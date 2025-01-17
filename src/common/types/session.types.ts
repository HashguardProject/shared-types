import { SecurityFlag } from "./security/security.types";

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
  verificationMethod?: string;
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
  /** Device has passed basic trust checks */
  TRUSTED = 'trusted',
  /** Device has passed advanced verification */
  VERIFIED = 'verified',
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
