# Publishing Checklist

## Pre-publish Verification ✅

- [x] README.md created
- [x] Version set to 1.0.0
- [x] package.json configured with repository, homepage, bugs URLs
- [x] publishConfig.access set to "public"
- [x] prepublishOnly script added
- [x] Build successful
- [x] Package preview looks good (npm pack --dry-run)

## Package Contents

Total size: **3.4 kB** (unpacked: 8.8 kB)

Files included:
- README.md (6.0 kB)
- dist/google-tag-manager-loader.js (574 B)
- dist/google-tag-manager-loader.d.ts (448 B)
- dist/google-tag-manager-loader.d.ts.map (266 B)
- package.json (1.5 kB)

## Publishing Steps

### 1. Check NPM Authentication

```bash
npm whoami
```

If not logged in:
```bash
npm login
```

### 2. Verify Package Name Availability

```bash
npm view @zoltanradics/google-tag-manager-loader
```

If it shows "npm ERR! 404" - good, the name is available!

### 3. Run Final Build

```bash
npm run build
```

### 4. Publish to NPM

```bash
npm publish
```

The `prepublishOnly` script will automatically run the build before publishing.

### 5. Verify Publication

```bash
npm view @zoltanradics/google-tag-manager-loader
```

### 6. Test Installation

In a test project:
```bash
npm install @zoltanradics/google-tag-manager-loader
```

## Post-publish Tasks

1. Create a GitHub release/tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. Update demo URL in README.md (if applicable)

3. Share on social media/communities

## Troubleshooting

### "You must be logged in to publish packages"
Run `npm login` and follow the prompts.

### "You do not have permission to publish"
Ensure you're logged in as the correct user and that the package name is under your scope.

### "Package name too similar to existing package"
Choose a different name or ensure you're using your scoped name (@yourusername/package-name).

### "This package has been marked as private"
Remove `"private": true` from package.json if present.

## Version Updates

For future updates:

```bash
# Patch release (1.0.0 -> 1.0.1)
npm version patch

# Minor release (1.0.0 -> 1.1.0)
npm version minor

# Major release (1.0.0 -> 2.0.0)
npm version major

# Then publish
npm publish
```
