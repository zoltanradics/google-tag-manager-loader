import { dynamicScriptInjector } from '@zoltanradics/dynamic-script-injector';

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

	// Throw an error when container id is undefined
	if (typeof containerId === 'undefined') {
		throw new Error('Container id is not defined!');
	}

	// Prepare dataLayer array for GTM
	(window as any)[dataLayerKey] = (window as any)[dataLayerKey] || [{ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' }];

	// Build query parameters
	const queryParams: { [key: string]: string } = {
		id: containerId,
		...(dataLayerKey !== 'dataLayer' ? { l: dataLayerKey } : {}),
	};

	// Use dynamic script injector to load GTM
	return dynamicScriptInjector(baseUrl, queryParams);
}
