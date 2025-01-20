import {
  isDeviceType,
  isOperatingSystem,
  isDeviceInfo,
  isDeviceHardwareInfo,
  isDeviceSoftwareInfo,
  isDeviceNetworkInfo,
  // parseDeviceInfo,
} from '../guards/device.guards';
import { DeviceType, OperatingSystem } from '../objects/device.types';

describe('Device Types', () => {
  describe('Enums', () => {
    it('should validate device types', () => {
      expect(isDeviceType(DeviceType.DESKTOP)).toBe(true);
      expect(isDeviceType(DeviceType.MOBILE)).toBe(true);
      expect(isDeviceType('invalid')).toBe(false);
    });

    it('should validate operating systems', () => {
      expect(isOperatingSystem(OperatingSystem.WINDOWS)).toBe(true);
      expect(isOperatingSystem(OperatingSystem.MACOS)).toBe(true);
      expect(isOperatingSystem('invalid')).toBe(false);
    });
  });

  describe('DeviceInfo', () => {
    const validDeviceInfo = {
      hardware: {
        type: DeviceType.DESKTOP,
        platform: 'Win32',
        os: {
          name: 'Windows',
          version: '10.0.19044',
        },
        screen: {
          width: 1920,
          height: 1080,
          ratio: 1.78,
          colorDepth: 24,
        },
        cores: 8,
      },
      software: {
        browser: {
          name: 'Chrome',
          version: '96.0.4664.110',
          engine: 'Blink',
          languages: ['en-US', 'en'],
        },
        timezone: 'America/New_York',
      },
      network: {
        ip: '192.168.1.1',
        proxy: false,
        vpn: false,
        tor: false,
        hosting: false,
      },
    };

    it('should validate complete device info', () => {
      expect(isDeviceInfo(validDeviceInfo)).toBe(true);
      // expect(parseDeviceInfo(validDeviceInfo)).toEqual(validDeviceInfo);
    });

    it('should validate hardware info', () => {
      expect(isDeviceHardwareInfo(validDeviceInfo.hardware)).toBe(true);
    });

    it('should validate software info', () => {
      expect(isDeviceSoftwareInfo(validDeviceInfo.software)).toBe(true);
    });

    it('should validate network info', () => {
      expect(isDeviceNetworkInfo(validDeviceInfo.network)).toBe(true);
    });

    it('should reject invalid device info', () => {
      const invalidDeviceInfo = {
        hardware: {
          type: 'invalid',
          platform: '',
        },
      };

      expect(isDeviceInfo(invalidDeviceInfo)).toBe(false);
      // expect(parseDeviceInfo(invalidDeviceInfo)).toBeNull();
    });
  });
});
