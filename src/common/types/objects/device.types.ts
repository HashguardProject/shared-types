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
}

export enum Browser {
  CHROME = 'chrome',
  EDGE = 'edge',
  FIREFOX = 'firefox',
  SAFARI = 'safari',
  OPERA = 'opera',
  OTHER = 'other',
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

/**
 * Complete device information
 * @interface DeviceInfo
 */
export interface DeviceInfo {
  /** Hardware-specific information */
  hardware: DeviceHardwareInfo;
  /** Software-specific information */
  software: DeviceSoftwareInfo;
  /** Network-related information */
  network: DeviceNetworkInfo;
}
