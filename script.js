// Containers
const thankYouContainer = document.querySelector(".thank-you-container");
const cardDetailsForm = document.querySelector("#card-details-form");

// Field Wrappers
let cardHolderNameWrapper = document.getElementById("cardholder-name-wrapper");
let cardNumberWrapper = document.getElementById("card-number-wrapper");
let expMonthWrapper = document.getElementById("exp-month-wrapper");
let expYearWrapper = document.getElementById("exp-year-wrapper");
let cvcWrapper = document.getElementById("cvc-wrapper");
// Input fields
let cardHolderNameInput = document.getElementById("cardholder-name");
let cardNumberInput = document.getElementById("card-number");
let expMonthInput = document.getElementById("exp-month");
let expYearInput = document.getElementById("exp-year");
let cvcInput = document.getElementById("cvc");
// Error Labels
let cardHolderNameErrorLabel = document.getElementById(
  "cardholder-name-error-label"
);
let cardNumberErrorLabel = document.getElementById("card-number-error-label");
let expMonthErrorLabel = document.getElementById("exp-month-year-error-label");
let cvcErrorLabel = document.getElementById("cvc-error-label");

let cardHolderNameLabel = document.querySelector(".cardholder-name-value");
let cardExpiryMonthLabel = document.querySelector(".card-expiry-month-value");
let cardExpiryYearLabel = document.querySelector(".card-expiry-year-value");
let cardNumberLabel = document.querySelector(".card-number-value");
let cardCvcLabel = document.querySelector(".card-cvc-value");

expYearInput.setAttribute("min", new Date().getFullYear().toString().slice(2));

let fields = [
  {
    fieldName: "cardHolderName",
    field: [cardHolderNameInput],
    fieldWrapper: [cardHolderNameWrapper],
    fieldLabel: [cardHolderNameLabel],
    errorLabel: cardHolderNameErrorLabel,
    validationMessage: "Can't be blank",
    defaultLabelValues: ['CARDHOLDER NAME']
  },
  {
    fieldName: "cardNumber",
    field: [cardNumberInput],
    fieldWrapper: [cardNumberWrapper],
    fieldLabel: [cardNumberLabel],
    errorLabel: cardNumberErrorLabel,
    validationMessage: "Can't be blank",
    defaultLabelValues: ['0000 0000 0000 0000']
  },
  {
    fieldName: "cardMonthAndYear",
    field: [expMonthInput, expYearInput],
    fieldWrapper: [expMonthWrapper, expYearWrapper],
    fieldLabel: [cardExpiryMonthLabel, cardExpiryYearLabel],
    errorLabel: expMonthErrorLabel,
    validationMessage: "Can't be blank",
    defaultLabelValues: ['00', '00']
  },
  {
    fieldName: "cardCvc",
    field: [cvcInput],
    fieldWrapper: [cvcWrapper],
    fieldLabel: [cardCvcLabel],
    errorLabel: cvcErrorLabel,
    validationMessage: "Can't be blank",
    defaultLabelValues: ['000']
  },
];

cardHolderNameInput.addEventListener("input", (eve) => {
  const curVal = eve.target.value;
  const errField = fields.find((field) => field.fieldName === "cardHolderName");
  errField.validationMessage = "";
  if (curVal.length === 0) {
    errField.validationMessage = "Can't be blank";
    cardHolderNameLabel.innerText = "Cardholder Name".toUpperCase();
    return;
  }

  cardHolderNameLabel.innerText = curVal.toUpperCase();
});
cardNumberInput.addEventListener("input", (eve) => {
  const curVal = eve.target.value;
  const errField = fields.find((field) => field.fieldName === "cardNumber");
  let newVal = "";
  errField.validationMessage = "";
  if (curVal.length > 19) {
    eve.target.value = curVal.slice(0, 19);
    return;
  }

  for (let i = 0; i < curVal.length; i++) {
    if (
      (i === 4 && curVal.charAt(4) !== " ") ||
      (i === 9 && curVal.charAt(9) !== " ") ||
      (i === 14 && curVal.charAt(14) !== " ")
    ) {
      newVal += " ";
    }
    newVal += curVal[i];
  }
  eve.target.value = newVal;
  let clearCardView = true;
  if (newVal.length === 0) {
    errField.validationMessage = "Can't be blank";
  } else if (newVal.match(/[a-zA-Z]/gi)) {
    errField.validationMessage = "Wrong format, numbers only";
  } else if (newVal.length < 19) {
    clearCardView = false;
    errField.validationMessage = "Invalid card number";
  }
  cardNumberLabel.innerText =
    errField.validationMessage.length && clearCardView
      ? "0000 0000 0000 0000"
      : curVal;
});
expMonthInput.addEventListener("beforeinput", (eve) => {
  if ((eve.data && eve.target.value.length === 2) || eve.data === "-") {
    eve.preventDefault();
  }
});
expMonthInput.addEventListener("input", (eve) => {
  this.validateMonthAndYear();
});
expYearInput.addEventListener("beforeinput", (eve) => {
  if ((eve.data && eve.target.value.length === 2) || eve.data === "-") {
    eve.preventDefault();
  }
});
expYearInput.addEventListener("input", (eve) => {
  this.validateMonthAndYear();
});
cvcInput.addEventListener("beforeinput", (eve) => {
  if ((eve.data && eve.target.value.length === 3) || eve.data === "-") {
    eve.preventDefault();
  }
});
cvcInput.addEventListener("input", (eve) => {
  const curVal = eve.target.value;
  const errField = fields.find((field) => field.fieldName === "cardCvc");
  errField.validationMessage = "";

  if (curVal.length === 0) {
    errField.validationMessage = "Can't be blank";
  } else if (curVal.match(/[a-zA-Z]/gi)) {
    errField.validationMessage = "Wrong format, numbers only";
  } else if (curVal.length < 3) {
    errField.validationMessage = "Invalid CVC";
  }

  if (errField.validationMessage.length) {
    cardCvcLabel.innerText = "000";
    return;
  }
  cardCvcLabel.innerText = curVal;
});

function validateMonthAndYear() {
  const errField = fields.find(
    (field) => field.fieldName === "cardMonthAndYear"
  );
  const monthValue = expMonthInput.value;
  const yearValue = expYearInput.value;
  errField.validationMessage = "";
  const invalidMonth =
    monthValue.length === 0 || monthValue.match(/[a-zA-Z]/gi);
  const invalidYear =
    yearValue.length === 0 ||
    yearValue.match(/[a-zA-Z]/gi) ||
    yearValue < expYearInput.getAttribute("min");

  if (monthValue.length === 0 || yearValue.length === 0) {
    errField.validationMessage = "Can't be blank";
  } else if (monthValue.match(/[a-zA-Z]/gi) || yearValue.match(/[a-zA-Z]/gi)) {
    errField.validationMessage = "Wrong format, numbers only";
  } else if (monthValue > 12) {
    errField.validationMessage = `Expiry Month value should be between 1 and 12`;
  } else if (yearValue < expYearInput.getAttribute("min")) {
    errField.validationMessage = `Expiry Year value should be greater than or equal to ${expYearInput.getAttribute(
      "min"
    )}`;
  }

  cardExpiryMonthLabel.innerText = invalidMonth ? "00" : monthValue;
  cardExpiryYearLabel.innerText = invalidYear ? "00" : yearValue;
}

function confirmClicked(eve) {
  let noErrors = true;
  fields.forEach((field) => {
    if (field.validationMessage.length) {
      noErrors = false;
      field.errorLabel.innerText = field.validationMessage;
      field.fieldWrapper.forEach((wrapper) => wrapper.classList.add("invalid"));
    } else {
      field.errorLabel.innerText = "";
      field.fieldWrapper.forEach((wrapper) =>
        wrapper.classList.remove("invalid")
      );
    }
  });
  if (noErrors) {
    thankYouContainer.classList.remove("hidden");
    cardDetailsForm.classList.add("hidden");
  }
}

function continueClicked(eve) {
  fields.forEach((fieldObject) => {
    fieldObject.validationMessage = "Can't be blank";
    fieldObject.field.forEach((element) => {
      element.value = "";
    });
    fieldObject.fieldLabel.forEach((element, index) => {
      element.innerText = fieldObject.defaultLabelValues[index];
    });
  });

  thankYouContainer.classList.add("hidden");
  cardDetailsForm.classList.remove("hidden");
}
