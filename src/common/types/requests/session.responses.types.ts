import { Session, SessionStatus, VerificationStatus } from '../objects/session.types';
import { GeoLocation } from '../geolocation.types';
import { DeviceType, Platform, DeviceTrustLevel } from '../objects/device.types';
import { RiskSeverity, SecurityFlag } from '../security/security.types';
import { VerificationMethod } from '../auth/auth.types';

 export interface SessionResponse {
   id: string;
   userId: string;
   state: {
     status: SessionStatus;
     isRevoked: boolean;
     revokedAt?: Date;
     revokedReason?: string;
   };
   metadata: {
     source: string;
     ip?: string;
     location?: GeoLocation;
     userAgent?: string;
     lastTokenRefresh?: Date;
     accessCount: number;
     lastVerification?: Date;
     tags?: string[];
   };
   device?: {
     id: string;
     type: DeviceType;
     fingerprint: string;
     platform: Platform;
     lastSeen: Date;
     trustScore?: number;
   };
   verification: {
     status: VerificationStatus;
     method?: VerificationMethod;
     expiresAt?: Date;
     attempts: {
       count: number;
       blockedUntil?: Date;
       lastAttempt?: Date;
     };
   };
   security: {
     riskLevel: RiskSeverity;
     trustLevel: DeviceTrustLevel;
     flags: SecurityFlag[];
     lastAssessment: Date;
     requiresVerification: boolean;
     lastSecurityCheck?: Date;
   };
   createdAt: Date;
   updatedAt: Date;
   lastActivity: Date;
   expiresAt: Date;
   authType: 'magic-link' | 'oauth2';
 }


 export interface SessionValidationResult {
   isValid: boolean;
   errors?: Array<{
     code: string;
     message: string;
     severity: RiskSeverity;
     details?: any;
   }>;
   session?: SessionResponse;
   security?: {
     isValid: boolean;
     riskLevel: RiskSeverity;
     flags: SecurityFlag[];
     requiresVerification: boolean;
     trustScore: number;
   };
   context?: {
     source: string;
     timestamp: Date;
     validationType: 'session' | 'security' | 'binding' | 'all';
     metadata: Record<string, any>;
   };
 }
