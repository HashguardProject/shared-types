import { VerificationMethod } from '../security/security.types'

export enum AuthSessionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
  PENDING = 'pending',
  ERROR = 'error'
}

export interface AuthSessionState {
  // Core session data
  status: AuthSessionStatus
  isAuthenticated: boolean
  userId: string | null
  
  // Timing information
  createdAt: number
  expiresAt: number
  lastModified: number
  lastAuthSuccess: number | null
  
  // Security state
  isRevoked: boolean
  revokedAt?: number
  revokedReason?: string
  
  // MFA state
  mfaStatus?: {
    isEnabled: boolean
    primaryMethod?: VerificationMethod
    methods: VerificationMethod[]
    isPhoneVerified: boolean
    isTotpVerified: boolean
    hasBackupCodes: boolean
  }
  
  // Trust and security
  trustScore?: number
  securityFlags?: {
    isSuspicious: boolean
    requiresReauth: boolean
    lastVerified: number
  }
  
  // Metadata
  metadata: {
    deviceId?: string
    fingerprint?: string
    ipAddress?: string
    userAgent?: string
  }
}

export interface AuthSessionValidationResult {
  isValid: boolean
  reason?: string
  error?: Error
  sessionState?: AuthSessionState
  metadata?: {
    timestamp: number
    source: string
    verificationChain: string[]
  }
}

// For backward compatibility
export interface LegacySessionState {
  isAuthenticated: boolean
  userId: string | null
  lastAuthSuccess: number | null
  sessionExpiry: number | null
  mfaStatus?: {
    isEnabled: boolean
    primaryMethod?: VerificationMethod
    methods: VerificationMethod[]
    isPhoneVerified: boolean
    isTotpVerified: boolean
    hasBackupCodes: boolean
  }
}

// For backward compatibility
export interface LegacySessionValidationResult {
  isValid: boolean
  reason?: string
  error?: Error
  sessionState?: LegacySessionState
} 