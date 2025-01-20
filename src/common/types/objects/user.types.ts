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

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  securityAlerts: boolean;
  updates: boolean;
  marketing: boolean;
}

export interface UserProfile {
  displayName?: string;
  avatar?: string;
  bio?: string;
  company?: string;
  location?: string;
  website?: string;
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
