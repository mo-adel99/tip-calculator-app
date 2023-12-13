function getElement(element) {
  return document.querySelector(element)
}

const billAmount = getElement("#billAmount");
const allButtons = document.querySelectorAll(".fixed-value")
const btn5 = getElement("#btn5");
const btn10 = getElement("#btn10");
const btn15 = getElement("#btn15");
const btn25 = getElement("#btn25");
const btn50 = getElement("#btn50");
const customTip = getElement("#customTip");
const peopleCount = getElement("#peopleCount");
const errorMessage = getElement(".err-msg");
const tipOutput = getElement("#tipAmount");
const totalOutput = getElement("#totalAmount");
const resetBtn = getElement("#reset");

let tip = 0;

function resetAll() {
  tip = 0;
  billAmount.value = '';
  peopleCount.value = '';
  customTip.value = '';
  tipOutput.innerText = '0.00';
  totalOutput.innerText= '0.00';
  resetBtn.classList.add("disabled");
  hideError();
  allButtons.forEach((button) => {
    button.classList.remove("button-active");
  })
}

function showError() {
  if (billAmount.value > 0) {
    errorMessage.style.display = "block";
    peopleCount.classList.add("error");
  }
}

function hideError() {
  errorMessage.style.display = "none";
  peopleCount.classList.remove("error");
}

function showOutput(tipValue) {
  let billValue = billAmount.value;
  let peopleNumber = peopleCount.value;

  let tipPercent = tipValue / 100;
  let tipAmountTotal = tipPercent * billValue;
  let tipPerPerson = tipAmountTotal / peopleNumber;
  let billPerPerson = billValue / peopleNumber;
  let totalPerPerson = tipPerPerson + billPerPerson;

  tipOutput.innerText = tipPerPerson.toFixed(2);
  totalOutput.innerText = totalPerPerson.toFixed(2);
}

function validatePeopleNum(tipValue) {
  if (peopleCount.value <= 0 || peopleCount.value == '') {
    showError();
  } else {
    hideError();
    showOutput(tipValue);
  }
}

resetBtn.addEventListener("click", resetAll);

billAmount.addEventListener("keyup", function() {
  if (billAmount.value > 0) {
    resetBtn.classList.remove("disabled");
  }
})

function buttonActive(btnName) {
  customTip.value = '';
  allButtons.forEach((button) => {
    button.classList.remove("button-active");
  })
  btnName.classList.add("button-active");
}

btn5.addEventListener("click", function() {
  tip = 5;
  validatePeopleNum(5);
  buttonActive(btn5);
})
btn10.addEventListener("click", function() {
  tip = 10;
  validatePeopleNum(10);
  buttonActive(btn10);
})
btn15.addEventListener("click", function() {
  tip = 15;
  validatePeopleNum(15);
  buttonActive(btn15);
})
btn25.addEventListener("click", function() {
  tip = 25;
  validatePeopleNum(25);
  buttonActive(btn25);
})
btn50.addEventListener("click", function() {
  tip = 50;
  validatePeopleNum(50);
  buttonActive(btn50);
})

customTip.addEventListener("keyup", function() {
  allButtons.forEach((button) => {
    button.classList.remove("button-active");
  })
  validatePeopleNum(customTip.value);
})

peopleCount.addEventListener("keyup", function(){
  if (customTip.value > 0) {
    validatePeopleNum(customTip.value);
  } else {
    validatePeopleNum(tip);
  }
})