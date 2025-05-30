import { ResourceStatus } from '../filesystem/common.types';
import {
  CreateUploadSessionRequest as WebdavCreateUploadSessionRequest,
  CreateUploadSessionResponse as WebdavCreateUploadSessionResponse,
  ProgressInfo as WebdavProgressInfo,
  UploadOptions as WebdavUploadOptions,
  UploadResult as WebdavUploadResult,
} from '../filesystem/webdav.types';

// Re-export existing types with new names to avoid conflicts
export type CreateUploadSessionRequest = WebdavCreateUploadSessionRequest;
export type CreateUploadSessionResponse = WebdavCreateUploadSessionResponse;

/**
 * Generic progress information for file operations
 */
export interface ProgressInfo extends WebdavProgressInfo {
  fileName?: string;
  fileId?: string;
  speed?: number;
  remainingTime?: number;
}

export type UploadOptions = WebdavUploadOptions;
export type UploadResult = WebdavUploadResult;

/**
 * Request DTO for pre-registering a file before actual upload
 * This creates a file placeholder with PENDING status
 */
export interface PreRegisterFileDto {
  /**
   * The name of the file
   */
  name: string;

  /**
   * The size of the file in bytes
   */
  size: number;

  /**
   * The MIME type of the file (optional)
   */
  mimeType?: string;

  /**
   * The parent folder ID where the file will be stored (optional)
   */
  parentFolderId?: string;
}

/**
 * Response object for pre-registration endpoint
 */
export interface PreRegistrationResponse {
  /**
   * The ID of the pre-registered file with PENDING status
   * This is a real file ID that will be updated when the upload completes
   * Note: This may be the same as the sessionId during pre-registration
   * until a permanent file is created in the system
   */
  fileId: string;

  /**
   * The session ID for tracking upload progress via WebSockets
   */
  sessionId: string;

  /**
   * The encryption ID for client-side encryption key derivation
   */
  encryptionId?: string;

  /**
   * The expiration time of the pre-registration
   */
  expiresAt: Date;
}

/**
 * Extended upload options with pre-registration support
 */
export interface ExtendedUploadOptions extends WebdavUploadOptions {
  /**
   * Callback for handling upload errors
   */
  onError?: (error: Error) => void;

  /**
   * Whether to automatically retry on failure
   */
  autoRetry?: boolean;

  /**
   * Maximum number of retry attempts
   */
  maxRetries?: number;

  /**
   * Base delay in milliseconds between retries (for exponential backoff)
   */
  retryDelay?: number;

  /**
   * Maximum delay in milliseconds between retries
   */
  maxRetryDelay?: number;

  /**
   * Whether to use the pre-registration API.
   * If set to false, fileId and sessionId might be expected to be provided directly.
   */
  usePreRegistration?: boolean;

  /**
   * Optional File ID to use if usePreRegistration is false.
   */
  fileId?: string;

  /**
   * Optional Session ID to use if usePreRegistration is false.
   */
  sessionId?: string;

  /**
   * Options for the pre-registration API (if usePreRegistration is true)
   */
  preRegistrationOptions?: {
    /**
     * Additional metadata for the file
     */
    metadata?: Record<string, any>;

    /**
     * Maximum number of pre-registration retry attempts
     */
    maxRetries?: number;

    /**
     * Base delay in milliseconds between pre-registration retries
     */
    retryDelay?: number;
  };
}

/**
 * Extended upload result with additional fields
 */
export interface ExtendedUploadResult extends WebdavUploadResult {
  /**
   * The Content ID of the file (CID)
   */
  CID?: string;

  /**
   * The session ID used for the upload
   */
  sessionId?: string;
}

/**
 * Upload type for internal tracking
 */
export interface InternalUploadType {
  id: string;
  type: string;
}

/**
 * Result of a storage health check
 */
export interface StorageHealthCheckResult {
  isConnected: boolean;
  outboundIp: string | null;
  lastChecked: Date | null;
  storageUrl: string;
  isIpWhitelisted: boolean | null;
  error: string | null;
  connectionDiagnostics?: any;
}

/**
 * Data for upload events
 */
export interface UploadEventData {
  sessionId: string;
  fileId?: string;
  filename: string;
  status: string;
  error?: string;
}

/**
 * Upload status types
 */
export type UploadStatus =
  | 'created'
  | 'uploading'
  | 'processing'
  | 'storing'
  | 'complete'
  | 'failed'
  | 'canceled';

/**
 * Progress information for upload tracking
 */
export interface UploadProgress {
  sessionId: string;
  filename: string;
  bytesUploaded: number;
  bytesTotal: number;
  percent: number;
  status: UploadStatus;
  error?: string;
}

/**
 * Extended Multer file with additional properties
 * This interface extends Express.Multer.File for server-side use
 */
export interface UploadMulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination?: string;
  filename?: string;
  path?: string;
  buffer?: Buffer;
  stream?: any;
  originalPath?: string;
  encryptionId?: string;
}
