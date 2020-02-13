const Joi = require('joi');
const User = require('../models/User');
const mongoose = require('mongoose');
const logger = require('logger');

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
        
        if(error) {
            logger.createLogger('development.log').error('Em TransactionsController.store', 'message => Dados incorretos');
            return res.status(400).send({ status: "error", message: error.details});
        }

        // Validações de usuario e numero de conta
        const _userId = await User.findById(userId);
        const _userTarget = await User.findOne({ numberAccount: numberAccount, cpf: cpf })

        if(!_userId){
            logger.createLogger('development.log').error('Em TransactionsController.store', 'message => Não foi enviado o id do usuário que efetuou a transação');
            return res.status(400).json({ status: "error", message : "Usuário não encontrado" })
        }
        
        if(!_userTarget){
            logger.createLogger('development.log').error('Em TransactionsController.store', 'message => Transação com Cpf ou Número da conta incorretos', `data => ${JSON.stringfy(req.body)}`);
            return res.status(400).json({ status: "error", message : "Revise o número da conta ou cpf" })    
        }
        
        if(_userId.balance < amountTransferred){
            logger.createLogger('development.log').warn('Em TransactionsController.store', 'message => Transação com saldo insuficiente', `saldo => ${_userId.balance}`, `quantidade transferida => ${amountTransferred}`);
            return res.status(401).json({ status: "error", message : "Saldo insuficiente para essa operação" })
        }

        // calculando novos saldos    
        const targertNewBalance = _userTarget.balance + amountTransferred;
        const selfNewBalance = _userId.balance - amountTransferred;

        // Preparando transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {

            await User.updateOne(
                { numberAccount : numberAccount }, 
                { balance: targertNewBalance },
                { session }
            )
            
            await User.updateOne(
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

            logger.createLogger('development.log').error('Em TransactionsController.store', 'message => Erro durante operações no mongoose', `error => ${error}`);
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
        
        if(month > 12 || month < 0){
            logger.createLogger('development.log').error('Em TransactionsController.get', 'message => Mês inválido', `Mês enviado => ${month}`);
            return res.status(400).send({ status: "error", message : "invalid month" })
        }

        if(!_userId){
            logger.createLogger('development.log').error('Em TransactionsController.get', 'message => Usuário não encontrado', `id => ${userId}` );
            return res.status(400).send({ status: "error", message : "User not found" })
        }

        const transactionsByMonth = _userId.transactions.filter((item) => {
            return new Date(item.transactionDate).getMonth() + 1 == month;
        })
        
        return res.send({ status: "success", data : transactionsByMonth })

    }
}