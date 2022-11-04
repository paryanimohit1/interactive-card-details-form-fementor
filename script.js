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
let expMonthErrorLabel = document.getElementById("exp-month-error-label");
let cvcErrorLabel = document.getElementById("cvc-error-label");

let fields = [
  {
    field: [cardHolderNameInput],
    fieldWrapper: [cardHolderNameWrapper],
    errorLabel: cardHolderNameErrorLabel,
    validationMessage: "",
  },
  {
    field: [cardNumberInput],
    fieldWrapper: [cardNumberWrapper],
    errorLabel: cardNumberErrorLabel,
    validationMessage: "",
  },
  {
    field: [expMonthInput, expYearInput],
    fieldWrapper: [expMonthWrapper, expYearWrapper],
    errorLabel: expMonthErrorLabel,
    validationMessage: "",
  },
  {
    field: [cvcInput],
    fieldWrapper: cvcWrapper,
    errorLabel: cvcErrorLabel,
    validationMessage: "",
  },
];

cardHolderNameInput.addEventListener("change", (eve) => {
  console.log(eve);
});
cardNumberInput.addEventListener("input", (eve) => {
  console.log(eve);
  const curVal = eve.target.value;
  let newVal = "";

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
});
expMonthInput.addEventListener("input", (eve) => {
  console.log(eve);
  const curVal = eve.target.value;
  // let sliceEnd = eve.data === "-" ? curVal.length - 1 : 2;
  // eve.target.value = curVal.slice(0, sliceEnd);
});
expYearInput.addEventListener("input", (eve) => {
  console.log(eve);
  const curVal = eve.target.value;
  let sliceEnd = eve.data === "-" ? curVal.length - 1 : 2;
  eve.target.value = curVal.slice(0, sliceEnd);
});
cvcInput.addEventListener("input", (eve) => {
  console.log(eve);
  const curVal = eve.target.value;
  let sliceEnd = eve.data === "-" ? curVal.length - 1 : 3;
  eve.target.value = curVal.slice(0, sliceEnd);
});

function confirmClicked(eve) {
  console.log(eve);
}
