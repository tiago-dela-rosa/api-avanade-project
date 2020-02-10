const Joi = require('joi');
const User = require('../models/User');

module.exports = {
    
    async store(req, res) {
        
        const { userId } = req.params;
        const { accountNumber, amountTransferred } = req.body;
        
        // Validate body
        const validationBody = Joi.object().keys({
            accountNumber : Joi.string().alphanum().length(8).required(),
            amountTransferred : Joi.number().integer().greater(0).less(10000000)
        })

        const { error } = Joi.validate(req.body, validationBody);
        if(error) {
            return res.status(400).send({ status: "error", message: error.details});
        }

        const _userId = await User.findById(userId);
        const _accountNumber = await User.findOne({ accountNumber: accountNumber })

        if(!_userId)
            return res.status(400).json({ status: "error", message : "User not found" })
        
        if(!_accountNumber)
            return res.status(400).json({ status: "error", message : "Account number not found" })
            
        if(_userId.balance < amountTransferred)
            return res.status(401).json({ status: "error", message : "You don't have enough balance" })

        return res.json({ statys: "success", data: req.body });

    }
}