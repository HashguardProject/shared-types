# @hashguard/shared-types

Shared TypeScript types for Hashguard security system.

## Installation

bash
npm install @hashguard/shared-types


## Usage

typescript
import { Fingerprint, DeviceType, RiskSeverity } from '@hashguard/shared-types';
// Use the types in your code
const fingerprint: Fingerprint = {
// ...
};

## To use in other projects:

### Add to .npmrc
@hashguard:registry=https://npm.pkg.github.com

### Install the package
npm install @hashguard/shared-types


## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Build: `npm run build`

## Publishing

### First time:

#### Login to GitHub Packages
npm login --registry=https://npm.pkg.github.com
#### Scope: @hashguard
#### Username: your GitHub username
#### Password: your GitHub personal access token

1. Update version: `npm version [patch|minor|major]`
2. Push changes and tags: `git push && git push --tags`
3. Create a release on GitHub
4. CI will automatically publish to GitHub Packages


