export enum ResourceStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  TRASHED = 'trashed',
  PENDING = 'pending',
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

export interface Schema {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
