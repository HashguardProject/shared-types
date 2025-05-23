// @hashguardproject/shared-types/src/common/types/file/webdav.types.ts

import { IFile } from './file.types';

export type DealState = 'active' | 'proposed' | 'failed';
export type FileState = 'staging' | 'active' | 'failed';
export type GroupState = 'ready_for_deals' | 'writable';

export interface Deal {
  provider: string;
  endEpoch?: number;
  dealId?: number;
  isRetrievable: boolean;
  state: DealState;
}

export interface FileGroup {
  pieceCid?: string;
  deals?: Deal[];
  state: GroupState;
  retrievableCopies: number;
}

export interface FileDetails {
  groups: FileGroup[];
  state: FileState;
  size?: number;
  retrievableCopies: number;
  [key: string]: any;
}

export interface FileMetadataResponse {
  success: boolean;
  result?: {
    file?: {
      details?: FileDetails;
    };
  };
  cid?: string;
  webdavPath?: string;
  accessMethod?: 'cid' | 'path' | 'both'; // Indicates which method is available for retrieval
  status: 'processing' | 'ready' | 'failed';
  activeDeals: number;
  totalDeals: number;
  progress: number;
  error?: string;
}

// Upload session types
export interface UploadSession {
  id: string;
  userId: string;
  filename: string;
  size: number;
  mimeType: string;
  status: UploadStatus;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

export type UploadStatus =
  | 'created' // Session initialized
  | 'uploading' // File chunks being uploaded
  | 'processing' // Upload complete, processing file
  | 'storing' // Sending to WebDAV/Filecoin
  | 'complete' // Successfully stored
  | 'failed' // Error occurred
  | 'canceled'; // User canceled upload

/**
 * Progress information for session-based file uploads
 */
export interface SessionUploadProgress {
  sessionId: string;
  filename: string;
  bytesUploaded: number;
  bytesTotal: number;
  percent: number;
  status: UploadStatus;
  error?: string;
}

export interface CreateUploadSessionRequest {
  filename: string;
  size: number;
  mimeType: string;
  parentFolderId?: string;
}

export interface CreateUploadSessionResponse {
  sessionId: string;
  endpoint: string;
  token: string;
  expiresAt: Date;
}

/**
 * Options for file retrieval operations
 */
export interface RetrievalOptions {
  /**
   * Whether to prefer the public gateway when available
   */
  preferPublicGateway?: boolean;

  /**
   * Preferred access method (cid or path)
   * - 'cid': Prefer CID-based access (network)
   * - 'path': Prefer path-based access (WebDAV)
   * - 'auto': Try best available method (default)
   */
  preferredAccessMethod?: 'cid' | 'path' | 'auto';

  /**
   * Maximum number of retries for retrieval operations
   */
  maxRetries?: number;

  /**
   * Delay between retries in milliseconds
   */
  retryDelay?: number;
}

/**
 * Generic progress information for file operations
 */
export interface ProgressInfo {
  loaded: number;
  total: number;
  percent: number;
}

/**
 * Progress information for file uploads
 */
export interface UploadProgress extends ProgressInfo {}

/**
 * Progress information for file downloads
 */
export interface DownloadProgress extends ProgressInfo {}

/**
 * Options for file metadata retrieval
 */
export interface GetMetadataOptions {
  /** Include verbose details */
  verbose?: boolean;
  /** Wait until file is out of staging state */
  waitForNonStaging?: boolean;
  /** Maximum number of retries */
  maxRetries?: number;
  /** Delay between retries in milliseconds */
  retryDelay?: number;
}

/**
 * Options for file upload
 */
export interface UploadOptions {
  /** Parent folder ID */
  parentFolderId?: string;
  /** Progress callback */
  onProgress?: (progress: ProgressInfo) => void;
}

/**
 * Options for file download
 */
export interface DownloadOptions {
  /** Progress callback */
  onProgress?: (progress: ProgressInfo) => void;
}

/**
 * Result of a file upload operation
 */
export interface UploadResult {
  /** File ID */
  fileId: string;
  /** File path or Content ID */
  filePath: string;
  /** Content ID (CID) of the file, if available */
  CID?: string;
  /** Encryption ID for client-side encryption key derivation */
  encryptionId?: string;
}

/**
 * Client-side encryption/decryption operations
 * These are different from server-side file operations (FileOperation)
 */
export type FileOperationType = 'encrypt' | 'decrypt';

/**
 * Output type for file processing operations
 */
export type OutputType = 'download' | 'preview' | 'share';

/**
 * Status of a file operation
 */
export type OperationStatus =
  | 'idle'
  | 'getting-key'
  | 'processing'
  | 'completed'
  | 'error'
  | 'cancelled';

/**
 * Progress update for file processing
 */
export interface ProgressUpdate {
  status: string;
  progress: number;
}

/**
 * Configuration for file encryption operations
 */
export interface EncryptFileConfig {
  type: 'encrypt';
  file: File; // Browser File only
  outputType?: OutputType;
  onProgress?: (update: ProgressUpdate) => void;
  onError?: (error: Error) => void;
  onSuccess?: (result: ArrayBuffer) => void;
  onCancel?: () => void;
}

/**
 * Configuration for file decryption operations
 */
export interface DecryptFileConfig {
  type: 'decrypt';
  file: IFile; // Database IFile only
  outputType?: OutputType;
  onProgress?: (update: ProgressUpdate) => void;
  onError?: (error: Error) => void;
  onSuccess?: (result: ArrayBuffer) => void;
  onCancel?: () => void;
}

/**
 * Union type for file processing operations
 */
export type FileOperationConfig = EncryptFileConfig | DecryptFileConfig;

/**
 * State of a file operation
 */
export interface FileOperationState {
  status: OperationStatus;
  progress: number;
  currentStep: string;
  error?: Error;
  onError?: (error: Error) => void;
  result?: ArrayBuffer;
  canRetry?: boolean;
}

/**
 * Common properties shared between browser File and IFile
 * This helps with writing functions that can work with either type
 */
export interface FileCommon {
  name: string;
  size: number;
}

/**
 * Helper functions to work with either file type
 */
export const getFileName = (file: File | IFile): string => file.name;
export const getFileSize = (file: File | IFile): number => file.size;
