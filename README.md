# Google Tag Manager Loader

[![npm version](https://img.shields.io/npm/v/@zoltanradics/google-tag-manager-loader.svg)](https://www.npmjs.com/package/@zoltanradics/google-tag-manager-loader)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight, promise-based Google Tag Manager (GTM) script loader for modern web applications. Built with TypeScript and powered by [@zoltanradics/async-script-loader](https://www.npmjs.com/package/@zoltanradics/async-script-loader).

## Features

- **Promise-based API** - Know exactly when GTM is loaded and ready
- **TypeScript Support** - Full type definitions included
- **Lightweight** - Only 0.57 kB (gzipped: 0.38 kB)
- **Modern ESM** - ES Module format for optimal tree-shaking
- **Zero Dependencies** - Only one peer dependency for script injection
- **Customizable DataLayer** - Support for custom dataLayer names
- **Browser Environment Detection** - Automatic checks for safe loading

## Installation

```bash
npm install @zoltanradics/google-tag-manager-loader
```

Or with yarn:

```bash
yarn add @zoltanradics/google-tag-manager-loader
```

Or with pnpm:

```bash
pnpm add @zoltanradics/google-tag-manager-loader
```

## Usage

### Basic Usage

```typescript
import googleTagManagerLoader from '@zoltanradics/google-tag-manager-loader';

// Load GTM with your container ID
googleTagManagerLoader('GTM-XXXXXX')
  .then(() => {
    console.log('GTM loaded successfully!');
    // GTM is now ready, tags will start firing
  })
  .catch((error) => {
    console.error('Failed to load GTM:', error);
  });
```

### With Async/Await

```typescript
import googleTagManagerLoader from '@zoltanradics/google-tag-manager-loader';

async function initializeAnalytics() {
  try {
    await googleTagManagerLoader('GTM-XXXXXX');
    console.log('GTM loaded successfully!');
  } catch (error) {
    console.error('Failed to load GTM:', error);
  }
}

initializeAnalytics();
```

### Custom DataLayer Name

```typescript
import googleTagManagerLoader from '@zoltanradics/google-tag-manager-loader';

// Use a custom dataLayer name
googleTagManagerLoader('GTM-XXXXXX', 'myCustomDataLayer')
  .then(() => {
    console.log('GTM loaded with custom dataLayer!');
  });
```

### React Example

```tsx
import { useEffect } from 'react';
import googleTagManagerLoader from '@zoltanradics/google-tag-manager-loader';

function App() {
  useEffect(() => {
    googleTagManagerLoader('GTM-XXXXXX')
      .then(() => console.log('GTM loaded'))
      .catch((error) => console.error('GTM error:', error));
  }, []);

  return <div>Your App</div>;
}
```

### Vue Example

```vue
<script setup>
import { onMounted } from 'vue';
import googleTagManagerLoader from '@zoltanradics/google-tag-manager-loader';

onMounted(async () => {
  try {
    await googleTagManagerLoader('GTM-XXXXXX');
    console.log('GTM loaded');
  } catch (error) {
    console.error('GTM error:', error);
  }
});
</script>
```

## API

### `googleTagManagerLoader(containerId, dataLayerKey?)`

Loads the Google Tag Manager script asynchronously.

#### Parameters

- **`containerId`** (string, required) - Your GTM container ID (e.g., 'GTM-XXXXXX')
- **`dataLayerKey`** (string, optional) - Custom dataLayer name (defaults to 'dataLayer')

#### Returns

- **`Promise<void>`** - Resolves when GTM script is successfully loaded, rejects on error

#### Throws

- **`Error`** - If called in a non-browser environment (no `window` object)
- **`Error`** - If `containerId` is undefined or invalid

## How It Works

1. **Environment Check** - Verifies execution in a browser environment
2. **DataLayer Initialization** - Creates or uses existing `window.dataLayer` with GTM start event
3. **Script Injection** - Uses `@zoltanradics/async-script-loader` to load `gtm.js`
4. **Promise Resolution** - Returns promise that resolves when script loads successfully

## Browser Support

Works in all modern browsers that support:
- ES2020
- ES Modules
- Promises
- Native async/await

## Demo

Check out the [live demo](https://gtm-loader.radics.io/) to see the loader in action with real-time logging and dataLayer monitoring.

## Development

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Run demo in development
npm run demo:dev

# Build demo for deployment
npm run demo:build
```

### Project Structure

```
├── src/
│   └── google-tag-manager-loader.ts  # Main source file
├── demo/
│   ├── index.html                    # Demo page
│   ├── demo.js                       # Demo logic
│   └── style.css                     # Demo styles
├── dist/                             # Built library (generated)
├── dist-demo/                        # Built demo (generated)
└── package.json
```

## Why Use This Loader?

### Instead of Direct Script Tag

```html
<!-- Traditional approach -->
<script>(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXXX');</script>
```

**Benefits of using this loader:**
- ✅ Promise-based - Know when GTM is ready
- ✅ Error handling - Catch loading failures
- ✅ TypeScript types - Full IDE support
- ✅ Tree-shakeable - Optimal bundle size
- ✅ Testable - Easy to mock in tests
- ✅ Modern - Follows JavaScript best practices

## Related Packages

- [@zoltanradics/async-script-loader](https://www.npmjs.com/package/@zoltanradics/async-script-loader) - The underlying script injection library

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Zoltan Radics](https://github.com/zoltanradics)

## Support

- **Issues**: [GitHub Issues](https://github.com/zoltanradics/google-tag-manager-loader/issues)
- **NPM**: [@zoltanradics/google-tag-manager-loader](https://www.npmjs.com/package/@zoltanradics/google-tag-manager-loader)

---

Made with ❤️ by [Zoltan Radics](https://github.com/zoltanradics)
