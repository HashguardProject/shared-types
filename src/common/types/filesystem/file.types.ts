import { ResourceStatus } from './common.types';

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

export interface IFile {
  id: string; // MongoDB _id
  createdBy: string; // ObjectId as string
  name: string;
  originalName: string;
  parentFolderId: string | null; // ObjectId as string
  CID: string;
  extension: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
  lastModifiedAt: Date;
  lastModifiedBy: string; // ObjectId as string
  mimeType: string;
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
