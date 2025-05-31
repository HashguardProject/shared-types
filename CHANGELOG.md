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
- New server-side upload types: `InternalUploadType`, `StorageHealthCheckResult`, `UploadEventData`, `UploadMulterFile`, `UploadStatus`, `UploadProgress`
- Documentation clarification for `PreRegistrationResponse.fileId`

### Fixed
- Fixed export issues with upload types by removing duplicated type definitions
- Ensured proper exports of all upload-related types in the package

## [1.13.10] - 2025-05-25

### Fixed
- Missing exports for file permission types

## [1.13.9] - 2025-05-20

### Added
- New file permission models and interfaces