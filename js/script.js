const dropList = document.querySelectorAll("form select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  getButton = document.querySelector("form button");
for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected =
      i == 0
        ? currency_code == "USD"
          ? "selected"
          : ""
        : currency_code == "NPR"
        ? "selected"
        : "";
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}
function loadFlag(element) {
  for (let code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_list[
        code
      ].toLowerCase()}.png`;
    }
  }
}
window.addEventListener("load", () => {
  getExchangeRate();
});
getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});
const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});
function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  const exchangeRateTxt = document.querySelector(".exchange-rate");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateTxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/80cc5e6facee9e2d2e3543af/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeRateTxt.innerText = "Something went wrong";
    });
}

const button = document.getElementById("alertButton");

// Add a click event listener to the button
button.addEventListener("click", function () {
  // Display the alert
  alert("Button clicked!");
});

const form = document.getElementById("myForm");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", function (event) {
  // Prevent the form from being submitted
  event.preventDefault();

  // Get input values
  const name = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();

  // Validate inputs
  if (!name) {
    errorMessage.textContent = "Please enter your name.";
    return;
  }

  if (!email) {
    errorMessage.textContent = "Please enter your email.";
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    // Basic email format check
    errorMessage.textContent = "Please enter a valid email address.";
    return;
  }

  // If validation passes
  errorMessage.textContent = ""; // Clear error message
  alert("Form submitted successfully!");
  form.reset(); // Optional: Reset form fields
});
