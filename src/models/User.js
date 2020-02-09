const formatToPrice = require('./utils/formatToPrice');
const mongoose = require('mongoose');

let generateObjectId = function () {
  let ObjectId = mongoose.Types.ObjectId
  return new ObjectId;
}

const UserSchema = new mongoose.Schema({
  cpf: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false  
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    get: formatToPrice.getPrice,
    set: formatToPrice.setPrice  
  },
  numberAccount: {
    type: String,
    unique: true,
  },
  transactions: [
    { 
      transctionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: generateObjectId,
        required: true,
      },
      transactionDate: {
        type: Date,
        required: true,
      },
      transactionNumberAccount: {
        type: String,
        required: true,
      },
      amountTransferred: {
        type: Number,
        required:true,
        get: formatToPrice.getPrice,
        set: formatToPrice.setPrice  
      }
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('UserSchema', UserSchema);