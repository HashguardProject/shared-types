export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  CSRF_TOKEN = 'csrf_token',
  MAGIC_LINK = 'magic_link',
  ID_TOKEN = 'id_token',
}

export enum AuthState {
  LOGGED_IN = 'logged_in',
  LOGGED_OUT = 'logged_out',
  SESSION_EXPIRED = 'session_expired',
  SESSION_TERMINATED = 'session_terminated',
  PENDING_VERIFICATION = 'pending_verification',
}

export enum TokenState {
  VALID = 'valid',
  EXPIRED = 'expired',
  REFRESHING = 'refreshing',
  NONE = 'none',
  ERROR = 'error',
  REVOKED = 'revoked',
}

export enum Permission {
  CREATE_FOLDER = 'create_folder',
  DELETE_FOLDER = 'delete_folder',
  UPDATE_FOLDER = 'update_folder',
  READ_FOLDER = 'read_folder',
  CREATE_FILE = 'create_file',
  DELETE_FILE = 'delete_file',
  UPDATE_FILE = 'update_file',
  READ_FILE = 'read_file',
  CREATE_USER = 'create_user',
  DELETE_USER = 'delete_user',
  UPDATE_USER = 'update_user',
  READ_USER = 'read_user',
  CREATE_GROUP = 'create_group',
  DELETE_GROUP = 'delete_group',
  UPDATE_GROUP = 'update_group',
  READ_GROUP = 'read_group',
  CREATE_POLICY = 'create_policy',
  DELETE_POLICY = 'delete_policy',
  UPDATE_POLICY = 'update_policy',
  READ_POLICY = 'read_policy',
}

export interface TokenPayload {
  sub: string; // subject (user ID)
  email?: string;
  type: TokenType;
  exp?: number; // expiration time
  iat?: number; // issued at
  jti?: string; // JWT ID
  iss?: string; // issuer
  aud?: string; // audience
  scope?: string | string[];
  deviceId?: string;
  sessionId?: string;
}

export interface PreAuthTokenPayload {
  sub: string; // user ID
  email: string;
  challengeId: string;
  requiresMfa: boolean;
  exp?: number; // expiration time
  iat?: number; // issued at
  jti?: string; // JWT ID
  scope: 'mfa_verification';
}
