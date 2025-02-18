import { SortOrder } from '../common.types';
import { PaginatedResponse } from '../response.types';
import {
  PaginationQueryParams,
  PrivacyResourceStatus,
  ResourceStatus,
} from '../filesystem/common.types';
import { BatchOperationType } from './files.responses.types';

// Enums
export enum FolderSortField {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  SIZE = 'stats.totalSize',
  CHILDREN_COUNT = 'stats.totalChildrenCount',
}

// Query Parameters
export interface FolderQueryParams extends PaginationQueryParams {
  // Basic filters (aligned with FileQueryParams)
  parentFolderId?: string | null;
  search?: string; // Changed from searchTerm to match FileQueryParams
  status?: ResourceStatus;
  sortBy?: FolderSortField;
  sortOrder?: SortOrder;

  // User related (added to match FileQueryParams)
  createdBy?: string;
  lastModifiedBy?: string;

  // Privacy and status (added to match FileQueryParams)
  privacyStatus?: PrivacyResourceStatus;

  // Size filters (already existed, keeping them)
  minSize?: number;
  maxSize?: number;

  // Date filters (renamed to match FileQueryParams pattern)
  createdAfter?: string; // Changed from dateFrom
  createdBefore?: string; // Changed from dateTo
  lastAccessedAfter?: string; // Added to match FileQueryParams
  lastAccessedBefore?: string; // Added to match FileQueryParams

  // Tags and favorites (already existed, keeping them)
  tags?: string[];
  isFavorite?: boolean;

  // Removed includeDeleted as it's covered by status field
  // Additional folder-specific fields can be added here if needed
}

// Request Bodies
export interface CreateFolderRequest {
  name: string;
  parentFolderId?: string;
  privacyStatus?: PrivacyResourceStatus;
  tags?: string[];
}

export interface UpdateFolderRequest {
  name?: string;
  parentFolderId?: string;
  isFavorite?: boolean;
  description?: string;
  color?: string;
  icon?: string;
  tags?: string[];
  shared?: boolean;
  public?: boolean;
  status?: ResourceStatus;
  sharedWith?: string[];
}

export interface CopyFolderRequest {
  destinationFolderId?: string;
}

export interface BulkOperationItem {
  folderId: string;
  destinationFolderId?: string;
}

export interface BulkFolderOperationRequest {
  operation: BatchOperationType;
  items: BulkOperationItem[];
}

// Response Types
export interface FolderStats {
  immediateChildrenCount: number;
  totalChildrenCount: number;
  totalSize: number;
  immediateSize: number;
  filesCount: number;
  foldersCount: number;
  maxDepth: number;
  lastCountUpdate: Date;
  lastFileAdded?: Date;
  lastFolderAdded?: Date;
}

export interface FolderResponse {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  tags?: string[];
  isFavorite?: boolean;
  status: ResourceStatus;
  privacyStatus: PrivacyResourceStatus;
  parentFolderId?: string;
  createdBy: string;
  lastModifiedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  stats: FolderStats;
}

export interface FolderListResponse extends PaginatedResponse<FolderResponse> {}

export interface FolderTreeNode {
  id: string;
  name: string;
  parentId: string | null;
  level: number;
  children: FolderTreeNode[];
  stats: {
    filesCount: number;
    foldersCount: number;
    totalSize: number;
    immediateSize: number;
  };
}

export interface FolderTreeResponse {
  root: FolderTreeNode;
  depth: number;
  totalNodes: number;
  maxAllowedDepth: number;
}

export interface FolderBreadcrumbResponse {
  id: string;
  name: string;
}

export interface BulkOperationResult {
  success: boolean;
  folderId: string;
  error?: string;
}

export interface BulkOperationResponse {
  results: BulkOperationResult[];
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

export interface FolderActivity {
  id: string;
  action: 'create' | 'update' | 'delete' | 'move' | 'copy';
  timestamp: Date;
  userId: string;
  details: Record<string, any>;
}

export interface FolderActivityResponse {
  data: FolderActivity[];
  total: number;
  page: number;
  limit: number;
}
