/**
 * OAuth2 Error Types
 */
export enum OAuth2ErrorCode {
  INVALID_REQUEST = 'invalid_request',
  INVALID_TOKEN = 'invalid_token',
  UNAUTHORIZED_CLIENT = 'unauthorized_client',
  ACCESS_DENIED = 'access_denied',
  UNSUPPORTED_RESPONSE_TYPE = 'unsupported_response_type',
  SERVER_ERROR = 'server_error',
  TEMPORARILY_UNAVAILABLE = 'temporarily_unavailable',
}

export interface OAuth2Error {
  error: OAuth2ErrorCode;
  error_description: string;
  error_uri?: string;
  state?: string;
}
