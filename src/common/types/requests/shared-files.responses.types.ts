import { ShareType, ShareStatus, SharedBy } from '../objects/shared-file.types';

export interface SharedWith {
  type: ShareType;
  address: string;
  addedAt: Date;
  status: ShareStatus;
}

export interface SharedFile {
  id: string;
  protectedDataAddress: string;
  sharedWith: SharedWith[];
  sharedBy: SharedBy;
  fileId?: string;
  fileName?: string;
  status: ShareStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTOs
export interface CreateSharedFileRequest {
  protectedDataAddress: string;
  fileName?: string;
  fileId?: string;
  status?: ShareStatus;
}

export interface ShareFileRequest {
  recipient: {
    type: ShareType;
    address: string;
  };
  fileName?: string;
  fileId?: string;
}

// Response types
export interface SharedFileResponse extends SharedFile {}

export interface SharedFileListResponse {
  items: SharedFile[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
