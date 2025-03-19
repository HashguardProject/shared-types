// @hashguardproject/shared-types/src/common/types/file/webdav.types.ts

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
  retrievableCopies: number;
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

export interface UploadProgress {
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
