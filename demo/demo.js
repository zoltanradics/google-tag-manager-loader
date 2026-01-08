import googleTagManagerLoader from '../src/google-tag-manager-loader.ts';

// Logger utility
class Logger {
    constructor(containerId) {
        this.container = containerId;
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry log-${type}`;

        const timestampSpan = document.createElement('span');
        timestampSpan.className = 'timestamp';
        timestampSpan.textContent = `[${timestamp}]`;

        const messageSpan = document.createElement('span');
        messageSpan.className = 'message';
        messageSpan.textContent = message;

        logEntry.appendChild(timestampSpan);
        logEntry.appendChild(messageSpan);

        this.container.appendChild(logEntry);
        this.container.scrollTop = this.container.scrollHeight;
    }

    info(message) {
        this.log(message, 'info');
    }

    success(message) {
        this.log(message, 'success');
    }

    error(message) {
        this.log(message, 'error');
    }

    warning(message) {
        this.log(message, 'warning');
    }
}

// Initialize logger
const logContainer = document.getElementById('logContainer');
const logger = new Logger(logContainer);

// Update status display
function updateStatus(text, type = 'loading') {
    const statusBox = document.getElementById('status');
    const statusText = document.getElementById('statusText');
    const statusIndicator = statusBox.querySelector('.status-indicator');

    statusBox.className = `status-box ${type}`;
    statusText.textContent = text;

    // Update icon based on status type
    if (type === 'success') {
        statusIndicator.innerHTML = `
            <span class="checkmark">✓</span>
            <span id="statusText">${text}</span>
        `;
    } else if (type === 'error') {
        statusIndicator.innerHTML = `
            <span class="errormark">✗</span>
            <span id="statusText">${text}</span>
        `;
    } else {
        statusIndicator.innerHTML = `
            <span class="spinner"></span>
            <span id="statusText">${text}</span>
        `;
    }

    if (type === 'loading' || type === 'success' || type === 'error') {
        statusBox.classList.remove('hidden');
    }
}

// Update dataLayer display
function updateDataLayerDisplay() {
    const dataLayerContent = document.getElementById('dataLayerContent');

    if (window.dataLayer && window.dataLayer.length > 0) {
        dataLayerContent.textContent = JSON.stringify(window.dataLayer, null, 2);
        logger.info(`DataLayer contains ${window.dataLayer.length} entries`);
    } else {
        dataLayerContent.textContent = 'dataLayer not initialized';
        logger.warning('DataLayer is empty or not initialized');
    }
}

// Monitor dataLayer changes
function monitorDataLayer() {
    if (!window.dataLayer) return;

    const originalPush = window.dataLayer.push;
    window.dataLayer.push = function(...args) {
        logger.info(`DataLayer push: ${JSON.stringify(args)}`);
        updateDataLayerDisplay();
        return originalPush.apply(this, args);
    };
}

// Load GTM
async function loadGTM() {
    const loadButton = document.getElementById('loadGtm');
    const containerId = 'GTM-TJC7PXJ6';

    loadButton.disabled = true;
    updateStatus('Loading Google Tag Manager...', 'loading');
    logger.info(`Starting GTM loader for container: ${containerId}`);

    try {
        // Log before loading
        logger.info('Calling googleTagManagerLoader()...');
        logger.info('Initializing dataLayer with GTM start event');

        // Load GTM
        await googleTagManagerLoader(containerId);

        // Success
        updateStatus('GTM loaded successfully!', 'success');
        logger.success('GTM script loaded successfully!');
        logger.success('GTM container is now active');

        // Monitor dataLayer for changes
        monitorDataLayer();

        // Show initial dataLayer
        updateDataLayerDisplay();

        // Check for GTM in window
        if (window.google_tag_manager && window.google_tag_manager[containerId]) {
            logger.success(`GTM container ${containerId} found in window.google_tag_manager`);
        }

        // Log pageview event
        setTimeout(() => {
            logger.info('GTM should have fired pageview triggers by now');
            logger.info('Check your GTM Debug Console for fired tags');
        }, 1000);

    } catch (error) {
        updateStatus('Failed to load GTM', 'error');
        logger.error(`Error loading GTM: ${error.message}`);
        console.error('GTM Loading Error:', error);
        loadButton.disabled = false;
    }
}

// Event listeners
document.getElementById('loadGtm').addEventListener('click', loadGTM);
document.getElementById('refreshDataLayer').addEventListener('click', () => {
    logger.info('Refreshing dataLayer display...');
    updateDataLayerDisplay();
});

// Initial log
logger.info('Demo page loaded and ready');
logger.info('GTM Container ID: GTM-TJC7PXJ6');
logger.info('Click "Load Google Tag Manager" to start');

// Check if GTM is already loaded (for page reloads)
if (window.dataLayer && window.dataLayer.length > 0) {
    logger.warning('DataLayer already exists (page may have been reloaded)');
    updateDataLayerDisplay();
}
