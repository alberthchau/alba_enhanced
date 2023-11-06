// ==UserScript==
// @name Change Span Background Color to Orange on mcmxiv
// @namespace your-namespace
// @version 1
// @description Changes the background color of <span class="label muted"> tags to orange (#f77000) on mcmxiv website, except for those that begin with "Contacted"
// @match https://www.mcmxiv.com/alba/mobile/*
// @grant none
// ==/UserScript==

(function() {
    'use strict';

    function applyBackgroundColor() {
        var spanTags = document.querySelectorAll('span.label.muted');
        console.log("Found " + spanTags.length + " <span> tags with class 'label muted'.");

        if (spanTags.length > 0) {
            for (var i = 0; i < spanTags.length; i++) {
                // Check if the text content of the span tag starts with "Contacted"
                if (!spanTags[i].textContent.startsWith("Contacted")) {
                    spanTags[i].style.backgroundColor = "#f77000";
                    console.log("Changed background color of <span> tag #" + i + ".");
                } else {
                    console.log("Skipping <span> tag #" + i + ".");
                }
            }
        } else {
            console.log("No <span> tags with class 'label muted' found.");
        }
    }

    // Run the script initially
    applyBackgroundColor();

    // Watch for changes to the page and reapply the script whenever the page is updated
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            applyBackgroundColor();
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();