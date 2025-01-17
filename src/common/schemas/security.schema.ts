import { z } from 'zod';
import { RiskSeverity, SecurityFlag } from '../types/security/security.types';

export const RiskSeveritySchema = z.nativeEnum(RiskSeverity);

export const SecurityFlagSchema = z.nativeEnum(SecurityFlag);

export const SecurityContextSchema = z.object({
  riskLevel: RiskSeveritySchema,
  flags: z.array(SecurityFlagSchema),
  requiresVerification: z.boolean(),
  lastVerification: z.date().optional(),
  trustScore: z
    .number()
    .min(0)
    .max(1)
    .transform(v => Number(v.toFixed(4))), // Ensure consistent precision
});

export type SecurityContextSchemaType = z.infer<typeof SecurityContextSchema>;

/**
 * Validates if a trust score is within valid range
 * @param score - Trust score to validate
 */
export const isValidTrustScore = (score: number): boolean => {
  return score >= 0 && score <= 1;
};

/**
 * Maps risk severity to trust score ranges
 */
export const RISK_SEVERITY_RANGES = {
  [RiskSeverity.LOW]: { min: 0.75, max: 1.0 },
  [RiskSeverity.MEDIUM]: { min: 0.5, max: 0.74 },
  [RiskSeverity.HIGH]: { min: 0.25, max: 0.49 },
  [RiskSeverity.CRITICAL]: { min: 0, max: 0.24 },
} as const;
