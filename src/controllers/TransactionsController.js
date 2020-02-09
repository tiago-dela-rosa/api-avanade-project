const User = require('../models/User');
const Joi = require('@hapi/joi');

module.exports = {
    async store(req, res) {
        
        const { userId } = req.params;
        const { accountNumber, amountTransferred } = req.body;
    
        const _userId = await User.findById(userId);
        const _accountNumber = await User.findOne({ accountNumber: accountNumber })

        if(!_userId)
            return res.status(400).json({ error : "User not found" })
        
        if(!_accountNumber)
            return res.status(400).json({ error : "Number account not found" })
            
        if(_userId.balance < amountTransferred)
            return res.status(401).json({ error : "You don't have enough balance" })

        return res.json({ teste: _userId });

    }
}