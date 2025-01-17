import { ComponentMatch } from "../fingerprint.types";

// validation.types.ts
export interface ValidationResult {
  isValid: boolean;
  score: number;
  confidence: number;
  matches: ComponentMatch[];
  metadata?: Record<string, unknown>;
}

export interface SecurityError {
  code: SecurityErrorCode;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
  requestId?: string;
}

export enum SecurityErrorCode {
  INVALID_TOKEN = 'invalid_token',
  EXPIRED_TOKEN = 'expired_token',
  INVALID_FINGERPRINT = 'invalid_fingerprint',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  VERIFICATION_REQUIRED = 'verification_required',
  SESSION_EXPIRED = 'session_expired',
}
