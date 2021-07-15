function validateSIN(sinNumber) {
  let sinNumberStr = "";

  // Check if the SIN number is a number or string if neither return false.
  if (typeof sinNumber === "number") {
    sinNumberStr = sinNumber.toString();
  } else if (typeof sinNumber === "string") {
    sinNumberStr = sinNumber.split("-").join("");
  } else {
    return false;
  }

  // Check if the string contains non-numeric values.
  if (sinNumberStr && !/^\d+$/.test(sinNumberStr)) {
    return false;
  }

  // SIN length after removing the delimiters should be 9
  if (sinNumberStr.length === 9) {
    individualNumbers = sinNumberStr.split("");

    // Get digits at even indices and double them.
    evenIndexDigits = individualNumbers
      .filter((number, index) => {
        return index % 2 !== 0;
      })
      .map((digit) => {
        let doubledValue = +digit * 2;
        if (doubledValue > 9) {
          const tmpStr = doubledValue.toString();
          const digits = tmpStr.split("");
          doubledValue = parseInt(digits[0]) + parseInt(digits[1]);
        }
        return doubledValue;
      });

    // Get digits at odd indiceses
    oddIndexDigits = individualNumbers.filter((number, index) => {
      return index % 2 === 0;
    });

    // Add up all digits to get the sum.
    const sum = [...evenIndexDigits, ...oddIndexDigits].reduce(
      (sum, digit) => parseInt(sum) + parseInt(digit)
    );

    // Check if the sum is divisible by 10.
    return sum % 10 === 0;
  }

  return false;
}

console.log(
  "046-454-286 is " + (validateSIN("046-454-286") ? "valid" : "invalid")
);

console.log(
  "046-454-28 is " + (validateSIN("046-454-28") ? "valid" : "invalid")
);

console.log(
  "046-454-28a is " + (validateSIN("046-454-28a") ? "valid" : "invalid")
);

console.log(
  "123-123-123 is " + (validateSIN("123-123-123") ? "valid" : "invalid")
);
