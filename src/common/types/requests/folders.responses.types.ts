import { SortOrder } from '../common.types';
import { PaginatedResponse } from '../response.types';
import {
  PaginationQueryParams,
  PrivacyResourceStatus,
  ResourceStatus,
} from '../filesystem/common.types';

// Enums
export enum FolderSortField {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  SIZE = 'stats.totalSize',
  CHILDREN_COUNT = 'stats.totalChildrenCount',
}

export enum BulkOperationType {
  MOVE = 'move',
  DELETE = 'delete',
  COPY = 'copy',
  FAVORITE = 'favorite',
  UNFAVORITE = 'unfavorite',
}

// Query Parameters
export interface FolderQueryParams extends PaginationQueryParams {
  parentFolderId?: string;
  includeDeleted?: boolean;
  isFavorite?: boolean;
  sortBy?: FolderSortField;
  sortOrder?: SortOrder;
  searchTerm?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  minSize?: number;
  maxSize?: number;
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
  operation: BulkOperationType;
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
