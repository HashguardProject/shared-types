# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-03-XX

### Added
- Initial release with core types
- Fingerprint interface and related types
- Risk assessment types
- Device type enumerations
- Zod schemas for runtime validation
- Comprehensive test suite
- CI/CD pipeline with GitHub Actions

### Security
- Added security policy
- Implemented automated security scanning

## [1.13.11] - 2025-05-30

### Added
- Added server-side upload types to the shared package:
  - `InternalUploadType` for internal tracking
  - `StorageHealthCheckResult` for storage connectivity checks
  - `UploadEventData` for upload event communication
  - `UploadMulterFile` for extended file uploads
  - `UploadStatus` and `UploadProgress` for tracking upload progress
- Added documentation to clarify `fileId` might be the same as `sessionId` during pre-registration

## [1.13.10] - 2025-05-25

### Fixed
- Fixed missing exports for file permission types

## [1.13.9] - 2025-05-20

### Added
- Added new file permission models and interfaces