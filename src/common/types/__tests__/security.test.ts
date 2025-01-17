import {
  isRiskSeverity,
  isSecurityFlag,
  isSecurityContext,
  parseSecurityContext,
  getRiskSeverityFromScore,
  requiresVerification
} from '../guards/security.guards';
import { 
  RiskSeverity, 
  SecurityFlag, 
  SecurityContext 
} from '../security/security.types';

describe('Security Types', () => {
  describe('Enums', () => {
    it('should validate risk severity levels', () => {
      expect(isRiskSeverity(RiskSeverity.LOW)).toBe(true);
      expect(isRiskSeverity(RiskSeverity.MEDIUM)).toBe(true);
      expect(isRiskSeverity(RiskSeverity.HIGH)).toBe(true);
      expect(isRiskSeverity(RiskSeverity.CRITICAL)).toBe(true);
      expect(isRiskSeverity('invalid')).toBe(false);
    });

    it('should validate security flags', () => {
      expect(isSecurityFlag(SecurityFlag.VERIFICATION_REQUIRED)).toBe(true);
      expect(isSecurityFlag(SecurityFlag.SUSPICIOUS_LOCATION)).toBe(true);
      expect(isSecurityFlag('invalid')).toBe(false);
    });
  });

  describe('SecurityContext', () => {
    const validContext: SecurityContext = {
      riskLevel: RiskSeverity.LOW,
      flags: [SecurityFlag.NEW_DEVICE],
      requiresVerification: false,
      lastVerification: new Date(),
      trustScore: 0.85,
    };

    it('should validate security context', () => {
      expect(isSecurityContext(validContext)).toBe(true);
      expect(parseSecurityContext(validContext)).toEqual(validContext);
    });

    it('should reject invalid security context', () => {
      const invalidContext = {
        riskLevel: 'invalid',
        flags: ['invalid'],
        requiresVerification: 'invalid',
        trustScore: 2,
      };

      expect(isSecurityContext(invalidContext)).toBe(false);
      expect(parseSecurityContext(invalidContext)).toBeNull();
    });

    it('should calculate correct risk severity from trust score', () => {
      expect(getRiskSeverityFromScore(0.9)).toBe(RiskSeverity.LOW);
      expect(getRiskSeverityFromScore(0.6)).toBe(RiskSeverity.MEDIUM);
      expect(getRiskSeverityFromScore(0.3)).toBe(RiskSeverity.HIGH);
      expect(getRiskSeverityFromScore(0.1)).toBe(RiskSeverity.CRITICAL);
    });

    it('should throw error for invalid trust scores', () => {
      expect(() => getRiskSeverityFromScore(-0.1)).toThrow();
      expect(() => getRiskSeverityFromScore(1.1)).toThrow();
    });

    it('should correctly determine verification requirements', () => {
      expect(requiresVerification({
        ...validContext,
        requiresVerification: true
      })).toBe(true);

      expect(requiresVerification({
        ...validContext,
        flags: [SecurityFlag.VERIFICATION_REQUIRED]
      })).toBe(true);

      expect(requiresVerification({
        ...validContext,
        riskLevel: RiskSeverity.CRITICAL
      })).toBe(true);

      expect(requiresVerification(validContext)).toBe(false);
    });
  });
}); 