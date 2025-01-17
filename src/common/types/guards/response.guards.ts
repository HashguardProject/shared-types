import { 
  ApiResponse,
  ApiResponseMeta,
  PaginationMeta,
  DevMetadata,
  ApiLinks,
  ErrorResponse,
  SecurityResponse,
  AuthenticationResponse
} from '../response.types';
import {
  ApiResponseSchema,
  ApiResponseMetaSchema,
  PaginationMetaSchema,
  DevMetadataSchema,
  ApiLinksSchema,
  ErrorResponseSchema,
  SecurityResponseSchema,
  AuthenticationResponseSchema
} from '../../schemas/response.schema';
import { z } from 'zod';

/**
 * Type guard for ApiResponseMeta
 * @param value - Value to check
 */
export const isApiResponseMeta = (value: unknown): value is ApiResponseMeta => {
  return ApiResponseMetaSchema.safeParse(value).success;
};

/**
 * Type guard for PaginationMeta
 * @param value - Value to check
 */
export const isPaginationMeta = (value: unknown): value is PaginationMeta => {
  return PaginationMetaSchema.safeParse(value).success;
};

/**
 * Type guard for DevMetadata
 * @param value - Value to check
 */
export const isDevMetadata = (value: unknown): value is DevMetadata => {
  return DevMetadataSchema.safeParse(value).success;
};

/**
 * Type guard for ApiLinks
 * @param value - Value to check
 */
export const isApiLinks = (value: unknown): value is ApiLinks => {
  return ApiLinksSchema.safeParse(value).success;
};

/**
 * Type guard for ErrorResponse
 * @param value - Value to check
 */
export const isErrorResponse = (value: unknown): value is ErrorResponse => {
  return ErrorResponseSchema.safeParse(value).success;
};

/**
 * Type guard for SecurityResponse
 * @param value - Value to check
 * @param dataSchema - Schema for the response data
 */
export const isSecurityResponse = <T>(
  value: unknown, 
  dataSchema: z.ZodType<T>
): value is SecurityResponse<T> => {
  return SecurityResponseSchema(dataSchema).safeParse(value).success;
};

/**
 * Type guard for AuthenticationResponse
 * @param value - Value to check
 */
export const isAuthenticationResponse = (value: unknown): value is AuthenticationResponse => {
  return AuthenticationResponseSchema.safeParse(value).success;
};

/**
 * Type guard for ApiResponse
 * @param value - Value to check
 * @param dataSchema - Schema for the response data
 */
export const isApiResponse = <T>(
  value: unknown, 
  dataSchema: z.ZodType<T>
): value is ApiResponse<T> => {
  return ApiResponseSchema(dataSchema).safeParse(value).success;
};

/**
 * Utility function to safely parse ApiResponse
 * @param value - Value to parse
 * @param dataSchema - Schema for the response data
 */
export const parseApiResponse = <T>(
  value: unknown, 
  dataSchema: z.ZodType<T>
): ApiResponse<T> | null => {
  const result = ApiResponseSchema(dataSchema).safeParse(value);
  return result.success ? result.data as ApiResponse<T> : null;
};

/**
 * Utility function to safely parse SecurityResponse
 * @param value - Value to parse
 * @param dataSchema - Schema for the response data
 */
export const parseSecurityResponse = <T>(
  value: unknown, 
  dataSchema: z.ZodType<T>
): SecurityResponse<T> | null => {
  const result = SecurityResponseSchema(dataSchema).safeParse(value);
  return result.success ? result.data as SecurityResponse<T> : null;
}; 