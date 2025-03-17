import { ResourceStatus, PrivacyResourceStatus, Schema } from './common.types';

export interface IFolderStats {
  // Core counts
  immediateChildrenCount: number; // Files + folders directly in this folder
  totalChildrenCount: number; // All descendants (recursive)
  filesCount: number; // Direct files only
  foldersCount: number; // Direct folders only

  // Size metrics
  totalSize: number; // Size of all files (recursive)
  immediateSize: number; // Size of direct files only

  // Timestamps
  lastCountUpdate: Date; // When stats were last updated
  lastFileAdded?: Date; // When the last file was added
  lastFolderAdded?: Date; // When the last folder was added

  // Additional metadata
  maxDepth: number; // Maximum folder depth

  // Backwards compatibility with frontend (aliases)
  totalItems?: number; // Alias for totalChildrenCount for legacy frontend
}

export interface IFolder extends Schema {
  name: string;
  lastOpened?: Date;
  lastModifiedBy?: string | null; // ObjectId as string
  createdBy: string; // ObjectId as string
  parentFolderId?: string | null; // ObjectId as string
  privacyStatus: PrivacyResourceStatus;
  color?: string;
  icon?: string;
  description?: string;
  isFavorite?: boolean;
  status: ResourceStatus;
  deletedAt?: Date;
  tags?: string[];
  metadata?: Map<string, any>;
  stats?: IFolderStats;

  // Virtual properties
  formattedStats: {
    count: number;
    lastUpdated: Date;
  };
}
