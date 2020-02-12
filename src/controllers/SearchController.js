const Joi = require('joi');
const User = require('../models/User');

module.exports = {
    async search(req, res) {

        const { filter } = req.query

        if(!filter)
            return res.status(400).send({ status: "error", message: "É necessario passar algum parametro para realizar o filtro, veja a documentação: http:www.google.com"})

        const search = await User.findOne({cpf: filter.cpf, numberAccount : filter.numberAccount })
        const resultSearch = {
            id: search._id,
            cpf: search.cpf,
            email: search.email,
            fullname: search.fullname,
            numberAccount: search.numberAccount     
        }
        
        res.send({ status: "success", filterResults : resultSearch })
    }
}