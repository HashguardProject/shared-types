import { Schema } from '../filesystem/common.types';

export type ShareType = 'address' | 'userId';
export type ShareStatus = 'active' | 'revoked';

export interface SharedBy {
  type: ShareType;
  address: string;
}

// Interface for adding new share
export interface IShareWithInput {
  type: ShareType;
  addedAt: Date;
  address?: string;
  status: ShareStatus;
}

export interface SharedFile extends Schema {
  protectedDataAddress: string;
  sharedWith: Array<IShareWithInput>;
  sharedBy: SharedBy;
  fileId?: string;
  fileName?: string;
  status: ShareStatus;
}
