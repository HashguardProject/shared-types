import { Schema } from "../filesystem/common.types";

export interface Contact extends Schema {
  type: 'ethereum' | 'userId';
  address?: string;
  userId?: string;
  pseudo?: string;
  lastInteraction?: Date;
}


export interface Contacts extends Schema {
  userId: string;
  contacts: Contact[];
}
