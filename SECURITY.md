# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within @hashguard/shared-types:

1. **DO NOT** open a public GitHub issue
2. Email our security team at security@hashguard.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

You should receive a response within 48 hours. Please allow us to assess and address the vulnerability before any public disclosure.

## Security Measures

### Package Security
- All dependencies are regularly audited
- Package is distributed only through secure GitHub Packages registry
- Automated security scanning on every PR
- Strict type checking enabled
- Runtime validation using Zod schemas

### Development Security
- Code analysis using ESLint security rules
- Automated dependency updates via Dependabot
- Regular security patches
- Signed commits required

### CI/CD Security
- npm audit runs on every build
- CodeQL analysis for JavaScript/TypeScript
- Dependency vulnerability scanning
- Access control through GitHub Actions secrets

## Best Practices for Users

1. Always use the latest version
2. Enable strict TypeScript checks
3. Implement runtime validation using provided Zod schemas
4. Keep dependencies up to date
5. Use proper authentication when accessing GitHub Packages

## Acknowledgments

We appreciate security researchers who help keep @hashguard/shared-types and our users safe. Responsible disclosure of vulnerabilities helps us ensure the security and privacy of our users. 