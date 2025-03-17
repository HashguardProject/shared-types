import { VerificationMethod } from '../security/security.types';

/**
 * Response when requesting TOTP setup
 * Contains secret key, URI for QR code, and backup codes
 */
export interface TotpSetupResponse {
  /**
   * TOTP secret key for manual entry
   * @example "JBSWY3DPEHPK3PXP"
   */
  secret: string;

  /**
   * URI for QR code generation
   * @example "otpauth://totp/HashGuard:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=HashGuard"
   */
  uri: string;

  /**
   * QR code image as data URL
   * @example "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAADECAYAAAD..."
   */
  qrCode: string;

  /**
   * Backup codes for account recovery
   * @example ["12345678", "87654321", "13572468", "24681357", "98765432"]
   */
  backupCodes: string[];
}

/**
 * Response for MFA status request
 */
export interface MfaStatus {
  /**
   * Whether MFA is enabled for the user
   */
  isEnabled: boolean;

  /**
   * Primary verification method
   */
  primaryMethod?: VerificationMethod;

  /**
   * All configured verification methods
   */
  methods: VerificationMethod[];

  /**
   * Whether phone verification is set up
   */
  isPhoneVerified: boolean;

  /**
   * Whether TOTP is verified
   */
  isTotpVerified: boolean;

  /**
   * Whether the user has backup codes
   */
  hasBackupCodes: boolean;
}

/**
 * MFA Challenge presented during login
 */
export interface MfaChallenge {
  /**
   * Unique challenge identifier
   */
  challengeId: string;

  /**
   * Required verification method
   */
  requiredMethod: VerificationMethod;

  /**
   * All available verification methods
   */
  availableMethods: VerificationMethod[];

  /**
   * When the challenge expires (timestamp)
   */
  expiresAt: number;

  /**
   * Additional challenge metadata
   */
  metadata?: {
    /**
     * Masked phone number (for SMS verification)
     * @example "+1*****2345"
     */
    phoneMasked?: string;

    /**
     * Masked email address (for email verification)
     * @example "u***@e***ple.com"
     */
    emailMasked?: string;
  };
}

/**
 * Base DTO for MFA verification attempts
 */
export interface MfaVerificationBase {
  /**
   * Verification code entered by user
   * @example "123456"
   */
  code: string;
}

/**
 * DTO for TOTP verification
 */
export interface TotpVerificationRequest extends MfaVerificationBase {}

/**
 * DTO for phone verification
 */
export interface PhoneVerificationRequest extends MfaVerificationBase {
  /**
   * Phone number in E.164 format
   * @example "+14155552671"
   */
  phoneNumber: string;
}

/**
 * DTO for setting up phone verification
 */
export interface PhoneSetupRequest {
  /**
   * Phone number in E.164 format
   * @example "+14155552671"
   */
  phoneNumber: string;
}

/**
 * DTO for MFA challenge verification during login
 */
export interface MfaChallengeVerificationRequest extends MfaVerificationBase {
  /**
   * Challenge ID received during login
   */
  challengeId: string;

  /**
   * Verification method being used
   */
  method: VerificationMethod;
}

/**
 * DTO for disabling MFA
 */
export interface DisableMfaRequest {
  /**
   * Optional reason for disabling MFA
   */
  reason?: string;
}

/**
 * Response when verifying MFA
 */
export interface MfaVerificationResponse {
  /**
   * Whether verification was successful
   */
  success: boolean;

  /**
   * Number of remaining backup codes (if applicable)
   */
  remainingCodes?: number;
} 