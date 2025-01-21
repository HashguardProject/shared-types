import { Schema } from "../filesystem/common.types";

  // Interface for adding new share
export interface IShareWithInput {
    type: 'address' | 'userId';
    addedAt: Date;
    address?: string;
    userId?: string;
    status: 'active' | 'revoked';
}

export interface SharedFile extends Schema {
  protectedDataAddress: string;
  sharedWith: Array<IShareWithInput>;
  sharedBy: {
    type: 'address' | 'userId';
    address?: string;
    userId?: string;
  };
  fileId?: string;
  fileName?: string;
  status: 'active' | 'revoked';
}
