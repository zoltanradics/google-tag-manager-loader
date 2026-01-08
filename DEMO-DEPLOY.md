# Demo Deployment Guide

This guide explains how to build and deploy the Google Tag Manager Loader demo page.

## Building the Demo

### Development
To run the demo in development mode with hot reload:

```bash
npm run demo:dev
```

This will start a development server (usually at `http://localhost:5173`).

### Production Build
To build the demo for production deployment:

```bash
npm run demo:build
```

This creates a `dist-demo` folder with all the production-ready files.

## Deployment

### What to Deploy
After running `npm run demo:build`, deploy the entire contents of the `dist-demo` folder to your web hosting service.

The `dist-demo` folder contains:
- `index.html` - The main demo page
- `assets/` - Bundled CSS and JavaScript files

### Deployment Options

#### Option 1: Static File Hosting
Upload all files from `dist-demo/` to your web hosting service:
- FTP/SFTP upload
- cPanel File Manager
- Web hosting control panel

**Important:** Maintain the folder structure. The `assets` folder must remain in the same directory as `index.html`.

#### Option 2: Using rsync (for Linux/Mac servers)
```bash
rsync -avz dist-demo/ user@yourserver.com:/path/to/webroot/
```

#### Option 3: Using GitHub Pages
1. Build the demo: `npm run demo:build`
2. Copy contents of `dist-demo/` to your GitHub Pages repository
3. Push to GitHub

#### Option 4: Using Netlify/Vercel
Simply drag and drop the `dist-demo` folder to Netlify or Vercel's web interface.

## Testing the Deployment

1. Open the deployed URL in your browser
2. Click "Load Google Tag Manager"
3. Check the event log for successful loading messages
4. View the dataLayer contents
5. Open Chrome DevTools > Network tab to verify gtm.js was loaded
6. Use Google Tag Manager's Preview mode to test your tags

## GTM Container

The demo uses GTM Container ID: **GTM-TJC7PXJ6**

To use your own container:
1. Edit `demo/demo.js`
2. Change the `containerId` constant
3. Rebuild: `npm run demo:build`

## Preview Before Deployment

To preview the production build locally:

```bash
npm run demo:preview
```

This serves the built files from `dist-demo` at a local URL (usually `http://localhost:4173`).

## File Structure

```
dist-demo/
├── index.html              # Main demo page
└── assets/
    ├── main-[hash].css     # Bundled styles
    └── main-[hash].js      # Bundled JavaScript
```

## Troubleshooting

### Demo page loads but GTM doesn't work
- Check browser console for errors
- Verify the GTM container ID is correct
- Ensure your GTM container is published
- Check if GTM is blocked by ad blockers

### CSS/JS files not loading
- Verify file paths in index.html are relative (`./assets/...`)
- Check that the `assets` folder was uploaded
- Clear browser cache

### CORS errors
- Ensure files are served from the same domain
- GTM scripts are loaded from `googletagmanager.com` (should work everywhere)

## Support

For issues, visit: https://github.com/zoltanradics/google-tag-manager-loader/issues
