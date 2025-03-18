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
  status: 'processing' | 'ready' | 'failed';
  activeDeals: number;
  totalDeals: number;
  progress: number;
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
