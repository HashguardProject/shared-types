// Merged comprehensive user profile type for shared package

import { SortOrder } from '../common.types';
import { GeoLocation } from '../geolocation.types';
import {
  DisplayPreferences,
  LocalizationPreferences,
  LoginAttempts,
  NotificationPreferences,
  ThemeType,
  UserPlan,
  UserProfile,
  UserRole,
  UserStatus,
  ViewMode,
} from '../objects/user.types';
import { RiskSeverity } from '../security/security.types';
import { VerificationStatus } from '../objects/session.types';

export interface CreateUserRequest {
  /** User pseudo (username) - must be between 3 and 50 characters */
  pseudo: string;

  /** User email address */
  email: string;

  /** Optional Ethereum wallet address - must match format 0x[40 hex chars] */
  walletAddress?: string;

  /** User subscription plan - defaults to FREE */
  plan?: UserPlan;
}

export interface SearchUsersRequest {
  /** Search term for pseudo or email */
  query?: string;

  /** Filter by user plan */
  plan?: UserPlan;

  /** Filter by user status */
  status?: UserStatus;

  /** Filter by email verification status */
  isEmailVerified?: boolean;

  /** Page number (1-based), defaults to 1 */
  page: number;

  /** Number of items per page (1-100), defaults to 20 */
  perPage: number;

  /** Sort field, defaults to 'createdAt' */
  sortBy?: 'createdAt' | 'lastLogin' | 'pseudo' | 'email';

  /** Sort order, defaults to 'desc' */
  sortOrder?: 'asc' | 'desc';
}

export interface UpdatePreferencesRequest {
  /** Notification preferences */
  notifications?: NotificationPreferences;

  /** Display preferences */
  display?: DisplayPreferences;

  /** Localization preferences */
  localization?: LocalizationPreferences;

  /** Custom user settings */
  customSettings?: Record<string, any>;
}

/**
 * Security verification settings
 * @interface SecurityVerification
 */
export interface SecurityVerification {
  /** Verification status */
  status: VerificationStatus;

  /** Last verification date */
  lastVerified?: Date;

  /** Verification methods */
  methods: string[];

  /** Enabled verification factors */
  factors?: {
    email?: boolean;
    phone?: boolean;
    totp?: boolean;
    webauthn?: boolean;
  };
}

/**
 * Security event information
 * @interface SecurityEvent
 */
export interface SecurityEventResponse {
  /** Event timestamp */
  timestamp: Date;

  /** Type of security event */
  eventType: string;

  /** Whether the event was successful */
  success: boolean;

  /** Associated device ID */
  deviceId?: string;

  /** User agent string */
  userAgent?: string;

  /** Location information */
  location?: GeoLocation;

  /** Risk level */
  riskLevel: RiskSeverity;

  /** Additional metadata */
  metadata?: Record<string, any>;
}

/**
 * User privacy settings
 * @interface UserPrivacySettings
 */
export interface UserPrivacySettings {
  /** Profile visibility */
  profileVisibility: 'public' | 'private' | 'contacts';

  /** Default file sharing settings */
  defaultSharing: {
    visibility: 'private' | 'public' | 'restricted';
    allowDownload: boolean;
    requireAuthentication: boolean;
    expirationDays?: number;
  };

  /** Activity visibility */
  activityVisibility: {
    showLastSeen: boolean;
    showActiveSessions: boolean;
    showDevices: boolean;
  };
}

/**
 * Accessibility preferences
 * @interface AccessibilityPreferences
 */
export interface AccessibilityPreferences {
  /** High contrast mode */
  highContrast: boolean;

  /** Font size scale */
  fontScale: number;

  /** Reduce motion */
  reduceMotion: boolean;

  /** Screen reader optimized */
  screenReaderOptimized: boolean;
}

/**
 * Response shape for user profile requests
 * @interface UserProfileResponse
 */
export interface UserProfileResponse {
  /** The user profile data */
  data: UserProfile;

  /** Whether the request was successful */
  success: boolean;

  /** Timestamp of the response */
  timestamp: Date;

  /** Optional message about the response */
  message?: string;
}

/**
 * Parameters for querying users
 * @interface UserQueryParams
 */
export interface UserQueryParams {
  /** Page number for pagination */
  page?: number;

  /** Number of items per page */
  limit?: number;

  /** Search term for filtering users */
  search?: string;

  /** Filter by user role */
  role?: UserRole;

  /** Filter by user status */
  status?: UserStatus;

  /** Filter by subscription plan */
  plan?: UserPlan;

  /** Sort field */
  sortBy?: UserSortField;

  /** Sort order */
  sortOrder?: SortOrder;

  /** Filter by email verification status */
  isEmailVerified?: boolean;

  /** Filter by creation date range */
  createdAfter?: string;
  createdBefore?: string;

  /** Filter by last activity date range */
  lastActiveAfter?: string;
  lastActiveBefore?: string;
}

/**
 * Fields available for sorting users
 * @enum {string}
 */
export enum UserSortField {
  EMAIL = 'email',
  CREATED_AT = 'createdAt',
  LAST_ACTIVE = 'lastActive',
  STORAGE_USED = 'storage.used',
  FILE_COUNT = 'storage.fileCount',
}

/**
 * Combined user preferences
 * @interface UserPreferences
 */
export interface UserPreferencesResponse {
  /** Display preferences */
  display: DisplayPreferences;

  /** Notification preferences */
  notifications: NotificationPreferences;

  /** Localization preferences */
  localization: LocalizationPreferences;

  /** Privacy settings */
  privacy: UserPrivacySettings;

  /** Accessibility settings */
  accessibility: AccessibilityPreferences;
}


export interface ActivityEntry {
  /** Activity timestamp */
  timestamp: Date;

  /** Activity type */
  action: string;

  /** Additional activity details */
  details: Record<string, any>;
}

export interface SecurityOverviewResponse {
  /** Whether two-factor authentication is enabled */
  twoFactorEnabled: boolean;

  /** Last password change timestamp */
  lastPasswordChange?: Date;

  /** Number of active sessions */
  activeSessions: number;

  /** Last login timestamp */
  lastLogin?: Date;

  /** Recent security events */
  securityEvents: SecurityEventResponse[];

  /** Recent security-related activities */
  recentActivity: ActivityEntry[];

  /** Number of trusted devices */
  trustedDevices: number;

  /** Security verification status */
  verification: SecurityVerification;

  /** Overall risk level */
  riskLevel: RiskSeverity;

  /** Login attempts information */
  loginAttempts: LoginAttempts;
}

export interface UserDetailResponse extends UserProfile {
  role: UserRole;

  loginCount: number;

  devices: string[];

  notifications: NotificationPreferences;

  display: DisplayPreferences;

  localization: LocalizationPreferences;

  privacy: UserPrivacySettings;

  accessibility: AccessibilityPreferences;

  verification: SecurityVerification;

  twoFactorEnabled: boolean;

  activeSessions: number;

  trustedDevices: number;

  securityScore: number;

  securityRecommendations: string[];

  customSettings?: Record<string, any>;
}