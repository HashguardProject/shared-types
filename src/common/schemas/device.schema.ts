import { z } from 'zod';
import { DeviceType } from '../types/device.types';
import { ScreenSchema } from './fingerprint.schema';



export const OperatingSystemSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
});

export const DeviceHardwareSchema = z.object({
  type: z.nativeEnum(DeviceType),
  platform: z.string().min(1),
  os: OperatingSystemSchema,
  screen: ScreenSchema,
  cores: z.number().int().positive(),
});

export const DeviceBrowserSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
  engine: z.string().min(1),
  languages: z.array(z.string().regex(/^[a-z]{2}(-[A-Z]{2})?$/)),
});

export const DeviceSoftwareSchema = z.object({
  browser: DeviceBrowserSchema,
  timezone: z.string().min(1),
});

export const DeviceNetworkSchema = z.object({
  ip: z.string().ip().optional(),
  proxy: z.boolean().optional(),
  vpn: z.boolean().optional(),
  tor: z.boolean().optional(),
  hosting: z.boolean().optional(),
});

export const DeviceInfoSchema = z.object({
  hardware: DeviceHardwareSchema,
  software: DeviceSoftwareSchema,
  network: DeviceNetworkSchema,
});

export type DeviceInfoSchemaType = z.infer<typeof DeviceInfoSchema>;
