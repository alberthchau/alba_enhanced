// ==UserScript==
// @name Enhance UI on mcmxiv
// @namespace your-namespace
// @version 1
// @description Enhances the UI on the mcmxiv website by changing the background color of certain elements, increasing the font size of all text elements, and adding a line break after <span class="label muted"> elements.
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
  
  	function addNewRows() {
          // Find the <tbody> element with the id "addresses"
          var tbody = document.getElementById("addresses");

          if (tbody) {
              // Find all <tr> elements within the <tbody>
              var rows = tbody.querySelectorAll("tr");

              // Loop through each existing <tr> element and add an empty <tr> underneath
              rows.forEach(function(row) {
                  var emptyRow = document.createElement("tr");
                  tbody.insertBefore(emptyRow, row.nextSibling);
              });
          }
    }

    function increaseFontSize() {
        var allTextElements = document.querySelectorAll('*:not(script):not(style):not(iframe):not(textarea):not(pre):not(code)');
        console.log("Found " + allTextElements.length + " text elements on the page.");

        if (allTextElements.length > 0) {
            for (var i = 0; i < allTextElements.length; i++) {
                allTextElements[i].style.fontSize = "100.02%"; // Increase the font size by 1.25x
                console.log("Increased font size for element #" + i + ".");
            }
        } else {
            console.log("No text elements found on the page.");
        }
    }

    // Wait for the page to fully load before running the functions
    window.addEventListener('DOMContentLoaded', function() {
        applyBackgroundColor();
      	//addNewRows();
        increaseFontSize();
    });

    // Watch for changes to the page and reapply the script whenever the page is updated
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            applyBackgroundColor();
          	//addNewRows();
            increaseFontSize();
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();

/*

(function() {
    'use strict';

    function duplicateAndModifyTRs() {
        console.log('Script is running. Waiting for page to load...');

        window.addEventListener('load', function() {
            console.log('Page is fully loaded. Waiting for <tr> elements...');

            // Function to duplicate and modify <tr> elements
            function duplicateAndModify(trElements) {
                // Print out the number of trElements
                console.log('Number of trElements:', trElements.length);

                trElements.forEach((originalTR) => {
                    const clonedTR = originalTR.cloneNode(true);
                    clonedTR.style.height = (parseFloat(getComputedStyle(originalTR).height) / 2) + 'px';

                    // Remove content from the cloned TR
                    clonedTR.innerHTML = '';
                    originalTR.parentNode.insertBefore(clonedTR, originalTR.nextSibling);
                });
            }

            const targetNode = document.body;
            const config = { childList: true, subtree: true };

            // Create a MutationObserver to watch for changes in the DOM
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        const trElements = Array.from(document.querySelectorAll('tr[id^="ad"]'));
                        if (trElements.length > 0) {
                            // Disconnect the observer once elements are found
                            observer.disconnect();
                            duplicateAndModify(trElements);
                            break;
                        }
                    }
                }
            });

            // Start observing the target node for changes
            observer.observe(targetNode, config);
        });
    }

    duplicateAndModifyTRs();
})();

*/


/*
(function() {
    'use strict';

    function modifyTRs() {
        console.log('Script is running. Waiting for page to load...');

        window.addEventListener('load', function() {
            console.log('Page is fully loaded. Waiting for <tr> elements...');

            // Function to modify <tr> elements
            function modify(trElements) {
                // Print out the number of trElements
                console.log('Number of trElements:', trElements.length);

                trElements.forEach((tr) => {
                    const existingHeight = parseFloat(getComputedStyle(tr).height);
                    tr.style.height = (existingHeight * 2) + 'px';
                }
            }
            
            const trElements = Array.from(document.querySelectorAll('tr[id^="ad"]'));

            // Modify the <tr> elements with IDs starting with "ad"
            modify(trElements);
            
            // Disconnect the observer to avoid further observations
            observer.disconnect();
        });
    }

    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    // Create a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const trElements = Array.from(document.querySelectorAll('tr[id^="ad"]'));
                if (trElements.length > 0) {
                    // Call the function to modify <tr> elements
                  	console.log('Calling modifyTRs');
                    modifyTRs();
                }
            }
        }
    });

    // Start observing the target node for changes
    observer.observe(targetNode, config);
})();
*/