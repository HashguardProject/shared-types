import { isFingerprint, isRiskSeverity, parseFingerprint } from '../index';
import { RiskSeverity } from '../../security/security.types';
import { OperatingSystem } from '../../device.types';

describe('Type Guards', () => {
  describe('isFingerprint', () => {
    it('should validate correct fingerprint structure', () => {
      const validFingerprint = {
        hash: 'test-hash',
        components: {
          hardware: {
            screen: { width: 1920, height: 1080, ratio: 1.78 },
            colorDepth: 24,
            cores: 8,
          },
          system: {
            platform: OperatingSystem.WINDOWS,
            language: 'en-US',
            timezone: 'UTC',
          },
          browser: {
            name: 'Chrome',
            version: '96.0.4664.110',
            engine: 'Blink',
          },
        },
        timestamp: Date.now(),
        confidence: 0.95,
      };

      expect(isFingerprint(validFingerprint)).toBe(true);
    });

    it('should reject invalid fingerprint structure', () => {
      const invalidFingerprint = {
        hash: 'test-hash',
        // missing required fields
      };

      expect(isFingerprint(invalidFingerprint)).toBe(false);
    });
  });

  describe('isRiskSeverity', () => {
    it('should validate valid risk severity values', () => {
      expect(isRiskSeverity(RiskSeverity.LOW)).toBe(true);
      expect(isRiskSeverity(RiskSeverity.MEDIUM)).toBe(true);
      expect(isRiskSeverity(RiskSeverity.HIGH)).toBe(true);
    });

    it('should reject invalid risk severity values', () => {
      expect(isRiskSeverity('INVALID')).toBe(false);
    });
  });

  describe('parseFingerprint', () => {
    it('should return valid fingerprint object', () => {
      const validData = {
        hash: 'test-hash',
        components: {
          hardware: {
            screen: { width: 1920, height: 1080, ratio: 1.78 },
            colorDepth: 24,
            cores: 8,
          },
          system: {
            platform: OperatingSystem.WINDOWS,
            language: 'en-US',
            timezone: 'UTC',
          },
          browser: {
            name: 'Chrome',
            version: '96.0.4664.110',
            engine: 'Blink',
          },
        },
        timestamp: Date.now(),
        confidence: 0.95,
      };

      const result = parseFingerprint(validData);
      expect(result).toBeDefined();
      expect(result?.hash).toBe('test-hash');
      expect(result?.components.system.platform).toBe(OperatingSystem.WINDOWS);
    });

    it('should return null for invalid data', () => {
      const invalidData = {
        hash: 'test-hash',
        // missing required fields
      };

      const result = parseFingerprint(invalidData);
      expect(result).toBeNull();
    });
  });
});
