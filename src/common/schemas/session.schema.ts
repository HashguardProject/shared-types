import { z } from 'zod';
import { DeviceTrustLevel } from '../types/objects/device.types';
import { SecurityFlagSchema } from './security.schema';

export const CoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const LocationSchema = z.object({
  country: z.string().length(2).optional(),
  city: z.string().optional(),
  coordinates: CoordinatesSchema.optional(),
});

export const BrowserInfoSchema = z.object({
  brand: z.string().min(1),
  version: z.string().min(1),
});

export const SessionMetadataSchema = z.object({
  ip: z.string().ip(),
  platform: z.string().optional(),
  browser: z.array(BrowserInfoSchema).optional(),
  location: LocationSchema.optional(),
});

export const SessionSecurityContextSchema = z.object({
  deviceId: z.string().uuid(),
  browserFingerprint: z.string().min(32),
  trustLevel: z.nativeEnum(DeviceTrustLevel),
  riskFlags: z.array(SecurityFlagSchema),
  lastVerification: z.date().optional(),
  verificationMethod: z.string().optional(),
});

export type SessionMetadataSchemaType = z.infer<typeof SessionMetadataSchema>;
export type SessionSecurityContextSchemaType = z.infer<typeof SessionSecurityContextSchema>;
