import { z } from 'zod';
import { OperatingSystem } from '../types/device.types';

export const ScreenSchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  ratio: z.number().positive(),
  colorDepth: z.number().int().positive(),
});

export const HardwareSchema = z.object({
  screen: ScreenSchema,
  colorDepth: z.number().int().positive(),
  cores: z.number().int().positive(),
});

export const SystemSchema = z.object({
  platform: z.nativeEnum(OperatingSystem),
  language: z.string().regex(/^[a-z]{2}-[A-Z]{2}$/),
  timezone: z.string(),
});

export const BrowserSchema = z.object({
  name: z.string(),
  version: z.string(),
  engine: z.string(),
});

export const FingerprintSchema = z.object({
  hash: z.string(),
  components: z.object({
    hardware: HardwareSchema,
    system: SystemSchema,
    browser: BrowserSchema,
  }),
  timestamp: z.number(),
  confidence: z.number().min(0).max(1),
});

export type FingerprintSchemaType = z.infer<typeof FingerprintSchema>;
