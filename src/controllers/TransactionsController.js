const Joi = require('joi');
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {
    
    async store(req, res) {
        
        const { userId } = req.params;
        const { numberAccount, amountTransferred } = req.body;
        
        // Validação do body
        const validationBody = Joi.object().keys({
            numberAccount : Joi.string().length(8).required(),
            amountTransferred : Joi.number().integer().greater(0).less(10000000)
        })

        const { error } = Joi.validate(req.body, validationBody);
        
        if(error)
            return res.status(400).send({ status: "error", message: error.details});
        

        // Validações de usuario e numero de conta
        const _userId = await User.findById(userId);
        const _numberAccount = await User.findOne({ numberAccount: numberAccount })

        if(!_userId)
            return res.status(400).json({ status: "error", message : "User not found" })
        
        if(!_numberAccount)
            return res.status(400).json({ status: "error", message : "Account number not found" })    

        if(_userId.balance < amountTransferred)
            return res.status(401).json({ status: "error", message : "You don't have enough balance" })

        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            
            let update = await User.update(
                { numberAccount: _numberAccount }, 
                { $inc : { balance : amountTransferred } }
            )

        } catch (error) {
            
        }
        
        return res.json({ status: "success", data: req.body });

    }
}