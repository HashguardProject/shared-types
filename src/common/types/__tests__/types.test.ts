// src/__tests__/types.test.ts
import { Fingerprint, DeviceType, OperatingSystem } from '../../..';
import { RiskSeverity } from '../../..';

describe('Type Validation', () => {
  it('should validate Fingerprint type structure', () => {
    const fingerprint: Fingerprint = {
      hash: 'test-hash',
      components: {
        hardware: {
          screen: {
            width: 1920,
            height: 1080,
            ratio: 1.78,
          },
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

    expect(fingerprint).toBeDefined();
  });

  it('should validate enum values', () => {
    expect(Object.values(RiskSeverity)).toContain(RiskSeverity.LOW);
    expect(Object.values(DeviceType)).toContain(DeviceType.DESKTOP);
  });
});
