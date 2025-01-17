import { z } from 'zod';
import {
  SecurityFactorType,
  RecommendationType,
  Priority,
} from '../types/security/security-assessment.types';
import { RiskSeveritySchema, SecurityFlagSchema } from './security.schema';

export const SecurityFactorSchema = z.object({
  type: z.nativeEnum(SecurityFactorType),
  weight: z
    .number()
    .min(0)
    .max(1)
    .transform(v => Number(v.toFixed(4))),
  score: z
    .number()
    .min(0)
    .max(1)
    .transform(v => Number(v.toFixed(4))),
  metadata: z.record(z.unknown()).optional(),
});

export const SecurityRecommendationSchema = z.object({
  type: z.nativeEnum(RecommendationType),
  priority: z.nativeEnum(Priority),
  reason: z.string().min(1),
  action: z.string().min(1),
});

export const SecurityAssessmentSchema = z.object({
  riskLevel: RiskSeveritySchema,
  flags: z.array(SecurityFlagSchema),
  factors: z
    .array(SecurityFactorSchema)
    .min(1)
    .refine(
      factors => {
        const totalWeight = factors.reduce((sum, factor) => sum + factor.weight, 0);
        return Math.abs(totalWeight - 1) < 0.0001; // Ensure weights sum to 1
      },
      { message: 'Factor weights must sum to 1' },
    ),
  recommendations: z.array(SecurityRecommendationSchema),
  timestamp: z.date(),
});

export type SecurityAssessmentSchemaType = z.infer<typeof SecurityAssessmentSchema>;
export type SecurityFactorSchemaType = z.infer<typeof SecurityFactorSchema>;
export type SecurityRecommendationSchemaType = z.infer<typeof SecurityRecommendationSchema>;

/**
 * Calculates the weighted risk score from security factors
 * @param factors - Array of security factors
 */
export const calculateWeightedRiskScore = (factors: SecurityFactorSchemaType[]): number => {
  return factors.reduce((score, factor) => {
    return score + factor.weight * factor.score;
  }, 0);
};
