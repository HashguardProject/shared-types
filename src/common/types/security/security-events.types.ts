import { RiskSeverity } from "./security.types";

// security-events.types.ts
export interface SecurityEvent {
  type: SecurityEventType;
  severity: RiskSeverity;
  timestamp: Date;
  metadata: {
    sessionId?: string;
    userId?: string;
    deviceId?: string;
    location?: string;
    userAgent?: string;
  };
  context?: Record<string, unknown>;
}

export enum SecurityEventType {
  NEW_DEVICE = 'new_device',
  SUSPICIOUS_LOGIN = 'suspicious_login',
  TOKEN_COMPROMISED = 'token_compromised',
  BRUTE_FORCE_ATTEMPT = 'brute_force_attempt',
  VERIFICATION_SUCCESS = 'verification_success',
  VERIFICATION_FAILURE = 'verification_failure',
}
