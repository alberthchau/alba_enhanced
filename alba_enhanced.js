// ==UserScript==
// @name Alba Enhancements STABLE
// @namespace
// @version 1
// @description Variety changes to Alba Mobile changes to make it easier to see
// @match *://www.mcmxiv.com/alba/mobile/*
// @grant none
// ==/UserScript==

(function () {
  "use strict";

  // Add CSS styles for de-emphasis
  const styleTag = document.createElement("style");
  styleTag.id = "de-emphasis-styles";
  styleTag.textContent = `
        .de-emphasize-opacity {
            opacity: 0.6 !important;
        }
    `;
  document.head.appendChild(styleTag);

  function applyBackgroundColor() {
    var spanTags = document.querySelectorAll("span.label.muted");
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

  function deEmphasizeCompletedRows() {
    var adRows = document.querySelectorAll('tr[id*="ad"]');
    console.log("Processing " + adRows.length + " ad rows");

    adRows.forEach(function (row) {
      // Check for success label
      const successLabel = row.querySelector("span.label.label-success");
      console.log(`Row ${row.id} - Has success label: ${!!successLabel}`);

      // Check for orange background spans
      const mutedSpans = row.querySelectorAll("span.label.muted");
      let orangeSpansCount = 0;

      mutedSpans.forEach((span) => {
        const computedStyle = window.getComputedStyle(span);
        const bgColor = span.style.backgroundColor || computedStyle.backgroundColor;
        if (bgColor === "rgb(247, 112, 0)" || bgColor === "#f77000") {
          orangeSpansCount++;
          console.log(`Found orange span in row ${row.id} (count: ${orangeSpansCount})`);
        }
      });

      // If EITHER condition is met (has success label OR two or more orange spans)
      if (successLabel || orangeSpansCount >= 2) {
        console.log(`Applying de-emphasis to row ${row.id} - ` + `Success label: ${!!successLabel}, Orange spans: ${orangeSpansCount}`);
        row.classList.add("de-emphasize-opacity");
      } else {
        console.log(`Conditions not met for row ${row.id} - ` + `Success label: ${!!successLabel}, Orange spans: ${orangeSpansCount}`);
      }
    });
  }

  function applyAllEnhancements() {
    console.log("Running all enhancements...");
    applyBackgroundColor();
    setTimeout(deEmphasizeCompletedRows, 100);
  }

  // Run the script initially with a delay to ensure page is loaded
  setTimeout(applyAllEnhancements, 500);

  // Watch for changes to the page and reapply the script
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
      applyAllEnhancements();
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
