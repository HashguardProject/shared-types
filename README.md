# @hashguard/shared-types

Shared TypeScript types for Hashguard security system.


## Prerequisites

- Node.js >= 20
- pnpm (recommended) or npm
- GitHub account with access to the Hashguard organization


## Installation

### 1. Authentication Setup

Before installing, you need to authenticate with GitHub Packages. Choose one of these methods:

#### Method A: Using Personal Access Token (PAT) - Recommended for Development

1. Create a GitHub Personal Access Token:
   - Go to GitHub → Settings → Developer Settings → Personal Access Tokens (Classic)
   - Select scopes: `read:packages`, `repo`
   - Copy your token

2. Configure authentication (choose one):
```bash
Option 1: Add to your global ~/.npmrc (Recommended for personal development)
echo "//npm.pkg.github.com/:authToken=YOUR_PAT_TOKEN" >> ~/.npmrc


Option 2: Use environment variable
export GITHUB_TOKEN=YOUR_PAT_TOKEN
```

#### Method B: CI/CD Environment (GitHub Actions)

```yaml
- uses: actions/setup-node@v3
with:
node-version: '20'
registry-url: 'https://npm.pkg.github.com'
scope: '@hashguard'
```

### 2. Project Setup

1. Create `.npmrc` in your project root:
```ini
@hashguardproject:registry=https://npm.pkg.github.com
```


2. Install the package:
```bash
npm install @hashguard/shared-types
```

## Usage

```typescript
import { Fingerprint, DeviceType, RiskSeverity } from '@hashguard/shared-types';
// Use the types in your code
const fingerprint: Fingerprint = {
// ...
};
```

## Cloud Deployment

### Option 1: Using Environment Variables
```bash
Add to your cloud platform's environment variables
GITHUB_TOKEN=your_pat_token

Your application will use this token via .npmrc
@hashguardproject:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:authToken=${GITHUB_TOKEN}
```
### Option 2: Using Secret Management
```bash
# AWS Systems Manager example
aws ssm put-parameter \
--name "/myapp/github_token" \
--value "your_pat_token" \
--type "SecureString"
```

## To use in other projects:

### Add to .npmrc
```bash
@hashguardproject:registry=https://npm.pkg.github.com
```

### Install the package
```bash
npm install @hashguard/shared-types
```

## Development

### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/hashguard/shared-types.git
cd shared-types
```

2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Build: `npm run build`


## Authenticate

1. Get your token:
Go to github, on settings => dev settings => token

2. Add your token on your global .npmrc
```bash
echo "@hashguardproject:registry=https://npm.pkg.github.com 
//npm.pkg.github.com/:_authToken=ghp_YOUR_TOKEN" > ~/.npmrc
```
3. add your token on your codebase
```bash
export GITHUB_TOKEN=ghp_YOUR_TOKEN
```

4. Verify
```bash
npm whoami --registry=https://npm.pkg.github.com
(should send back your github username)
```

## Publishing

```bash
1. Run tests and checks

npm run test
npm run lint

2. Update version (choose one)

npm version patch # 1.0.0 -> 1.0.1
npm version minor # 1.0.0 -> 1.1.0
npm version major # 1.0.0 -> 2.0.0


3. Build the package

npm run build


4. Publish to npm registry

npm publish
Or public publish:
npm publish --access public


5. Push changes and tags

git push origin main --tags


6. The CI pipeline will automatically:
   - Run tests
   - Build package
   - Publish to GitHub Packages
```

## Security Best Practices

1. Never commit tokens to version control
2. Use environment variables for tokens
3. Rotate PATs regularly
4. Use the minimum required token scope
5. Set token expiration dates

## Support

For issues and feature requests, please use the GitHub issue tracker.

## License

MIT License - see LICENSE file for details
