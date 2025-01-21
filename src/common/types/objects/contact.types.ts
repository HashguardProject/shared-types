import { Schema } from '../filesystem/common.types';

export enum ContactType {
  ETHEREUM = 'ethereum',
  USER_ID = 'userId',
}

export interface Contact {
  type: ContactType;
  address?: string;
  userId?: string;
  pseudo?: string;
  lastInteraction?: Date;
}

export interface Contacts extends Schema {
  userId: string;
  contacts: Contact[];
}
