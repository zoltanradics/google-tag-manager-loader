export default function(dataLayerKey, containerId) {
	// Check if script is loaded into a browser environment
	if (typeof window === 'undefined') {
		throw new Error('initGTM can only loaded into a browser environment!')
	}

	// Throw a nerror when container id undefined when calling initGTM
	if (typeof containerId === 'undefined') {
		throw new Error('Container id is not defined!')
	}

	// Define or use data later array
	window[dataLayerKey] = window[dataLayerKey] || []

	// Push GTM start event
	window[dataLayerKey].push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' })

	// Create script element
	const scriptElement = document.createElement('script')
	scriptElement.src = generateUrl(containerId, dataLayerKey)
	scriptElement.async = true

	// Return a promise to make it possible to detect when GTM is ready.
	return new Promise(function(resolve, reject) {
		// Insert element to the end of the <head> element
		const head = document.getElementsByTagName('head')
		head[0].insertAdjacentElement('beforeend', scriptElement)

		// Handle when script is loaded successfully
		scriptElement.addEventListener('load', function(event) {
			resolve()
		})

		// Handle when there was an error while loading the script
		scriptElement.addEventListener('error', function(event) {
			reject()
			throw new Error('Google Tag Manager script was not loaded!')
		})
	})
}

function generateUrl(containerId, dataLayerKey) {
	return `https://www.googletagmanager.com/gtm.js?id=${containerId}${'dataLayer' ? '&l=' + dataLayerKey : ''}`
}