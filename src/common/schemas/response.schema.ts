import { z } from 'zod';
import { SecurityRecommendationSchema } from './security-assessment.schema';
import { RiskSeveritySchema } from './security.schema';
import { SessionSecurityContextSchema } from './session.schema';

export const DevMetadataSchema = z.object({
  server: z.string().optional(),
  environment: z.string().optional(),
  processingTime: z.number().nonnegative().optional(),
  debugInfo: z.object({
    memoryUsage: z.number().nonnegative().optional(),
    queryTime: z.number().nonnegative().optional(),
    cacheStats: z.object({
      hits: z.number().nonnegative(),
      misses: z.number().nonnegative(),
    }).optional(),
  }).optional(),
});

export const PaginationMetaSchema = z.object({
  total: z.number().nonnegative(),
  page: z.number().positive(),
  perPage: z.number().positive(),
  totalPages: z.number().nonnegative(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

export const ApiResponseMetaSchema = z.object({
  apiVersion: z.string(),
  timestamp: z.string().datetime(),
  requestId: z.string().uuid().optional(),
  responseTime: z.number().nonnegative().optional(),
  region: z.string().optional(),
  processingTime: z.number().nonnegative().optional(),
  features: z.array(z.string()).optional(),
  deprecation: z.object({
    message: z.string(),
    sunsetDate: z.string().datetime(),
    docUrl: z.string().url(),
  }).optional(),
  etag: z.string().optional(),
  lastModified: z.string().datetime().optional(),
  pagination: PaginationMetaSchema.optional(),
  dev: DevMetadataSchema.optional(),
});

export const ApiLinksSchema = z.object({
  self: z.string().url(),
  next: z.string().url().optional(),
  prev: z.string().url().optional(),
  first: z.string().url().optional(),
  last: z.string().url().optional(),
  related: z.record(z.string().url()).optional(),
});

export const ErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.unknown()).optional(),
    stack: z.string().optional(),
  }),
  meta: ApiResponseMetaSchema,
});

export const SecurityResponseSchema = <T extends z.ZodType>(dataSchema: T) => z.object({
  success: z.boolean(),
  data: dataSchema.optional(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.unknown()).optional(),
  }).optional(),
  meta: z.object({
    requestId: z.string().uuid(),
    timestamp: z.date(),
    processingTime: z.number().nonnegative().optional(),
  }),
  security: z.object({
    riskLevel: RiskSeveritySchema,
    requiresAction: z.boolean(),
    recommendations: z.array(SecurityRecommendationSchema).optional(),
  }).optional(),
});

export const AuthenticationResponseSchema = z.object({
  tokens: z.object({
    accessToken: z.string(),
    refreshToken: z.string().optional(),
    csrfToken: z.string().optional(),
  }),
  session: z.object({
    id: z.string().uuid(),
    expiresAt: z.date(),
    security: SessionSecurityContextSchema,
  }),
  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    isEmailVerified: z.boolean(),
  }),
});

export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) => z.object({
  data: dataSchema,
  meta: ApiResponseMetaSchema,
  links: ApiLinksSchema.optional(),
  included: z.array(z.record(z.unknown())).optional(),
});

export type ApiResponseSchemaType<T> = z.infer<ReturnType<typeof ApiResponseSchema<z.ZodType<T>>>>;
export type SecurityResponseSchemaType<T> = z.infer<ReturnType<typeof SecurityResponseSchema<z.ZodType<T>>>>; 