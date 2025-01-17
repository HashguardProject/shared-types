import {
  isSecurityFactorType,
  isRecommendationType,
  isPriority,
  isSecurityFactor,
  isSecurityRecommendation,
  isSecurityAssessment,
  parseSecurityAssessment,
  calculateRiskLevel
} from '../guards/security-assessment.guards';
import {
  SecurityFactorType,
  RecommendationType,
  Priority,
  SecurityAssessment
} from '../security/security-assessment.types';
import { RiskSeverity } from '../security/security.types';

describe('Security Assessment Types', () => {
  describe('Enums', () => {
    it('should validate security factor types', () => {
      expect(isSecurityFactorType(SecurityFactorType.LOCATION)).toBe(true);
      expect(isSecurityFactorType(SecurityFactorType.DEVICE_TRUST)).toBe(true);
      expect(isSecurityFactorType('invalid')).toBe(false);
    });

    it('should validate recommendation types', () => {
      expect(isRecommendationType(RecommendationType.VERIFY_DEVICE)).toBe(true);
      expect(isRecommendationType(RecommendationType.ENABLE_2FA)).toBe(true);
      expect(isRecommendationType('invalid')).toBe(false);
    });

    it('should validate priority levels', () => {
      expect(isPriority(Priority.LOW)).toBe(true);
      expect(isPriority(Priority.HIGH)).toBe(true);
      expect(isPriority('invalid')).toBe(false);
    });
  });

  describe('SecurityAssessment', () => {
    const validAssessment: SecurityAssessment = {
      riskLevel: RiskSeverity.LOW,
      flags: [],
      factors: [
        {
          type: SecurityFactorType.DEVICE_TRUST,
          weight: 0.5,
          score: 0.9,
        },
        {
          type: SecurityFactorType.LOCATION,
          weight: 0.5,
          score: 0.8,
        },
      ],
      recommendations: [
        {
          type: RecommendationType.ENABLE_2FA,
          priority: Priority.MEDIUM,
          reason: 'Enhanced security recommended',
          action: 'Enable two-factor authentication',
        },
      ],
      timestamp: new Date(),
    };

    it('should validate security assessment', () => {
      expect(isSecurityAssessment(validAssessment)).toBe(true);
      expect(parseSecurityAssessment(validAssessment)).toEqual(validAssessment);
    });

    it('should validate security factor', () => {
      expect(isSecurityFactor(validAssessment.factors[0])).toBe(true);
    });

    it('should validate security recommendation', () => {
      expect(isSecurityRecommendation(validAssessment.recommendations[0])).toBe(true);
    });

    it('should calculate correct risk level from factors', () => {
      const riskLevel = calculateRiskLevel(validAssessment.factors);
      expect(riskLevel).toBe(RiskSeverity.LOW);
    });

    it('should reject invalid assessment', () => {
      const invalidAssessment = {
        riskLevel: 'invalid',
        factors: [{ type: 'invalid' }],
      };

      expect(isSecurityAssessment(invalidAssessment)).toBe(false);
      expect(parseSecurityAssessment(invalidAssessment)).toBeNull();
    });

    it('should reject factors with invalid weights', () => {
      const invalidFactors = {
        ...validAssessment,
        factors: [
          { type: SecurityFactorType.DEVICE_TRUST, weight: 0.7, score: 0.9 },
          { type: SecurityFactorType.LOCATION, weight: 0.7, score: 0.8 },
        ],
      };

      expect(isSecurityAssessment(invalidFactors)).toBe(false);
    });
  });
}); 