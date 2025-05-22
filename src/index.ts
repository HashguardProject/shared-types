// Auth types
export * from './common/types/auth/auth.types';
export * from './common/types/auth/session.types';
export * from './common/types/auth/mfa.types';
export * from './common/types/auth/responses.types';
export * from './common/types/auth/oauth2.types';


// Security types
export * from './common/types/security/security.types';

// Object types
export * from './common/types/objects/session.types';
export * from './common/types/objects/user.types';
export * from './common/types/objects/device.types';

// Request/Response types
export * from './common/types/requests/session.responses.types';
export * from './common/types/requests/user.responses.types';

//Object types
export * from './common/types/objects/fingerprint.types';
export * from './common/types/objects/contact.types';
export * from './common/types/objects/shared-file.types';

//Security types
export * from './common/types/security/security-assessment.types';
export * from './common/types/security/validation.types';
export * from './common/types/response.types';
export * from './common/types/security/security-events.types';

// File System types
export * from './common/types/filesystem/common.types';
export * from './common/types/filesystem/file.types';
export * from './common/types/filesystem/folder.types';
export * from './common/types/filesystem/permissions.types';
export * from './common/types/filesystem/storage.types';

// WebDAV types (excluding the ones that overlap with upload types)
export {
  DealState,
  FileState,
  GroupState,
  Deal,
  FileGroup,
  FileDetails,
  FileMetadataResponse,
  UploadSession,
  UploadStatus,
  SessionUploadProgress,
  RetrievalOptions,
  FileOperationType,
  OutputType,
  OperationStatus,
  ProgressUpdate,
  EncryptFileConfig,
  DecryptFileConfig,
  FileOperationConfig,
  FileOperationState,
  FileCommon,
  GetMetadataOptions,
  getFileName,
  getFileSize,
  // Export DownloadOptions and needed but non-conflicting types
  DownloadOptions,
  DownloadProgress,
} from './common/types/filesystem/webdav.types';

// Upload types - explicitly include all needed types
export {
  CreateUploadSessionRequest,
  CreateUploadSessionResponse,
  ProgressInfo,
  UploadOptions,
  UploadResult,
  PreRegisterFileDto,
  PreRegistrationResponse,
  ExtendedUploadOptions,
  ExtendedUploadResult,
} from './common/types/uploads/upload.types';

// Billing types
export * from './common/types/objects/billings.types';

// Response types
export * from './common/types/requests/folders.responses.types';
export * from './common/types/requests/files.responses.types';
export * from './common/types/requests/shared-files.responses.types';

// Common types
export * from './common/types/common.types';

// Guards
export * from './common/types/guards/index';

// Geolocation
export * from './common/types/geolocation.types';

// Schemas exports
export * from './common/schemas/device.schema';
export * from './common/schemas/fingerprint.schema';
export * from './common/schemas/response.schema';
export * from './common/schemas/security.schema';
export * from './common/schemas/session.schema';
