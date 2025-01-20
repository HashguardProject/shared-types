import { SortOrder, VerificationMethod } from '../../..';
import { DeviceType } from './device.types';

export enum UserPlan {
  FREE = 'free',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification',
  PENDING_PAYMENT = 'pending_payment',
}

export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export enum ViewMode {
  LIST = 'list',
  GRID = 'grid',
  COMPACT = 'compact',
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

// user.types.ts
export interface User {
  _id: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;
  pushSubscription: PushSubscription;
  updatedAt: Date;
  pseudo: string;
  walletAddress?: string;
  storageLimit: number;
  storageUsed: number;
  status: UserStatus;
  role: UserRole;
  plan: UserPlan;
  permissions: string[];
  activity: UserActivity;

  lastLogin?: Date;
  securityOverview?: UserSecurityOverview;
  preferences?: UserPreferences;
  profile?: UserProfile;
  storage?: UserStorage;
}

export interface UserActivity {
  lastActive: Date;
  totalLogins: number;
  lastUpload?: Date;
  lastDownload?: Date;
}

export interface UserSecurityOverview {
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  lastPasswordChange?: Date;
  activeSessions: number;
  lastLogin?: Date;
  recentActivity: SecurityActivity[];
  trustedDevices: number;
  loginAttempts: LoginAttempts;
}

export interface SecurityActivity {
  timestamp: Date;
  action: string;
  details: Record<string, unknown>;
  location?: string;
  deviceInfo?: {
    type: DeviceType;
    browser: string;
    os: string;
  };
}

export interface LoginAttempts {
  count: number;
  lastAttempt?: Date;
  blocked: boolean;
  blockExpires?: Date;
}

export interface UserPreferences {
  notifications: NotificationPreferences;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
}

export interface UserStorage {
  files: {
    count: number;
    totalSize: number;
    lastUpdated: Date;
  };
  quota: {
    limit: number;
    used: number;
    lastUpdated: Date;
  };
}

export interface PushSubscription {
  endpoint: string;
  expirationTime: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface MFAPreferences {
  primaryMethod: VerificationMethod;
  backupMethods: VerificationMethod[];
  isEnabled: boolean;
  settings?: {
    email?: { address: string };
    phone?: { number: string };
    totp?: { secret: string; isConfigured: boolean };
  };
}

/**
 * Represents a user's complete profile information
 * @interface UserProfile
 */
export interface UserProfile {
  /** Unique identifier for the user */
  id: string;

  /** User's display name/pseudonym */
  pseudo: string;

  company?: string;

  location?: string;

  website?: string;

  /** User's email address */
  email: string;

  /** URL to user's avatar image */
  avatarUrl?: string;

  /** User's biographical information */
  bio?: string;

  /** User's ethereum wallet address */
  walletAddress?: string;

  /** User's role in the system */
  role: UserRole;

  /** User's subscription plan */
  plan: UserPlan;

  /** Current account status */
  status: UserStatus;

  /** Whether the email address is verified */
  isEmailVerified: boolean;

  /** User's contact information */
  contactInfo?: ContactInfo;

  /** User's storage usage statistics */
  storage: UserStorageStats;

  /** User's storage usage percentage */
  usagePercentage: number;

  /** Timestamp of last login */
  lastLogin?: Date;

  /** Timestamp of last activity */
  lastActive?: Date;

  /** Account creation timestamp */
  createdAt: Date;

  /** Last profile update timestamp */
  updatedAt: Date;
}

/**
 * Contact information for a user
 * @interface ContactInfo
 */
export interface ContactInfo {
  /** Phone number */
  phone?: string;

  /** Physical address */
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };

  /** Social media links */
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    discord?: string;
  };
}

/**
 * Storage statistics for a user
 * @interface UserStorageStats
 */
export interface UserStorageStats {
  /** Total storage used in bytes */
  used: number;

  /** Storage limit in bytes */
  limit: number;

  /** Number of files stored */
  fileCount: number;

  /** Number of folders */
  folderCount: number;

  /** Storage usage percentage */
  usagePercentage: number;

  /** Storage usage by file type */
  byType?: {
    [key: string]: {
      count: number;
      size: number;
    };
  };

  /** Last storage calculation timestamp */
  lastCalculated: Date;
}

/**
 * User notification preferences
 * @interface NotificationPreferences
 */
export interface NotificationPreferences {
  /** Enable email notifications */
  email: boolean;

  /** Enable push notifications */
  push: boolean;

  /** Enable desktop notifications */
  desktop: boolean;

  /** Types of email notifications to receive */
  emailTypes: string[];

  /** Notification channels configuration */
  channels: {
    security?: boolean;
    updates?: boolean;
    marketing?: boolean;
  };

  /** Security alert preferences */
  securityAlerts?: {
    loginAttempts: boolean;
    deviceChanges: boolean;
    criticalActions: boolean;
    storageAlerts: boolean;
  };

  /** Notification schedule */
  schedule: {
    quietHours: {
      enabled: boolean;
      start?: string;
      end?: string;
    };
    timezone: string;
    frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
  };
}

/**
 * User display preferences
 * @interface DisplayPreferences
 */
export interface DisplayPreferences {
  /** Theme preference */
  theme: ThemeType;

  /** Default view mode */
  defaultView: ViewMode;

  /** Number of items to display per page */
  itemsPerPage: number;

  /** Default sorting configuration */
  defaultSort: {
    field: string;
    order: SortOrder;
  };

  /** File view preferences */
  fileView: {
    defaultView: 'list' | 'grid' | 'details';
    showThumbnails: boolean;
    showPreview: boolean;
    sortBy: string;
    groupBy?: string;
  };

  /** Dashboard preferences */
  dashboard: {
    showQuickAccess: boolean;
    showStats: boolean;
    showActivity: boolean;
    customWidgets: string[];
  };
}

/**
 * User localization preferences
 * @interface LocalizationPreferences
 */
export interface LocalizationPreferences {
  /** Language code (e.g., en, fr) */
  language: string;

  /** Timezone */
  timezone: string;

  /** Date format */
  dateFormat: string;

  /** Time format (12h/24h) */
  timeFormat: '12h' | '24h';

  /** Currency code */
  currency: string;
}
