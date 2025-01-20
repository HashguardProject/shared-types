import {
  DeviceInfo,
  DeviceHardwareInfo,
  DeviceSoftwareInfo,
  DeviceNetworkInfo,
  DeviceType,
  OperatingSystem,
} from '../objects/device.types';
import {
  DeviceCompleteInfoSchema,
  DeviceHardwareSchema,
  DeviceSoftwareSchema,
  DeviceNetworkSchema,
} from '../../schemas/device.schema';

/**
 * Type guard for DeviceType enum
 * @param value - Value to check
 */
export const isDeviceType = (value: unknown): value is DeviceType => {
  return Object.values(DeviceType).includes(value as DeviceType);
};

/**
 * Type guard for OperatingSystem enum
 * @param value - Value to check
 */
export const isOperatingSystem = (value: unknown): value is OperatingSystem => {
  return Object.values(OperatingSystem).includes(value as OperatingSystem);
};

/**
 * Type guard for DeviceHardwareInfo
 * @param value - Value to check
 */
export const isDeviceHardwareInfo = (value: unknown): value is DeviceHardwareInfo => {
  return DeviceHardwareSchema.safeParse(value).success;
};

/**
 * Type guard for DeviceSoftwareInfo
 * @param value - Value to check
 */
export const isDeviceSoftwareInfo = (value: unknown): value is DeviceSoftwareInfo => {
  return DeviceSoftwareSchema.safeParse(value).success;
};

/**
 * Type guard for DeviceNetworkInfo
 * @param value - Value to check
 */
export const isDeviceNetworkInfo = (value: unknown): value is DeviceNetworkInfo => {
  return DeviceNetworkSchema.safeParse(value).success;
};

/**
 * Type guard for complete DeviceInfo
 * @param value - Value to check
 */
export const isDeviceInfo = (value: unknown): value is DeviceInfo => {
  return DeviceCompleteInfoSchema.safeParse(value).success;
};

/**
 * Utility function to safely parse DeviceInfo
 * @param value - Value to parse
 */
// export const parseDeviceInfo = (value: unknown): DeviceInfo | null => {
//   const result = DeviceInfoSchema.safeParse(value);
//   return result.success ? result.data : null;
// };
