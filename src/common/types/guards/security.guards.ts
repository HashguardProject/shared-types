import { 
  SecurityContext, 
  RiskSeverity, 
  SecurityFlag 
} from '../security/security.types';
import { 
  SecurityContextSchema,
  RISK_SEVERITY_RANGES,
  isValidTrustScore
} from '../../schemas/security.schema';

/**
 * Type guard for RiskSeverity enum
 * @param value - Value to check
 */
export const isRiskSeverity = (value: unknown): value is RiskSeverity => {
  return Object.values(RiskSeverity).includes(value as RiskSeverity);
};

/**
 * Type guard for SecurityFlag enum
 * @param value - Value to check
 */
export const isSecurityFlag = (value: unknown): value is SecurityFlag => {
  return Object.values(SecurityFlag).includes(value as SecurityFlag);
};

/**
 * Type guard for SecurityContext
 * @param value - Value to check
 */
export const isSecurityContext = (value: unknown): value is SecurityContext => {
  return SecurityContextSchema.safeParse(value).success;
};

/**
 * Utility function to safely parse SecurityContext
 * @param value - Value to parse
 */
export const parseSecurityContext = (value: unknown): SecurityContext | null => {
  const result = SecurityContextSchema.safeParse(value);
  return result.success ? result.data : null;
};

/**
 * Determines risk severity based on trust score
 * @param trustScore - Trust score to evaluate
 */
export const getRiskSeverityFromScore = (trustScore: number): RiskSeverity => {
  if (!isValidTrustScore(trustScore)) {
    throw new Error('Invalid trust score');
  }

  for (const [severity, range] of Object.entries(RISK_SEVERITY_RANGES)) {
    if (trustScore >= range.min && trustScore <= range.max) {
      return severity as RiskSeverity;
    }
  }

  return RiskSeverity.CRITICAL; // Fallback for unexpected cases
};

/**
 * Checks if security context requires verification
 * @param context - Security context to evaluate
 */
export const requiresVerification = (context: SecurityContext): boolean => {
  return context.requiresVerification || 
         context.flags.includes(SecurityFlag.VERIFICATION_REQUIRED) ||
         context.riskLevel === RiskSeverity.CRITICAL;
}; 