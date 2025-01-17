import { DeviceType } from '../device.types';
import { StorageQuota, StorageUsage } from '../filesystem/storage.types';

// user.types.ts
export interface User {
  _id: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  lastLogin?: Date;
  securityOverview?: UserSecurityOverview;
  preferences?: UserPreferences;
  profile?: UserProfile;
  storage?: UserStorage;
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
  quota: StorageQuota;
  usage: StorageUsage;
  lastUpdated: Date;
}
