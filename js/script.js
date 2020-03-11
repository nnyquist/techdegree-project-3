/**
 * Declare Document Constants
 */
const form = document.querySelector("form");

// Basic Info
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#mail");
const jobOther = document.querySelector("#other-title");
const jobRole = document.querySelector("#title");

// T-Shirt Info
const colorLabel = document.querySelector('label[for="color"]');
const colorMenu = document.querySelector("#color");
const colorOptions = colorMenu.children;
const colorDefault = document.createElement("option");
const designMenu = document.querySelector("#design");

// Register for Activities
const activityFieldset = document.querySelector(".activities");
const activities = document.querySelectorAll(".activities input");
let totalCost = 0;

// Payment Info
const creditCardDiv = document.querySelector("#credit-card");
const paypalDiv = document.querySelector("#paypal");
const bitcoinDiv = document.querySelector("#bitcoin");
const ccNum = document.querySelector("#cc-num");
const zipCode = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
const costLabel = document.createElement("label");
const paymentOptions = document.querySelector("#payment");

/**
 * User Created Functions
 */

 // Payment Info array of functions
 const payShow = {
    paypal: () => {
      paypalDiv.hidden = false;
      creditCardDiv.hidden = true;
      bitcoinDiv.hidden = true;
    },
    bitcoin: () => {
      bitcoinDiv.hidden = false;
      creditCardDiv.hidden = true;
      paypalDiv.hidden = true;
    },
    "credit card": () => {
      creditCardDiv.hidden = false;
      bitcoinDiv.hidden = true;
      paypalDiv.hidden = true;
    }
  };

// Form Validation
function nameBlank(name) {
  return !/^$/.test(name);
}

function emailValid(email) {
  return /^[^@ ]+@[^@. ]+\.\w{3,}/.test(email);
}

function atLeastOne() {
  let checked = 0;
  for (i = 0; i < activities.length; i++) {
    checked += activities[i].checked;
  }
  return checked > 0 ? true : false;
}

function creditNumValid(creditNum) {
  return /^\d{13,16}$/.test(creditNum);
}

function zipValid(zipCode) {
  return /^\d{5}$/.test(zipCode);
}

function cvvValid(cvv) {
  return /^\d{3}$/.test(cvv);
}

// Form Validation Listener Helper Function
function realTimeErrors(
  domElement,
  listenerType,
  validationFunc,
  errorClass = true
) {
  domElement.addEventListener(listenerType, e => {
    const val = domElement.value;
    const tooltip = e.target.nextElementSibling;
    if (!validationFunc(val)) {
      tooltip.style.display = "inherit";
      if (errorClass) {
        domElement.className = "error";
      }
    } else {
      tooltip.style.display = "none";
      if (errorClass) {
        domElement.className = "";
      }
    }
  });
}

/**
 * "Job Role" Section
 */

// Focus on Name Input
nameInput.focus();

// Toggle display of #other-title
jobOther.style.display = "none";
jobRole.addEventListener("change", e => {
  let optionValue = e.target.value;
  if (optionValue === "other") {
    jobOther.style.display = "block";
  } else {
    jobOther.style.display = "none";
  }
});

/**
 * "T-Shirt Info" section
 */

// Hide all the other options
for (i = 0; i < colorOptions.length; i++) {
  colorOptions[i].hidden = true;
}

// Add default label for color until something is chosen
colorDefault.value = "default";
colorDefault.textContent = "Please select a T-shirt theme";
colorDefault.selected = true;
colorMenu.appendChild(colorDefault);

// Hide "color" label and drop down until a T-Shirt design is chosen
colorMenu.hidden = true;
colorLabel.hidden = true;

designMenu.addEventListener("change", e => {
  let themeVal = e.target.value;
  let themeChoice = document
    .querySelector('option[value="' + themeVal + '"]')
    .textContent.replace(/^Theme - /, "");

  // associate color and theme menus
  for (i = 0; i < colorOptions.length; i++) {
    let listItem = colorOptions[i];
    if (listItem.textContent.includes(themeChoice)) {
      colorLabel.hidden = false;
      colorMenu.hidden = false;
      listItem.hidden = false;
    } else if (themeChoice === "Select Theme") {
      colorMenu.hidden = true;
      colorLabel.hidden = true;
    } else {
      listItem.hidden = true;
    }
  }

  // select the first non-hidden color option
  const notHidden = document.querySelector("#color option:not([hidden])");
  notHidden.selected = true;
});


/**
 * "Register for Activities" Section
 */
// 

// Update activities and cost as user makes changes
activityFieldset.addEventListener("change", e => {
  let clicked = e.target;
  let clickedCost = parseInt(e.target.dataset.cost);
  let clickedDate = e.target.dataset.dayAndTime;
  let clickedCheck = e.target.checked;

  for (i = 0; i < activities.length; i++) {
    let checkboxDate = activities[i].dataset.dayAndTime;

    // disable same date/time
    if (clickedDate === checkboxDate && clicked !== activities[i]) {
      if (clickedCheck) {
        activities[i].disabled = true;
      } else {
        activities[i].disabled = false;
      }
    }
  }

  // summarize cost
  if (clickedCheck) {
    totalCost += clickedCost;
  } else {
    totalCost -= clickedCost;
  }

  // append total cost after any change
  costLabel.textContent = "Total: $" + totalCost;
  activityFieldset.appendChild(costLabel);
});

/**
 * "Payment Info" section
 */

 // Payment Selection
for (i = 0; i < paymentOptions.children.length; i++) {
  // hide first option
  if (i === 0) {
    paymentOptions[i].hidden = true;
    // select Credit Card option by default, hide other divs
  } else if (i === 1) {
    paymentOptions[i].selected = true;
    payShow["credit card"]();
  }
}

// Payment View depending on user choice
paymentOptions.addEventListener("change", e => {
  let payChoice = e.target.value;
  payShow[payChoice]();
});

/**
 * Form Validation
 */

// Real Time Error messages
realTimeErrors(nameInput, "focusout", nameBlank);
realTimeErrors(emailInput, "input", emailValid);
realTimeErrors(zipCode, "keyup", zipValid);
realTimeErrors(cvv, "keyup", cvvValid);

activityFieldset.addEventListener("change", e => {
  const tooltip = document.querySelector(".activities span");
  if (!atLeastOne()) {
    tooltip.style.display = "inherit";
  } else {
    tooltip.style.display = "none";
  }
});

// 
ccNum.addEventListener("keyup", e => {
  const tooltip = e.target.nextElementSibling;
  const showAltMessage = ccNum.value === "" || /[^0-9]/.test(ccNum.value);
  if (!creditNumValid(ccNum.value) && showAltMessage) {
    tooltip.textContent = "Please enter a valid credit card number.";
    tooltip.style.display = "inherit";
    ccNum.className = "error";
  } else if (!creditNumValid(ccNum.value) && !showAltMessage) {
    tooltip.textContent =
      "Please enter a number that is between 13 and 16 digits long.";
    tooltip.style.display = "inherit";
    ccNum.className = "error";
  } else {
    tooltip.style.display = "none";
    ccNum.className = "";
  }
});

// Add listener to submit button
form.addEventListener("submit", e => {
    if (!nameBlank(nameInput.value)){
        e.preventDefault();
        nameInput.focus();
    } else if (!emailValid(emailInput.value)){
        e.preventDefault();
        realTimeErrors(emailInput, "focusin", emailValid);
        emailInput.focus();
    } else if (!atLeastOne()){
        e.preventDefault();
        const tooltip = document.querySelector(".activities span");
        tooltip.style.display = 'inherit';
    } else if (!creditCardDiv.hidden && !creditNumValid(ccNum.value)){
        e.preventDefault();
        ccNum.focus();
    } else if (!creditCardDiv.hidden && !zipValid(zipCode.value)){
        e.preventDefault();
        realTimeErrors(zipCode, "focusin", zipValid);
        zipCode.focus();
    } else if (!creditCardDiv.hidden && !cvvValid(cvv.value)){
        e.preventDefault();
        realTimeErrors(cvv, "focusin", cvvValid);
        cvv.focus();
    }
});

