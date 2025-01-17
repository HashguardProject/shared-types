// permissions.types.ts
// TODO:
// export interface FilePermissions {
//   owner: OwnerPermissions;
//   group?: GroupPermissions[];
//   others: OtherPermissions;
//   special?: SpecialPermissions[];
// }

// export interface FolderPermissions {
//   owner: OwnerPermissions;
//   group?: GroupPermissions[];
//   others: OtherPermissions;
//   special?: SpecialPermissions[];
//   inheritance: PermissionInheritance;
// }

export interface PermissionInheritance {
  mode: 'inherit' | 'override' | 'merge';
  source?: string;
  exceptions?: string[];
}

export interface ShareTarget {
  type: 'user' | 'group' | 'organization';
  id: string;
  permissions: string[];
  addedAt: Date;
  addedBy: string;
  expiration?: Date;
}

export interface ShareLink {
  id: string;
  url: string;
  createdAt: Date;
  expiration?: Date;
  permissions: string[];
  password?: boolean;
  accessCount: number;
  lastAccessed?: Date;
}
