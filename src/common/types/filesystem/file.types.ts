import { PrivacyResourceStatus, ResourceStatus, Schema } from './common.types';

export interface IVersion {
  CID: string;
  versionNumber: number;
  modifiedAt: Date;
  modifiedBy: string; // ObjectId as string
  size: number;
  mimeType: string;
}

export interface IFileMetadata {
  thumbnail?: string;
  encoding?: string;
  customProperties: Record<string, unknown>;
}

export interface IFile extends Schema {
  name: string;
  originalName: string;
  parentFolderId?: string | null; // ObjectId as string
  CID: string;
  webdavPath?: string; // WebDAV storage path for the file
  extension: string;
  size: number;
  lastModifiedAt: Date;
  lastModifiedBy: string; // ObjectId as string
  mimeType: string;
  privacyStatus: PrivacyResourceStatus;
  contentCategory: 'image' | 'video' | 'audio' | 'document' | 'other';
  status: ResourceStatus;
  deletedAt?: Date;
  lastAccessed: Date;
  isFavorite: boolean;
  description?: string;
  tags: string[];
  version: number;
  previousVersions: IVersion[];
  metadata: IFileMetadata;
}

export enum FileOperation {
  READ = 'read',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  RESTORE = 'restore',
  ARCHIVE = 'archive',
  UPDATE_VERSION = 'update_version',
  RESTORE_VERSION = 'restore_version',
  PERMANENT_DELETE = 'permanent_delete',
  COPY = 'copy',
  MOVE = 'move',
}
