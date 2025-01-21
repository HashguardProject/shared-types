import { ResourceStatus, PrivacyResourceStatus, Schema } from './common.types';

export interface IFolderStats {
  immediateChildrenCount: number;
  totalChildrenCount: number;
  lastCountUpdate: Date;
  totalSize: number;
  immediateSize: number;
  filesCount: number;
  foldersCount: number;
  lastFileAdded?: Date;
  lastFolderAdded?: Date;
  maxDepth: number;
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
