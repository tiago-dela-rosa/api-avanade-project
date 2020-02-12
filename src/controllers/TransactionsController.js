const Joi = require('joi');
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {
    
    async store(req, res) {
        
        const { userId } = req.params;
        const { numberAccount, amountTransferred, cpf } = req.body;
        
        // Validação do body
        const validationBody = Joi.object().keys({
            numberAccount : Joi.string().length(8).required(),
            amountTransferred : Joi.number().integer().greater(0).less(1000000),
            cpf: Joi.required()
        })

        const { error } = Joi.validate(req.body, validationBody);
        
        if(error)
            return res.status(400).send({ status: "error", message: error.details});
        
        // Validações de usuario e numero de conta
        const _userId = await User.findById(userId);
        const _userTarget = await User.findOne({ numberAccount: numberAccount, cpf: cpf })

        if(!_userId)
            return res.status(400).json({ status: "error", message : "User not found" })
        
        if(!_userTarget)
            return res.status(400).json({ status: "error", message : "Please review the account number and cpf" })    

        if(_userId.balance < amountTransferred)
            return res.status(401).json({ status: "error", message : "You don't have enough balance" })
        
        // calculando novos saldos    
        const targertNewBalance = _userTarget.balance + amountTransferred;
        const selfNewBalance = _userId.balance - amountTransferred;

        // Preparando transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {

            const updateTarget = await User.updateOne(
                { numberAccount : numberAccount }, 
                { balance: targertNewBalance },
                { session }
            )
            
            const updateSelf = await User.updateOne(
                { _id: _userId._id },
                { balance: selfNewBalance },
                { session }
            )
            
            _userId.transactions.push({
                cpfUser: cpf,
                amountTransferred: -Math.abs(amountTransferred) 
            })        
            
            _userTarget.transactions.push({
                cpfUser: cpf,
                amountTransferred: amountTransferred 
            })

            _userId.save({ session });
            _userTarget.save({ session });

            await session.commitTransaction();

            return res.send({ status: "success", data: req.body });
        
        } catch (error) {

            await session.abortTransaction();
            return res.status(400).send({ status: "error", message: error.message });

        } finally {        

            session.endSession();

        }          
    },

    async getTransactions(req, res) {
    
        const { userId } = req.params;
        let { month } = req.query;
        const _userId = await User.findById(userId);
        month = month ? month : new Date().getMonth() + 1;
        
        if(month > 12 || month < 0)
            return res.status(400).send({ status: "error", message : "invalid month" })

        if(!_userId)
            return res.status(400).send({ status: "error", message : "User not found" })
        
        transactionsByMonth = _userId.transactions.filter((item) => {
            return new Date(item.transactionDate).getMonth() + 1 == month;
        })
        
        return res.send({ status: "success", data : transactionsByMonth })

    }
}