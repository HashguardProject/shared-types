import { Request } from 'express';
import { TokenType } from './auth.types';
import { Session } from '../objects/session.types';
import { User } from '../objects/user.types';

/**
 * Configuration for Passport JWT Strategy
 */
export interface PassportStrategyConfig {
  jwtFromRequest: string[];
  secretOrKey: string | Buffer;
  algorithms: string[];
  issuer?: string;
  audience?: string;
  ignoreExpiration: boolean;
  passReqToCallback: boolean;
}

/**
 * JWT Payload structure
 */
export interface JwtPayload {
  /** User ID (subject) */
  sub: string;
  /** Unique token ID */
  jti: string;
  /** Issued at timestamp */
  iat: number;
  /** Expiration timestamp */
  exp: number;
  /** Token issuer */
  iss: string;
  /** Token audience */
  aud: string;
  /** Device fingerprint hash */
  deviceId: string;
  /** Session ID */
  sessionId: string;
  /** Token type */
  type: TokenType;
  /** Token scopes */
  scope: string[];
}

/**
 * Validated request user
 */
export interface AuthenticatedUser {
  id: string;
  sessionId: string;
  deviceId: string;
  user: User;
  session: Session;
}

/**
 * Passport verify callback
 */
export type PassportVerifyCallback = (
  error: any,
  user?: AuthenticatedUser | false,
  info?: { message: string }
) => void;

/**
 * Passport validate function
 */
export type PassportValidateFunction = (
  req: Request,
  payload: JwtPayload,
  done: PassportVerifyCallback
) => Promise<void>; 