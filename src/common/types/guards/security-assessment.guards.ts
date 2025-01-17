import {
  SecurityAssessment,
  SecurityFactor,
  SecurityRecommendation,
  SecurityFactorType,
  RecommendationType,
  Priority
} from '../security/security-assessment.types';
import {
  SecurityAssessmentSchema,
  SecurityFactorSchema,
  SecurityRecommendationSchema,
  calculateWeightedRiskScore
} from '../../schemas/security-assessment.schema';
import { getRiskSeverityFromScore } from './security.guards';

/**
 * Type guard for SecurityFactorType enum
 * @param value - Value to check
 */
export const isSecurityFactorType = (value: unknown): value is SecurityFactorType => {
  return Object.values(SecurityFactorType).includes(value as SecurityFactorType);
};

/**
 * Type guard for RecommendationType enum
 * @param value - Value to check
 */
export const isRecommendationType = (value: unknown): value is RecommendationType => {
  return Object.values(RecommendationType).includes(value as RecommendationType);
};

/**
 * Type guard for Priority enum
 * @param value - Value to check
 */
export const isPriority = (value: unknown): value is Priority => {
  return Object.values(Priority).includes(value as Priority);
};

/**
 * Type guard for SecurityFactor
 * @param value - Value to check
 */
export const isSecurityFactor = (value: unknown): value is SecurityFactor => {
  return SecurityFactorSchema.safeParse(value).success;
};

/**
 * Type guard for SecurityRecommendation
 * @param value - Value to check
 */
export const isSecurityRecommendation = (value: unknown): value is SecurityRecommendation => {
  return SecurityRecommendationSchema.safeParse(value).success;
};

/**
 * Type guard for SecurityAssessment
 * @param value - Value to check
 */
export const isSecurityAssessment = (value: unknown): value is SecurityAssessment => {
  return SecurityAssessmentSchema.safeParse(value).success;
};

/**
 * Utility function to safely parse SecurityAssessment
 * @param value - Value to parse
 */
export const parseSecurityAssessment = (value: unknown): SecurityAssessment | null => {
  const result = SecurityAssessmentSchema.safeParse(value);
  return result.success ? result.data : null;
};

/**
 * Calculates risk level from security factors
 * @param factors - Array of security factors
 */
export const calculateRiskLevel = (factors: SecurityFactor[]) => {
  const weightedScore = calculateWeightedRiskScore(factors);
  return getRiskSeverityFromScore(weightedScore);
}; 