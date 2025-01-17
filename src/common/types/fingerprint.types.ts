// fingerprint.types.ts
import { RiskSeverity } from './security/security.types';
import { OperatingSystem } from './device.types';

/**
 * Core fingerprint components
 */
export interface FingerprintComponents {
  hardware: {
    screen: {
      width: number;
      height: number;
      ratio: number;
    };
    colorDepth: number;
    cores: number;
  };
  system: {
    platform: OperatingSystem;
    language: string;
    timezone: string;
  };
  browser: {
    name: string;
    version: string;
    engine: string;
  };
}

/**
 * Complete fingerprint structure
 */
export interface Fingerprint {
  hash: string;
  components: FingerprintComponents;
  canvas?: string;
  webgl?: string;
  timestamp: number;
  confidence: number;
}

/**
 * Validation result for component matching
 */
export interface ComponentMatch {
  matched: boolean;
  confidence: number;
  reason?: string;
}

/**
 * Detailed fingerprint validation result
 */
export interface FingerprintValidation {
  score: number;
  riskLevel: RiskSeverity;
  entropyScore: number;
  matches: {
    hardware: number;
    software: number;
    network: number;
    browser: number;
  };
  timestamp: Date;
  detailedMatches: ComponentMatch[];
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
