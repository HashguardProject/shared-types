// security.types.ts
/**
 * Risk severity levels for security assessments
 * @enum {string}
 */
export enum RiskSeverity {
  /** Minimal security concern */
  LOW = "low",
  /** Elevated security concern */
  MEDIUM = "medium",
  /** Significant security concern */
  HIGH = "high",
  /** Severe security concern requiring immediate action */
  CRITICAL = "critical",
}

/**
 * Security flags indicating specific security conditions
 * @enum {string}
 */
export enum SecurityFlag {
  /** Additional verification step required */
  VERIFICATION_REQUIRED = "verification_required",
  /** Access from unusual geographic location */
  SUSPICIOUS_LOCATION = "suspicious_location",
  /** Unusual user behavior detected */
  UNUSUAL_BEHAVIOR = "unusual_behavior",
  /** Unrecognized device */
  NEW_DEVICE = "new_device",
  /** Connection through Tor network */
  TOR_NETWORK = "tor_network",
  /** Connection through proxy server */
  KNOWN_PROXY = "known_proxy",
  /** Connection through VPN */
  KNOWN_VPN = "known_vpn",
  /** Connection from hosting provider */
  HOSTING_PROVIDER = "hosting_provider",
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
