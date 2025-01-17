import { z } from 'zod';
import type { Fingerprint, ValidationResult } from '../index';
import { FingerprintSchema } from '../../schemas/fingerprint.schema';
import { RiskSeverity } from '../security/security.types';
import { DeviceType } from '../device.types';
import { SecurityEvent } from '../security/security-events.types';

/**
 * Type guard for Fingerprint type
 * @param value - Value to check
 * @returns True if value is a valid Fingerprint
 */
export const isFingerprint = (value: unknown): value is Fingerprint => {
  return FingerprintSchema.safeParse(value).success;
};

/**
 * Type guard for RiskSeverity enum
 * @param value - Value to check
 */
export const isRiskSeverity = (value: unknown): value is RiskSeverity => {
  return Object.values(RiskSeverity).includes(value as RiskSeverity);
};

/**
 * Type guard for DeviceType enum
 * @param value - Value to check
 */
export const isDeviceType = (value: unknown): value is DeviceType => {
  return Object.values(DeviceType).includes(value as DeviceType);
};

/**
 * Type guard for SecurityEvent
 * @param value - Value to check
 */
export const isSecurityEvent = (value: unknown): value is SecurityEvent => {
  const SecurityEventSchema = z.object({
    type: z.string(),
    timestamp: z.number(),
    severity: z.nativeEnum(RiskSeverity),
    details: z.record(z.unknown()),
  });

  return SecurityEventSchema.safeParse(value).success;
};

/**
 * Type guard for ValidationResult
 * @param value - Value to check
 */
export const isValidationResult = (value: unknown): value is ValidationResult => {
  const ValidationResultSchema = z.object({
    valid: z.boolean(),
    errors: z.array(z.string()).optional(),
    warnings: z.array(z.string()).optional(),
  });

  return ValidationResultSchema.safeParse(value).success;
};

/**
 * Utility function to assert Fingerprint type
 * @throws {Error} If value is not a valid Fingerprint
 */
export function assertFingerprint(value: unknown): asserts value is Fingerprint {
  if (!isFingerprint(value)) {
    throw new Error('Value is not a valid Fingerprint');
  }
}

/**
 * Utility function to safely parse a Fingerprint
 * @returns Parsed Fingerprint or null if invalid
 */
export const parseFingerprint = (value: unknown): Fingerprint | null => {
  const result = FingerprintSchema.safeParse(value);
  return result.success ? (result.data as Fingerprint) : null;
};

/**
 * Type assertion helper for SecurityEvent
 * @throws {Error} If value is not a valid SecurityEvent
 */
export function assertSecurityEvent(value: unknown): asserts value is SecurityEvent {
  if (!isSecurityEvent(value)) {
    throw new Error('Value is not a valid SecurityEvent');
  }
}

/**
 * Utility function to check if a value is a valid ValidationResult
 * @throws {Error} If value is not a valid ValidationResult
 */
export function assertValidationResult(value: unknown): asserts value is ValidationResult {
  if (!isValidationResult(value)) {
    throw new Error('Value is not a valid ValidationResult');
  }
}
