import { asyncScriptLoader } from '@zoltanradics/async-script-loader';

/**
 * Google Tag Manager (GTM) Loader
 * GTM script loader helps you to init GTM async
 *
 * @param containerId - GTM container ID (e.g., 'GTM-XXXXXX')
 * @param dataLayerKey - Optional data layer name (defaults to 'dataLayer')
 * @returns Promise that resolves when GTM is loaded
 */
export default function googleTagManagerLoader(
	containerId: string,
	dataLayerKey: string = 'dataLayer'
): Promise<void> {
	const baseUrl = 'https://www.googletagmanager.com/gtm.js';

	// Check if script is loaded into a browser environment
	if (typeof window === 'undefined') {
		throw new Error('gtmLoader can only be loaded in a browser environment!');
	}

	// Validate containerId is provided and not empty
	if (typeof containerId !== 'string' || containerId.trim() === '') {
		throw new Error('Container id must be a non-empty string!');
	}

	// Validate GTM container ID format (GTM-XXXXXX or GTM-XXXXXXX)
	const gtmIdPattern = /^GTM-[A-Z0-9]{6,8}$/;
	if (!gtmIdPattern.test(containerId)) {
		throw new Error('Invalid GTM container ID format. Expected format: GTM-XXXXXX (e.g., GTM-ABC123)');
	}

	// Validate dataLayerKey is not empty
	if (typeof dataLayerKey !== 'string' || dataLayerKey.trim() === '') {
		throw new Error('dataLayerKey must be a non-empty string!');
	}

	// Validate dataLayerKey is a valid JavaScript identifier
	const validIdentifierPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
	if (!validIdentifierPattern.test(dataLayerKey)) {
		throw new Error('dataLayerKey must be a valid JavaScript identifier (no spaces or special characters)!');
	}

	// Prepare dataLayer array for GTM
	(window as any)[dataLayerKey] = (window as any)[dataLayerKey] || [{ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' }];

	// Build query parameters
	const queryParams: { [key: string]: string } = {
		id: containerId,
		...(dataLayerKey !== 'dataLayer' ? { l: dataLayerKey } : {}),
	};

	// Use dynamic script injector to load GTM
	return asyncScriptLoader(baseUrl, queryParams);
}
