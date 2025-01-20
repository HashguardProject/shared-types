import { SessionSecurityContext } from './objects/session.types';
import { SecurityRecommendation } from './security/security-assessment.types';
import { RiskSeverity } from './security/security.types';
import { SecurityError } from './security/validation.types';

/**
 * Generic API response wrapper
 * @interface ApiResponse
 * @template T - Type of the response data
 */
export interface ApiResponse<T> {
  /** Main response data */
  data: T;
  /** Response metadata */
  meta: ApiResponseMeta;
  /** HATEOAS links */
  links?: ApiLinks;

  /** Related resources */
  included?: Record<string, unknown>[];
}

/**
 * API response metadata
 * @interface ApiResponseMeta
 */
export interface ApiResponseMeta {
  /** API version used for the response */
  apiVersion: string;
  /** Response timestamp in ISO format */
  timestamp: string;
  /** Unique request identifier */
  requestId?: string;

  /** Whether the response was cached */
  cached?: boolean;

  /** Response time in milliseconds */
  responseTime?: number;
  /** Server region that processed the request */
  region?: string;
  /** Server-side processing time in milliseconds */
  processingTime?: number;

  /** Enabled feature flags for this response */
  features?: string[];
  /** Deprecation notice if applicable */
  deprecation?: {
    /** Deprecation message */
    message: string;
    /** Date when the endpoint will be removed */
    sunsetDate: string;
    /** URL to deprecation documentation */
    docUrl: string;
  };

  /** ETag for caching */
  etag?: string;
  /** Last modified timestamp */
  lastModified?: string;

  /** Pagination information */
  pagination?: PaginationMeta;

  /** Development-only metadata */
  dev?: DevMetadata;
}

/**
 * Pagination metadata
 * @interface PaginationMeta
 */
export interface PaginationMeta {
  /** Total number of items */
  total: number;
  /** Current page number */
  page: number;
  /** Number of items per page */
  perPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there is a next page */
  hasNextPage: boolean;
  /** Whether there is a previous page */
  hasPreviousPage: boolean;
}

/**
 * Development-only metadata
 * @interface DevMetadata
 */
export interface DevMetadata {
  /** Server identifier */
  server?: string;
  /** Environment name */
  environment?: string;
  /** Processing time in milliseconds */
  processingTime?: number;
  /** Debug information */
  debugInfo?: {
    /** Memory usage in bytes */
    memoryUsage?: number;
    /** Database query time in milliseconds */
    queryTime?: number;
    /** Cache statistics */
    cacheStats?: {
      /** Number of cache hits */
      hits: number;
      /** Number of cache misses */
      misses: number;
    };
  };
}

/**
 * HATEOAS links
 * @interface ApiLinks
 */
export interface ApiLinks {
  /** Current resource URL */
  self: string;
  /** Next page URL */
  next?: string;
  /** Previous page URL */
  prev?: string;
  /** First page URL */
  first?: string;
  /** Last page URL */
  last?: string;
  /** Related resource URLs */
  related?: Record<string, string>;
}

/**
 * Error response structure
 * @interface ErrorResponse
 */
export interface ErrorResponse {
  /** Error details */
  error: {
    /** Error code */
    code: string;
    /** Error message */
    message: string;
    /** Additional error details */
    details?: Record<string, unknown>;
    /** Stack trace (development only) */
    stack?: string;
  };
  /** Response metadata */
  meta: ApiResponseMeta;
}

/**
 * Security-specific response wrapper
 * @interface SecurityResponse
 * @template T - Type of the security response data
 */
export interface SecurityResponse<T> {
  /** Whether the security check passed */
  success: boolean;
  /** Response data if successful */
  data?: T;
  /** Security error if failed */
  error?: SecurityError;
  /** Response metadata */
  meta: {
    /** Unique request identifier */
    requestId: string;
    /** Response timestamp */
    timestamp: Date;
    /** Processing time in milliseconds */
    processingTime?: number;
  };
  /** Security assessment */
  security?: {
    /** Assessed risk level */
    riskLevel: RiskSeverity;
    /** Whether additional security action is required */
    requiresAction: boolean;
    /** Security recommendations if any */
    recommendations?: SecurityRecommendation[];
  };
}

/**
 * Authentication response structure
 * @interface AuthenticationResponse
 */
export interface AuthenticationResponse {
  /** Authentication tokens */
  tokens: {
    /** JWT access token */
    accessToken: string;
    /** JWT refresh token */
    refreshToken?: string;
    /** CSRF token */
    csrfToken?: string;
  };
  /** Session information */
  session: {
    /** Session identifier */
    id: string;
    /** Session expiration timestamp */
    expiresAt: Date;
    /** Session security context */
    security: SessionSecurityContext;
  };
  /** User information */
  user: {
    /** User identifier */
    id: string;
    /** User email */
    email: string;
    /** Email verification status */
    isEmailVerified: boolean;
  };
}

/**
 * List response wrapper with filtering info
 */
export interface ApiListResponse<T> extends ApiResponse<T[]> {
  data: T[];
  meta: ApiResponseMeta & {
    total: number;
    filtered?: number;
    // Only include relevant stats
    stats?: {
      totalCount: number;
      filteredCount?: number;
      lastUpdated?: string;
    };
  };
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  data: T[];
  meta: ApiResponseMeta & {
    pagination: NonNullable<ApiResponseMeta['pagination']>;
  };
}

/**
 * Success response with no data
 */
export interface ApiSuccessResponse extends ApiResponse<null> {
  data: null;
  meta: ApiResponseMeta & {
    success: true;
    operation?: string;
    affectedResources?: number;
  };
}

/**
 * Response metadata decorator
 */
export interface ResponseMetadataOptions {
  includeDebug?: boolean;
  cacheable: boolean;
  paginated?: boolean;
  deprecated?: boolean;
  deprecationMessage?: string;
  maxAge?: number;
}
