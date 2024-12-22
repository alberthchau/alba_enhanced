// ==UserScript==
// @name Alba Enhancements BETA
// @namespace
// @version 1
// @description Variety changes to Alba Mobile changes to make it easier to see
// @match *://www.mcmxiv.com/alba/mobile/*
// @grant none
// ==/UserScript==

(function () {
  "use strict";

  const styleTag = document.createElement("style");
  styleTag.id = "de-emphasis-styles";
  styleTag.textContent = `
        .de-emphasize-opacity {
            opacity: 0.6 !important;
        }
        .strike-through {
            text-decoration: line-through !important;
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
      const successLabel = row.querySelector("span.label.label-success");
      const mutedSpans = row.querySelectorAll("span.label.muted");
      let orangeSpansCount = 0;

      mutedSpans.forEach((span) => {
        const computedStyle = window.getComputedStyle(span);
        const bgColor = span.style.backgroundColor || computedStyle.backgroundColor;
        if (bgColor === "rgb(247, 112, 0)" || bgColor === "#f77000") {
          orangeSpansCount++;
        }
      });

      if (successLabel || orangeSpansCount >= 2) {
        row.classList.add("de-emphasize-opacity");

        // Add strike-through to address spans in completed rows
        const addressSpans = row.querySelectorAll("span.where");
        addressSpans.forEach((span) => {
          span.classList.add("strike-through");
        });
      }
    });
  }

  function applyAllEnhancements() {
    console.log("Running all enhancements...");
    applyBackgroundColor();
    setTimeout(deEmphasizeCompletedRows, 100);
  }

  setTimeout(applyAllEnhancements, 500);

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
      applyAllEnhancements();
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
