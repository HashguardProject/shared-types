import { SortOrder, VerificationMethod } from '../../..';
import { DeviceType } from './device.types';
import { GeoLocation } from '../geolocation.types';

export enum UserPlan {
  FREE = 'free',
  CRYPTOXR = 'cryptoXr',

  DISCOVERY = 'discovery', // New plan: $1.99 for 100 GB
  STANDARD = 'standard', // New plan: $5.99 for 500 GB
  PREMIUM = 'premium', // Updated plan: $14.99 for 1 TB
  ENTERPRISE = 'enterprise', // Custom enterprise plan
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  UNPAID = 'unpaid',
  CANCELED = 'canceled',
  INCOMPLETE = 'incomplete',
  INCOMPLETE_EXPIRED = 'incomplete_expired',
  TRIALING = 'trialing',
  ENDED = 'ended',
}

// Plan storage limits in bytes
export const PLAN_STORAGE_LIMITS = {
  [UserPlan.FREE]: 5 * 1024 * 1024 * 1024, // 5 GB
  [UserPlan.DISCOVERY]: 100 * 1024 * 1024 * 1024, // 100 GB
  [UserPlan.STANDARD]: 500 * 1024 * 1024 * 1024, // 500 GB
  [UserPlan.PREMIUM]: 1024 * 1024 * 1024 * 1024, // 1 TB
  [UserPlan.ENTERPRISE]: 5120 * 1024 * 1024 * 1024, // 5 TB (default, customizable)
};

// Plan prices in USD per month
export const PLAN_PRICES = {
  [UserPlan.FREE]: 0,
  [UserPlan.DISCOVERY]: 1.99,
  [UserPlan.STANDARD]: 5.99,
  [UserPlan.PREMIUM]: 14.99,
  [UserPlan.ENTERPRISE]: 49.99, // Starting price
};

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification',
  PENDING_PAYMENT = 'pending_payment',
  STORAGE_LIMIT_EXCEEDED = 'storage_limit_exceeded',
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
  id: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;
  pushSubscription?: PushSubscription;
  updatedAt: Date;
  pseudo: string;
  hashPassword?: string;
  secondKeyPart?: string;
  walletAddress?: string;
  storageLimit: number;
  storageUsed: number;
  status: UserStatus;
  role: UserRole;
  plan: UserPlan;
  permissions: string[];
  activity: UserActivity;

  // Subscription related fields
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStatus?: SubscriptionStatus;
  subscriptionPeriodEnd?: Date;

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
  location?: GeoLocation;
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
  display: DisplayPreferences;
  localization: LocalizationPreferences;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export interface UserStorage {
  files: {
    count: number;
    totalSize: number;
    lastUpdated: Date;
  };
  folders: {
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
  /** Primary verification method */
  preferredMethod: VerificationMethod;

  /** All enabled verification methods */
  methods: VerificationMethod[];

  /** Whether MFA is enabled */
  isEnabled: boolean;

  /** Last MFA verification time */
  lastVerified?: Date;

  /** Method-specific settings */
  settings?: {
    email?: { address: string };
    phone?: { number: string; verified: boolean };
    totp?: { verified: boolean; lastUsed?: Date };
    backup?: { count: number; lastUsed?: Date };
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
  storage: UserStorage;

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

export interface NotificationSchedule {
  quietHours: {
    enabled: boolean;
    start?: string;
    end?: string;
  };
  timezone: string;
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
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
  // schedule: NotificationSchedule;
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
