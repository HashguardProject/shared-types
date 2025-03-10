// device.types.ts
/**
 * Supported operating systems
 * @enum {string}
 */
export enum OperatingSystem {
  /** Microsoft Windows */
  WINDOWS = 'windows',
  /** Apple macOS */
  MACOS = 'macos',
  /** Linux-based OS */
  LINUX = 'linux',
  /** Apple iOS */
  IOS = 'ios',
  /** Google Android */
  ANDROID = 'android',
  /** Unidentified OS */
  UNKNOWN = 'unknown',
}

/**
 * Device form factor types
 * @enum {string}
 */
export enum DeviceType {
  BROWSER = 'browser',
  /** Desktop computer or laptop */
  DESKTOP = 'desktop',
  /** Mobile phone */
  MOBILE = 'mobile',
  /** Tablet device */
  TABLET = 'tablet',
  /** Unidentified device type */
  UNKNOWN = 'unknown',
}

export enum Platform {
  IOS = 'ios',
  ANDROID = 'android',
  WEB = 'web',
  DESKTOP = 'desktop',
  OTHER = 'other',
  UNKNOWN = 'unknown',
}

export enum Browser {
  CHROME = 'chrome',
  EDGE = 'edge',
  FIREFOX = 'firefox',
  SAFARI = 'safari',
  OPERA = 'opera',
  OTHER = 'other',
  UNKNOWN = 'unknown',
}

/**
 * Hardware-specific device information
 * @interface DeviceHardwareInfo
 */
export interface DeviceHardwareInfo {
  /** Device form factor type */
  type: DeviceType;
  /** Platform identifier (e.g., "Win32", "MacIntel") */
  platform: Platform;
  /** Operating system information */
  os: {
    /** OS name */
    name: string;
    /** OS version string */
    version: string;
  };
  /** Screen characteristics */
  screen: {
    /** Screen width in pixels */
    width: number;
    /** Screen height in pixels */
    height: number;
    /** Screen aspect ratio */
    ratio: number;
    /** Color depth in bits */
    colorDepth: number;
  };
  /** Number of CPU cores */
  cores: number;
}

/**
 * Software-specific device information
 * @interface DeviceSoftwareInfo
 */
export interface DeviceSoftwareInfo {
  /** Browser information */
  browser: {
    /** Browser name */
    name: string;
    /** Browser version */
    version: string;
    /** Browser engine */
    engine: string;
    /** Supported languages */
    languages: string[];
  };
  /** Device timezone */
  timezone: string;
}

/**
 * Network-related device information
 * @interface DeviceNetworkInfo
 */
export interface DeviceNetworkInfo {
  /** IP address */
  ip?: string;
  /** Proxy detection flag */
  proxy?: boolean;
  /** VPN detection flag */
  vpn?: boolean;
  /** Tor network detection flag */
  tor?: boolean;
  /** Hosting provider detection flag */
  hosting?: boolean;
}

export interface DeviceInfo {
  id?: string;
  trustLevel?: DeviceTrustLevel;
  platform: Platform;
  type: DeviceType;
  lastVerified: string;
}

/**
 * Complete device information
 * @interface DeviceCompleteInfo
 */
export interface DeviceCompleteInfo {
  /** Hardware-specific information */
  hardware: DeviceHardwareInfo;
  /** Software-specific information */
  software: DeviceSoftwareInfo;
  /** Network-related information */
  network: DeviceNetworkInfo;
}

/**
 * Represents the trust level of a device
 * @enum {string}
 */
export enum DeviceTrustLevel {
  /** Device is explicitly marked as untrusted */
  UNTRUSTED = 'untrusted',
  /** First time seeing this device */
  NEW = 'new',
  /** Device has been seen before */
  RECOGNIZED = 'recognized',
  /** Device has been blocked */
  BLOCKED = 'BLOCKED',
  /** Device has been revoked */
  REVOKED = 'REVOKED',
  /** Device has passed basic trust checks */
  TRUSTED = 'trusted',
  /** Device has passed advanced verification */
  VERIFIED = 'verified',
  /** Low risk */
  LOW = 'LOW',
  /** Medium risk */
  MEDIUM = 'MEDIUM',
  /** High risk */
  HIGH = 'HIGH',
}
