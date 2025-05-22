import { ResourceStatus } from '../filesystem/common.types';
import {
  CreateUploadSessionRequest as WebdavCreateUploadSessionRequest,
  CreateUploadSessionResponse as WebdavCreateUploadSessionResponse,
  ProgressInfo as WebdavProgressInfo,
  UploadOptions as WebdavUploadOptions,
  UploadResult as WebdavUploadResult
} from '../filesystem/webdav.types';

// Re-export existing types with new names to avoid conflicts
export type CreateUploadSessionRequest = WebdavCreateUploadSessionRequest;
export type CreateUploadSessionResponse = WebdavCreateUploadSessionResponse;
export type ProgressInfo = WebdavProgressInfo;
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
   * The ID of the pre-registered file
   */
  fileId: string;
  
  /**
   * The session ID for tracking upload progress via WebSockets
   */
  sessionId: string;
  
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
   * Whether to use the pre-registration API
   */
  usePreRegistration?: boolean;
  
  /**
   * Options for the pre-registration API
   */
  preRegistrationOptions?: {
    /**
     * Additional metadata for the file
     */
    metadata?: Record<string, any>;
  }
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