/**
 *
 * Google Tag Manager (GTM) script Loader
 * GTM script loader helps you to init GTM async
 *
 * @param containerId (string)
 * @param dataLayerKey (string)
 * @param timeoutDuration (integer)
 * @returns Promise
 */

export default function gtmLoader(
	containerId: string,
	dataLayerKey: string = 'dataLayer',
	timeoutDuration: number = 2000
): Promise<Event> {
	const baseUrl = 'https://www.googletagmanager.com/gtm.js';

	// Check if script is loaded into a browser environment
	if (typeof window === 'undefined') {
		throw new Error('initGTM can only loaded into a browser environment!');
	}

	// Throw a nerror when container id undefined when calling initGTM
	if (typeof containerId === 'undefined') {
		throw new Error('Container id is not defined!');
	}

	// Prepare dataLayer array for GTM
	window[dataLayerKey] = window[dataLayerKey] || [{ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' }];

	// Create script element to load GTM main script
	const scriptElement = document.createElement('script');

	// Construct URL with query parameters
	const scriptSrc = generateUrl(baseUrl, {
		id: containerId,
		...(dataLayerKey !== 'dataLayer' ? { l: dataLayerKey } : {}),
	});

	scriptElement.setAttribute('src', scriptSrc);
	scriptElement.setAttribute('async', 'true');

	// Insert element to the end of the <head> element
	const headElement = document.getElementsByTagName('head');
	headElement[0].insertAdjacentElement('beforeend', scriptElement);

	// Return a promise to make it possible to detect when GTM is ready.
	return new Promise(function (resolve, reject) {
		// Start timeout to not make GTM as a blocker
		const timeout = setTimeout((event) => {
			resolve(event);
			clearTimeout(timeout);
			console.warn('It took too long time to load GTM!');
		}, timeoutDuration);

		// Handle when script is loaded successfully
		scriptElement.addEventListener('load', function (event: Event) {
			resolve(event);
			clearTimeout(timeout);
		});

		// Handle when there was an error while loading the script
		scriptElement.addEventListener('error', function (event: Event) {
			reject(event);
			clearTimeout(timeout);
			throw new Error('Google Tag Manager script was not loaded!');
		});
	});
}

function generateUrl(baseUrl: string, queryParamsObject: { [key: string]: string }): string {
	const queryString = Object.keys(queryParamsObject).reduce((acc, key) => {
		return `${acc === '' ? '?' : '&'}${key}=${queryParamsObject[key]}`;
	}, '');

	return `${baseUrl}${queryString}`;
}
