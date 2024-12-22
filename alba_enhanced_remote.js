// ==UserScript==
// @name         Alba Enhancements Remote BETA
// @namespace    
// @version      1
// @description  Variety changes to Alba Mobile changes to make it easier to see
// @match        ://www.mcmxiv.com/alba/mobile/
// @require      https://raw.githubusercontent.com/alberthchau/alba_enhanced/refs/heads/main/alba_enhanced.js?ts=TIMESTAMP
// ==/UserScript==

(function() {
    'use strict';
    
    // Dynamically add the cache buster to the required script
    const scriptUrl = 'https://raw.githubusercontent.com/alberthchau/alba_enhanced/refs/heads/main/alba_enhanced.js';
    const script = document.createElement('script');
    script.src = ${scriptUrl}?ts=${Date.now()};
    document.head.appendChild(script);
})();