import { RiskSeverity } from './security.types';

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
    ip?: string;
  };
  context?: Record<string, unknown>;
}

export enum SecurityEventType {
  // Authentication Events
  AUTH_LOGIN_SUCCESS = 'auth.login.success',
  AUTH_LOGIN_FAILED = 'auth.login.failed',
  AUTH_LOGOUT = 'auth.logout',
  AUTH_PASSWORD_CHANGED = 'auth.password.changed',
  AUTH_EMAIL_CHANGED = 'auth.email.changed',
  AUTH_MFA_CHALLENGED = 'auth.mfa.challenged',
  AUTH_MFA_SUCCEEDED = 'auth.mfa.succeeded',
  AUTH_MFA_FAILED = 'auth.mfa.failed',

  // Session Events
  SESSION_CREATED = 'session.created',
  SESSION_EXPIRED = 'session.expired',
  SESSION_TERMINATED = 'session.terminated',
  SESSION_RECOVERED = 'session.recovered',
  SESSION_BLOCKED = 'session.blocked',
  SESSION_HIJACKING_ATTEMPT = 'session.hijacking.attempt',
  SESSION_CONCURRENT = 'session.concurrent',
  SESSION_UPDATED = 'session.updated',

  // Security Events
  SECURITY_ASSESSMENT_UPDATED = 'security.assessment.updated',
  SECURITY_RISK_DETECTED = 'security.risk.detected',
  SECURITY_THRESHOLD_EXCEEDED = 'security.threshold.exceeded',
  SECURITY_VIOLATION = 'security.violation',
  SECURITY_BRUTE_FORCE = 'security.brute_force',
  SECURITY_RATE_LIMIT = 'security.rate_limit',
  SECURITY_UNAUTHORIZED = 'security.unauthorized',
  SECURITY_THREAT_DETECTED = 'security.threat.detected',

  // Device Events
  DEVICE_FINGERPRINT_CHANGED = 'device.fingerprint.changed',
  DEVICE_LOCATION_CHANGED = 'device.location.changed',
  DEVICE_TRUST_CHANGED = 'device.trust.changed',
  DEVICE_NEW_DETECTED = 'device.new.detected',
  DEVICE_BLOCKED = 'device.blocked',
  DEVICE_VERIFIED = 'device.verified',
  DEVICE_MULTIPLE_ACTIVE = 'device.multiple.active',

  // Network Events
  NETWORK_LOCATION_MISMATCH = 'network.location.mismatch',
  NETWORK_SUSPICIOUS_LOCATION = 'network.location.suspicious',
  NETWORK_SUSPICIOUS_IP = 'network.ip.suspicious',
  NETWORK_VPN_DETECTED = 'network.vpn.detected',
  NETWORK_PROXY_DETECTED = 'network.proxy.detected',
  NETWORK_TOR_DETECTED = 'network.tor.detected',

  // Verification Events
  VERIFICATION_REQUIRED = 'verification.required',
  VERIFICATION_SUCCEEDED = 'verification.succeeded',
  VERIFICATION_FAILED = 'verification.failed',

  // Token Events
  TOKEN_UPDATED = 'token.updated',
  TOKEN_ROTATED = 'token.rotated',
  TOKEN_INVALIDATED = 'token.invalidated',

  // Behavioral Events
  BEHAVIOR_UNUSUAL_ACTIVITY = 'behavior.unusual.activity',
  BEHAVIOR_ANOMALY = 'behavior.anomaly',
  BEHAVIOR_TIME_ANOMALY = 'behavior.time.anomaly',
  BEHAVIOR_CONCURRENT_ACCESS = 'behavior.concurrent.access'
}

