export enum ResourceStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  TRASHED = 'trashed',
}

export enum PrivacyResourceStatus {
  PRIVATE = 'private',
  PUBLIC = 'public',
  SHARED = 'shared',
}

export interface PaginationQueryParams {
  page?: number;
  limit?: number;
}
