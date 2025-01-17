// storage.types.ts
export interface StorageQuota {
  limit: number;
  used: number;
  available: number;
  percentage: number;
}

export interface StorageUsage {
  byType: Record<FileType, number>;
  byCategory: Record<FileCategory, number>;
  history: StorageHistoryEntry[];
}

export interface StorageHistoryEntry {
  timestamp: Date;
  used: number;
  change: number;
}

export enum FileType {
  DOCUMENT = 'document',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  ARCHIVE = 'archive',
  OTHER = 'other',
}

export enum FileCategory {
  PERSONAL = 'personal',
  WORK = 'work',
  SHARED = 'shared',
  BACKUP = 'backup',
}
