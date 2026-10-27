
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const dpiInput = document.getElementById("dpi");
  const sensitivityInput = document.getElementById("sensitivity");
  const resultOutput = document.getElementById("edpi-result");
  const resultMessage = document.getElementById("result-message");
  const errorMessage = document.getElementById("error-message");
  const presetButtons = document.querySelectorAll(".preset");
  const websiteLink = document.getElementById("website-link");

  function calculateEDPI() {
    const dpiText = dpiInput.value.trim();
    const sensitivityText = sensitivityInput.value.trim();

    const dpi = Number(dpiText);
    const sensitivity = Number(sensitivityText);

    const validDPI =
      dpiText !== "" &&
      Number.isFinite(dpi) &&
      dpi >= 1 &&
      dpi <= 100000;

    const validSensitivity =
      sensitivityText !== "" &&
      Number.isFinite(sensitivity) &&
      sensitivity > 0 &&
      sensitivity <= 1000;

    if (!validDPI || !validSensitivity) {
      resultOutput.textContent = "—";
      resultMessage.textContent = "Enter valid settings to calculate eDPI.";

      if (!validDPI && !validSensitivity) {
        errorMessage.textContent =
          "Enter a DPI from 1 to 100000 and sensitivity greater than 0 up to 1000.";
      } else if (!validDPI) {
        errorMessage.textContent =
          "DPI must be a number between 1 and 100000.";
      } else {
        errorMessage.textContent =
          "Sensitivity must be greater than 0 and no more than 1000.";
      }

      errorMessage.hidden = false;
      return;
    }

    const edpi = dpi * sensitivity;

    if (!Number.isFinite(edpi)) {
      resultOutput.textContent = "—";
      resultMessage.textContent = "Unable to calculate this result.";
      errorMessage.textContent = "Please enter smaller valid numbers.";
      errorMessage.hidden = false;
      return;
    }

    resultOutput.textContent = Number(edpi.toFixed(3)).toLocaleString(
      "en-US",
      { maximumFractionDigits: 3 }
    );

    resultMessage.textContent =
      `${dpi.toLocaleString("en-US")} DPI × ${sensitivity} sensitivity`;

    errorMessage.textContent = "";
    errorMessage.hidden = true;
  }

  function updateActivePreset() {
    const currentDPI = Number(dpiInput.value);

    presetButtons.forEach((button) => {
      const selected = Number(button.dataset.dpi) === currentDPI;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  dpiInput.addEventListener("input", () => {
    calculateEDPI();
    updateActivePreset();
  });

  sensitivityInput.addEventListener("input", calculateEDPI);

  presetButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.dpi === dpiInput.value)
    );

    button.addEventListener("click", () => {
      dpiInput.value = button.dataset.dpi;
      calculateEDPI();
      updateActivePreset();
    });
  });

  websiteLink.addEventListener("click", (event) => {
    event.preventDefault();

    // Open only the intended website in a new tab.
    window.open(
      "https://mousedpianalyzertool.com/",
      "_blank",
      "noopener,noreferrer"
    );
  });

  calculateEDPI();
  updateActivePreset();
});
