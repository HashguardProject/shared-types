// security.types.ts
/**
 * Risk severity levels for security assessments
 * @enum {string}
 */
export enum RiskSeverity {
  UNKNOWN = 'unknown',
  /** Minimal security concern */
  LOW = 'low',
  /** Elevated security concern */
  MEDIUM = 'medium',
  /** Significant security concern */
  HIGH = 'high',
  /** Severe security concern requiring immediate action */
  CRITICAL = 'critical',
}

/**
 * Security flags indicating specific security conditions
 * @enum {string}
 */

export enum SecurityFlag {
  // Device-related flags
      FINGERPRINT_COMPONENT_MISMATCH = "fingerprint_component_mismatch",
  FINGERPRINT_SOURCE_MISMATCH = 'fingerprint_source_mismatch',
  FINGERPRINT_CROSS_VALIDATION_FAILED = 'fingerprint_cross_validation_failed',
  SUSPICIOUS_DEVICE = 'suspicious_device',
  NEW_DEVICE = 'new_device',
  DEVICE_SPOOFING = 'device_spoofing',
  FINGERPRINT_MISMATCH = 'fingerprint_mismatch',
  LOW_DEVICE_TRUST = 'low_device_trust',
  MULTIPLE_DEVICES = 'multiple_devices',

  // Token-specific flags
  TOKEN_REUSE_DETECTED = 'token_reuse_detected',
  TOKEN_REUSE_ATTEMPT = 'token_reuse_attempt',
  INVALID_TOKEN = 'invalid_token',
  TOKEN_EXPIRED = 'token_expired',

  // Risk and Verification flags
  HIGH_RISK_DETECTED = 'high_risk_detected',
  VERIFICATION_REQUIRED = 'verification_required',

  // Session-specific flags
  SESSION_INVALID = 'session_invalid',
  SESSION_EXPIRED = 'session_expired',
  SESSION_TERMINATED = 'session_terminated',
  SESSION_REVOKED = 'session_revoked',
  SESSION_BLOCKED = 'session_blocked',
  TOKEN_SESSION_MISMATCH = 'token_session_mismatch',
  SESSION_VERIFIED = 'session_verified',
  SESSION_STATE_ERROR = 'session.state.error',
  SESSION_POLICY_VIOLATION = 'session.policy.violation',

  // Location and Network flags
  LOCATION_CHANGE = 'location_change',
  SUSPICIOUS_IP = 'suspicious_ip',
  VPN_DETECTED = 'vpn_detected',
  TOR_EXIT_NODE = 'tor_exit_node',
  PROXY_DETECTED = 'proxy_detected',
  SUSPICIOUS_LOCATION = 'suspicious_location',
  SECURITY_VIOLATION = 'security_violation',

  // Behavioral flags
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  SUSPICIOUS_BEHAVIOR = 'suspicious_behavior',
  ANOMALOUS_BEHAVIOR = 'anomalous_behavior',
  TIME_ANOMALY = 'time_anomaly',
  CONCURRENT_ACCESS = 'concurrent_access',
  USER_MISMATCH = 'user_mismatch',

  // Attack-related flags
  MULTIPLE_FAILURES = 'multiple_failures',
  BRUTE_FORCE_ATTEMPT = 'brute_force_attempt',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  AUTH_PATTERN_DETECTED = 'auth.pattern_detected',

  TOKEN_EXPIRING_SOON = 'TOKEN_EXPIRING_SOON',

  REQUIRE_TOKEN_ROTATION = 'REQUIRE_TOKEN_ROTATION',

  POTENTIAL_SPOOFING = 'potential_spoofing',
  /** Unusual user behavior detected */
  UNUSUAL_BEHAVIOR = 'unusual_behavior',
  /** Connection through Tor network */
  TOR_NETWORK = 'tor_network',
  /** Connection through proxy server */
  KNOWN_PROXY = 'known_proxy',
  /** Connection through VPN */
  KNOWN_VPN = 'known_vpn',
  /** Connection from hosting provider */
  HOSTING_PROVIDER = 'hosting_provider',
  SUSPICIOUS_FINGERPRINT = 'suspicious_fingerprint',
  UNAUTHENTICATED = 'unauthenticated',
  SESSION_NOT_FOUND = 'session_not_found',
  DEVICE_MISMATCH = 'device_mismatch',
  DEVICE_NOT_FOUND = 'device_not_found',
  SECURITY_BREACH = 'security_breach',
  LOCATION_RISK = 'location_risk',
  LOCATION_VALIDATION_FAILED = 'location_validation_failed',
  CSRF_VALIDATION_FAILED = 'csrf_validation_failed',
  CSRF_TOKEN_INVALID = 'csrf_token_invalid',
  CSRF_TOKEN_MISSING = 'csrf_token_missing',
  CSRF_VALIDATION = 'csrf_validation',
  INVALID_BINDING = 'invalid_binding',
  BINDING_MISMATCH = 'binding_mismatch',
  BINDING_EXPIRED = 'binding_expired',
  BINDING_NOT_FOUND = 'binding_not_found',
  BINDING_REUSED = 'binding_reused',
  BINDING_REUSED_IN_OTHER_SESSION = 'binding_reused_in_other_session',
  BINDING_REUSED_IN_OTHER_DEVICE = 'binding_reused_in_other_device',
  BINDING_REUSED_IN_OTHER_LOCATION = 'binding_reused_in_other_location',
  SESSION_BINDING_FAILED = 'session_binding_failed',
  DEVICE_BINDING_FAILED = 'device_binding_failed',
  TOKEN_ROTATION_FAILED = 'token_rotation_failed',
  TOKEN_ROTATION_POLICY_VIOLATION = 'token_rotation_policy_violation',
  TOKEN_BLACKLISTED = 'token_blacklisted',
}

/**
 * Security context for risk assessment
 * @interface SecurityContext
 */
export interface SecurityContext {
  /** Current risk severity level */
  riskLevel: RiskSeverity;
  /** Active security flags */
  flags: SecurityFlag[];
  /** Whether additional verification is needed */
  requiresVerification: boolean;
  /** Timestamp of last verification */
  lastVerification?: Date;
  /** Computed trust score (0-1) */
  trustScore: number;
}
