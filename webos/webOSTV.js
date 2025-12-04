/**
 * webOS TV Library Stub
 * This provides compatibility when testing outside webOS
 * The actual webOS TV will provide the real implementation
 */

if (typeof webOS === 'undefined') {
    window.webOS = {
        platform: { tv: true },
        platformBack: function() {
            console.log('webOS: platformBack called');
            window.history.back();
        },
        deviceInfo: function(callback) {
            callback({
                modelName: 'DEBUG_MODEL',
                version: '1.0.0',
                versionMajor: 1,
                versionMinor: 0,
                versionDot: 0,
                sdkVersion: '1.0.0',
                screenWidth: 1920,
                screenHeight: 1080,
                uhd: true
            });
        },
        keyboard: {
            isShowing: function() { return false; }
        },
        service: {
            request: function(uri, params) {
                console.log('webOS service request:', uri, params);
                if (params.onSuccess) params.onSuccess({});
            }
        },
        libVersion: '1.0.0'
    };
}

// Make webOS globally available
window.webOS = window.webOS || {};
