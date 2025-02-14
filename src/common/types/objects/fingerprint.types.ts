// fingerprint.types.ts
import { GeoLocation } from '../geolocation.types';
import { RiskSeverity } from '../security/security.types';
import { DeviceType } from './device.types';

// Enhanced hardware components
export interface HardwareComponents {
  screen: {
    width: number;
    height: number;
    ratio: number;
    orientation?: 'portrait' | 'landscape';
    touchSupport?: boolean;
  };
  colorDepth: number;
  cores: number;
  memory?: number;
  gpu?: {
    vendor: string;
    renderer: string;
  };
}

// Enhanced system components
export interface SystemComponents {
  os: {
    name: string;
    version: string;
    architecture?: string;
  };
  platform: string;
  language: string;
  timezone: string;
  timezoneOffset?: number;
  deviceType?: DeviceType;
}

// Enhanced browser components
export interface BrowserComponents {
  name: string;
  version: string;
  engine: string;
  plugins?: string[];
  doNotTrack?: boolean;
  cookiesEnabled?: boolean;
  localStorage?: boolean;
  sessionStorage?: boolean;
}

export interface Fingerprint {
  hash: string;
  components: {
    hardware: HardwareComponents;
    system: SystemComponents;
    browser: BrowserComponents;
  };
  location?: GeoLocation;
  canvas?: string;
  webgl?: string;
  audio?: string;
  fonts?: string[];
  metadata?: {
    collectionDuration?: number;
    lastUpdate?: Date;
    source?: string;
    headerValidation?: boolean;
    validationDuration?: number;
    deviceId?: string;
    browserId?: string;
    sessionId?: string;
  };
  timestamp: number;
  confidence: number;
}

export interface ComponentMatch {
  matched: boolean;
  confidence: number;
  reason?: string;
  details?: {
    expectedValue?: any;
    actualValue?: any;
    threshold?: any;
  };
}

export interface FingerprintValidation {
  score: number;
  entropyScore: number;
  matches: Record<string, number>;
  timestamp: Date;
  detailedMatches?: ComponentMatch[];
  riskLevel: RiskSeverity;
  analysis?: {
    uniqueness: number;
    stability: number;
    spoofingProbability: number;
    lastValidMatch?: Date;
    validationDuration?: number;
  };
}

export interface FingerprintData {
  fingerprint: Fingerprint;
  validation: FingerprintValidation;
  history?: {
    lastSeen: Date;
    changes: Array<{
      timestamp: Date;
      component: string;
      oldValue: any;
      newValue: any;
    }>;
  };
}

export interface ValidationDetails {
  headerMatches: HeaderMatch[];
  confidence: number;
  source: string;
  validatedAt: Date;
}

export interface HeaderMatch {
  component: string;
  matches: boolean;
  confidence: number;
}

export interface HeaderValidation {
  isValid: boolean;
  matches: HeaderMatch[];
}

export interface ClientHintsHeaders {
  userAgent?: string;
  platform?: string;
  mobile?: boolean;
  architecture?: string;
  bitness?: string;
  model?: string;
  viewport?: {
    width: number;
    height: number;
    dpr: number;
  };
  memory?: number;
  language?: string;
  browserName?: string;
  browserVersion?: string;
}

/**
 * Request DTOs
 */
export interface FingerprintRequestDto {
  fingerprint: Fingerprint;
}

export interface FingerprintValidationDto extends FingerprintRequestDto {
  sessionId?: string;
  userId?: string;
}
