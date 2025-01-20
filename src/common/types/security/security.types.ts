// security.types.ts
/**
 * Risk severity levels for security assessments
 * @enum {string}
 */
export enum RiskSeverity {
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

  // Location and Network flags
  LOCATION_CHANGE = 'location_change',
  SUSPICIOUS_IP = 'suspicious_ip',
  VPN_DETECTED = 'vpn_detected',
  TOR_EXIT_NODE = 'tor_exit_node',
  PROXY_DETECTED = 'proxy_detected',
  SUSPICIOUS_LOCATION = 'suspicious_location',

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
