// Basic test to verify that type exports work correctly
import {
  ResourceStatus,
  PrivacyResourceStatus,
  PreRegisterFileDto,
  PreRegistrationResponse,
  ExtendedUploadOptions,
  ProgressInfo
} from '../index';

// Simple test to verify ResourceStatus enum includes PENDING
const resourceStatusTest = () => {
  // This should compile if the enum is exported correctly
  const status = ResourceStatus.PENDING;
  console.log(`Resource status: ${status}`);
  return status === 'pending';
};

// Simple test to verify ExtendedUploadOptions includes maxRetries
const uploadOptionsTest = () => {
  const options: ExtendedUploadOptions = {
    parentFolderId: 'folder123',
    onProgress: (progress: ProgressInfo) => {
      console.log(`Progress: ${progress.percent}%`);
      // These should be available from our extended interface
      if (progress.fileName) console.log(`File: ${progress.fileName}`);
      if (progress.fileId) console.log(`ID: ${progress.fileId}`);
    },
    maxRetries: 3,
    retryDelay: 1000,
    usePreRegistration: true
  };
  return options;
};

// Test for PreRegisterFileDto
const preRegisterDtoTest = () => {
  const dto: PreRegisterFileDto = {
    name: 'test.txt',
    size: 1024,
    mimeType: 'text/plain',
    parentFolderId: 'folder123'
  };
  return dto;
};

// Test for PreRegistrationResponse
const preRegistrationResponseTest = () => {
  const response: PreRegistrationResponse = {
    fileId: 'file123',
    sessionId: 'session456',
    expiresAt: new Date()
  };
  return response;
};

// Export the tests for verification
export {
  resourceStatusTest,
  uploadOptionsTest,
  preRegisterDtoTest,
  preRegistrationResponseTest
}; 