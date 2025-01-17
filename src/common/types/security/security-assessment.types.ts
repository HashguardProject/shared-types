import { SecurityFlag, RiskSeverity } from "./security.types";

/**
 * Complete security assessment result
 * @interface SecurityAssessment
 */
export interface SecurityAssessment {
  /** Overall risk level determined from factors */
  riskLevel: RiskSeverity;
  /** Active security flags */
  flags: SecurityFlag[];
  /** Individual security factors contributing to assessment */
  factors: SecurityFactor[];
  /** Recommended security actions */
  recommendations: SecurityRecommendation[];
  /** Assessment timestamp */
  timestamp: Date;
}

/**
 * Individual security factor evaluation
 * @interface SecurityFactor
 */
export interface SecurityFactor {
  /** Type of security factor */
  type: SecurityFactorType;
  /** Factor importance weight (0-1) */
  weight: number;
  /** Factor evaluation score (0-1) */
  score: number;
  /** Additional factor-specific data */
  metadata?: Record<string, unknown>;
}

/**
 * Types of security factors considered in assessment
 * @enum {string}
 */
export enum SecurityFactorType {
  /** Geographic location analysis */
  LOCATION = 'location',
  /** Device trust level evaluation */
  DEVICE_TRUST = 'device_trust',
  /** User behavior analysis */
  BEHAVIOR = 'behavior',
  /** Network characteristics */
  NETWORK = 'network',
  /** Temporal patterns */
  TIME = 'time',
  /** Browser fingerprint analysis */
  FINGERPRINT = 'fingerprint',
}

/**
 * Security recommendation for identified risks
 * @interface SecurityRecommendation
 */
export interface SecurityRecommendation {
  /** Type of recommendation */
  type: RecommendationType;
  /** Recommendation urgency level */
  priority: Priority;
  /** Explanation of the recommendation */
  reason: string;
  /** Suggested action to take */
  action: string;
}

/**
 * Types of security recommendations
 * @enum {string}
 */
export enum RecommendationType {
  /** Device verification needed */
  VERIFY_DEVICE = 'verify_device',
  /** Two-factor authentication recommended */
  ENABLE_2FA = 'enable_2fa',
  /** Password change recommended */
  PASSWORD_CHANGE = 'password_change',
  /** Suspicious login attempt detected */
  SUSPICIOUS_LOGIN = 'suspicious_login',
}

/**
 * Priority levels for recommendations
 * @enum {string}
 */
export enum Priority {
  /** Suggestion for improved security */
  LOW = 'low',
  /** Important security improvement */
  MEDIUM = 'medium',
  /** Urgent security action needed */
  HIGH = 'high',
  /** Immediate action required */
  CRITICAL = 'critical',
}
