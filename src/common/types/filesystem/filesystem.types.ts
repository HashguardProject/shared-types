import { FileType } from "./storage.types";

// filesystem.types.ts
export interface File {
  _id: string;
  name: string;
  type: FileType;
  size: number;
  path: string;
  parentFolder: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  lastAccessed?: Date;
  metadata: FileMetadata;
  // security: FileSecurityInfo; TODO
  // sharing?: FileSharingInfo; TODO
  versions?: FileVersion[];
}

export interface Folder {
  _id: string;
  name: string;
  path: string;
  parentFolder?: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  metadata: FolderMetadata;
  // security: FolderSecurityInfo; TODO
  // sharing?: FolderSharingInfo; TODO
  stats: FolderStats;
}

export interface FileMetadata {
  contentType: string;
  hash: string;
  encryption: {
    algorithm: string;
    keyId: string;
    iv: string;
  };
  originalName: string;
  extension: string;
  tags?: string[];
  customMetadata?: Record<string, unknown>;
}

export interface FolderMetadata {
  color?: string;
  icon?: string;
  tags?: string[];
  customMetadata?: Record<string, unknown>;
}

export interface FileVersion {
  versionId: string;
  createdAt: Date;
  size: number;
  hash: string;
  metadata: FileMetadata;
  createdBy: string;
}

export interface FolderStats {
  filesCount: number;
  subFoldersCount: number;
  totalSize: number;
  lastModified: Date;
}
