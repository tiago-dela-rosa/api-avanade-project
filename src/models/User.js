const formatToPrice = require("./utils/formatToPrice");
const mongoose = require("mongoose");

let generateObjectId = function() {
  let ObjectId = mongoose.Types.ObjectId;
  return new ObjectId();
};

const UserSchema = new mongoose.Schema({
  cpf: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
    // get: formatToPrice.getPrice,
    // set: formatToPrice.setPrice
  },
  numberAccount: {
    type: String,
    unique: true
  },
  transactions: [
    {
      transctionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: generateObjectId,
        required: true
      },
      transactionDate: {
        type: Date,
        default: function() {
          return Date.now();
        },
        required: true
      },
      cpfUser: {
        type: String,
        required: true
      },
      amountTransferred: {
        type: Number,
        required: true
        // get: formatToPrice.getPrice,
        // set: formatToPrice.setPrice
      }
    }
  ]
});

const User = mongoose.model("User", UserSchema, "UserSchema");

module.exports = User;
