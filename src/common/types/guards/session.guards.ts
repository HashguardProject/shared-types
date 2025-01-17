import {
  SessionMetadata,
  SessionSecurityContext,
  DeviceTrustLevel,
  BrowserInfo,
} from '../objects/session.types';
import {
  SessionMetadataSchema,
  SessionSecurityContextSchema,
  BrowserInfoSchema,
} from '../../schemas/session.schema';

/**
 * Type guard for SessionMetadata
 * @param value - Value to check
 */
export const isSessionMetadata = (value: unknown): value is SessionMetadata => {
  return SessionMetadataSchema.safeParse(value).success;
};

/**
 * Type guard for SessionSecurityContext
 * @param value - Value to check
 */
export const isSessionSecurityContext = (value: unknown): value is SessionSecurityContext => {
  return SessionSecurityContextSchema.safeParse(value).success;
};

/**
 * Type guard for DeviceTrustLevel
 * @param value - Value to check
 */
export const isDeviceTrustLevel = (value: unknown): value is DeviceTrustLevel => {
  return Object.values(DeviceTrustLevel).includes(value as DeviceTrustLevel);
};

/**
 * Type guard for BrowserInfo
 * @param value - Value to check
 */
export const isBrowserInfo = (value: unknown): value is BrowserInfo => {
  return BrowserInfoSchema.safeParse(value).success;
};

/**
 * Utility function to safely parse SessionMetadata
 * @param value - Value to parse
 */
export const parseSessionMetadata = (value: unknown): SessionMetadata | null => {
  const result = SessionMetadataSchema.safeParse(value);
  return result.success ? result.data : null;
};

/**
 * Utility function to safely parse SessionSecurityContext
 * @param value - Value to parse
 */
export const parseSessionSecurityContext = (value: unknown): SessionSecurityContext | null => {
  const result = SessionSecurityContextSchema.safeParse(value);
  return result.success ? result.data : null;
};
