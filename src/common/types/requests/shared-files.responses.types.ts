import { ShareType, ShareStatus, SharedBy, SharedFile } from '../objects/shared-file.types';

export interface SharedWith {
  type: ShareType;
  address: string;
  addedAt: Date;
  status: ShareStatus;
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
