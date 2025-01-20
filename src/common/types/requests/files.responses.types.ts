import { PrivacyResourceStatus, ResourceStatus } from '../filesystem/common.types';
import { SortOrder } from '../common.types';
import { IFile } from '../filesystem/file.types';

// Query Parameters
export interface FileQueryParams {
  page?: number;
  limit?: number;
  parentFolderId?: string | null;
  search?: string;
  status?: ResourceStatus;
  sortBy?: FileSortField;
  sortOrder?: SortOrder;
  createdBy?: string;
  lastModifiedBy?: string;
  mimeType?: string[];
  extension?: string[];
  privacyStatus?: PrivacyResourceStatus;
  category?: FileContentCategory[];
  minSize?: number;
  maxSize?: number;
  createdAfter?: string;
  createdBefore?: string;
  lastAccessedAfter?: string;
  lastAccessedBefore?: string;
  tags?: string[];
  isFavorite?: boolean;
  includeVersions?: boolean;
  minVersion?: number;
}

// Enums
export enum FileSortField {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  SIZE = 'size',
  VERSION = 'version',
  LAST_ACCESSED = 'lastAccessed',
}

export enum FileContentCategory {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  OTHER = 'other',
}

export enum BatchOperationType {
  MOVE = 'MOVE',
  DELETE = 'DELETE',
  COPY = 'COPY',
  ARCHIVE = 'ARCHIVE',
  FAVORITE = 'FAVORITE',
  UNFAVORITE = 'UNFAVORITE',
}

// Response Types
export interface FileMetadata {
  thumbnail?: string;
  encoding?: string;
  customProperties?: Record<string, unknown>;
}

export interface FileVersion {
  CID: string;
  versionNumber: number;
  size: number;
  mimeType: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface FileVersionList {
  versions: FileVersion[];
  total: number;
  currentVersion: number;
}

export interface FileListResponse {
  data: IFile[];
  total: number;
  page: number;
  limit: number;
  hasMore?: boolean;
  summary?: {
    totalSize: number;
    byCategory?: Record<string, number>;
    byStatus?: Record<string, number>;
  };
}

// Batch Operations
export interface BatchFileItem {
  fileId: string;
  destinationFolderId?: string | null;
}

export interface BatchOperationResult {
  fileId: string;
  success: boolean;
  error?: string;
  newLocation?: string;
}

export interface BatchOperationSummary {
  total: number;
  successful: number;
  failed: number;
}

export interface BatchOperationResponse {
  results: BatchOperationResult[];
  summary: BatchOperationSummary;
}

// Request Bodies
export interface CreateFileRequest {
  name: string;
  originalName: string;
  mimeType: string;
  size?: number;
  description?: string;
  tags?: string[];
  metadata?: FileMetadata;
  parentFolderId?: string | null;
  status?: ResourceStatus;
}

export interface UpdateFileRequest {
  name?: string;
  description?: string;
  tags?: string[];
  metadata?: FileMetadata;
  status?: ResourceStatus;
}

export interface MoveFileRequest {
  destinationFolderId: string | null;
}

export interface BatchFileOperationRequest {
  operation: BatchOperationType;
  files: BatchFileItem[];
  options?: {
    force?: boolean;
    preserveMetadata?: boolean;
  };
}

export interface RestoreVersionRequest {
  versionCID: string;
}
