const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false 
    },
    email: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true 
    },
    accountNumber: {
        type: String,
        unique: true
    },
    transactions: [
        { 
            transctionId: {
                type: Schema.Types.ObjectId,
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
                required:true
            }
        }
    ]                      
}, {
    timestamps: true
});

module.exports = model('User', UserSchema)