var inputExpression = ""; // Variable to store the current input expression

function appendToDisplay(value) {
  var display = document.getElementById("display");
  var currentValue = display.innerHTML;

  // Avoid leading zeros before decimals or operators
  if (value === "0" && currentValue === "0") {
    return;
  }

  // Remove leading zero if current value is just "0"
  if (currentValue === "0") {
    currentValue = "";
  }

  // Update inputExpression with the new value
  inputExpression += value;

  display.innerHTML = currentValue + value;
}

function clearDisplay() {
  var display = document.getElementById("display");
  var inputDisplay = document.getElementById("input-display");
  display.innerHTML = "0";
  inputDisplay.innerHTML = ""; // Clear the input display
  inputExpression = ""; // Clear the input expression
}

function calculate() {
  var display = document.getElementById("display");
  var inputDisplay = document.getElementById("input-display");
  var expression = display.innerHTML;

  try {
    var result = eval(expression);
    display.innerHTML = result;
    inputDisplay.innerHTML = inputExpression + "="; // Show input expression with "="
    inputExpression = result.toString(); // Update inputExpression with the result
  } catch (error) {
    display.innerHTML = "Error";
    inputDisplay.innerHTML = inputExpression + "="; // Show input expression with "="
  }
}

function calculatePercentage() {
  var display = document.getElementById("display");
  var inputDisplay = document.getElementById("input-display");
  var expression = display.innerHTML;

  try {
    // Append "%" to the display and calculate the percentage
    inputExpression = expression + "%";
    var result = eval(expression) / 100;
    display.innerHTML = result;
    inputDisplay.innerHTML = inputExpression + "="; // Show input expression with "="
    inputExpression = result.toString(); // Update inputExpression with the result
  } catch (error) {
    display.innerHTML = "Error";
    inputDisplay.innerHTML = inputExpression + "="; // Show input expression with "="
  }
}

// Function to display button press on the screen
function displayButtonPress(value) {
  var inputDisplay = document.getElementById("input-display");
  inputDisplay.innerHTML = value;
}

// Handle keyboard input
document.onkeydown = function (event) {
  var key = event.key;

  // Check if the pressed key is a valid input
  if (key === "Escape") {
    event.preventDefault();
    clearDisplay();
  } else if (key === "Delete" || key === "Backspace") {
    event.preventDefault();
    backspace();
  } else if (
    isNumeric(key) ||
    key === "." ||
    key === "%" ||
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "Enter"
  ) {
    event.preventDefault();

    // Handle the "Enter" key as "="
    if (key === "Enter") {
      calculate();
    } else if (key === "%") {
      calculatePercentage();
    } else {
      appendToDisplay(key);
      displayButtonPress(key); // Update input display with the button press
    }
  }
};

// Helper function to handle backspace
function backspace() {
  var display = document.getElementById("display");
  var inputDisplay = document.getElementById("input-display");
  var currentValue = display.innerHTML;

  if (currentValue.length > 0) {
    // Remove the last character from the inputExpression as well
    inputExpression = inputExpression.slice(0, -1);
    display.innerHTML = currentValue.slice(0, -1);
    inputDisplay.innerHTML = inputExpression;
  }
}

// Helper function to check if a value is numeric
function isNumeric(value) {
  return /^\d+$/.test(value);
}
