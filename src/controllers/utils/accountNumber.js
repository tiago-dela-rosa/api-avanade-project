const User = require("../../models/User");

function generateAccountNumber() {
  let generateRandomNumber = Math.floor(Math.random() * 10000000).toString();
  let insertChar =
    generateRandomNumber.substring(0, 6) +
    "-" +
    generateRandomNumber.substring(6);

  return insertChar;
}

async function checkIfNumberAccountExists() {
  try {
    let numberAccount = generateAccountNumber();

    let accountNumberExists = await User.findOne({ numberAccount });

    if (accountNumberExists) {
      let newAccountNumber = generateAccountNumber();

      checkIfNumberAccountExists(newAccountNumber);
    } else {
      return numberAccount;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  generateAccountNumber: generateAccountNumber,

  checkIfNumberAccountExists: checkIfNumberAccountExists
};
