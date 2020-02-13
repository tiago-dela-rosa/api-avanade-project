const Joi = require('joi');
const User = require('../models/User');
const logger = require('logger');

module.exports = {
  async search(req, res) {
    const { filter } = req.query;

    if (!filter)
      return res
        .status(400)
        .send({
          status: "error",
          message:
            "É necessario passar algum parametro para realizar o filtro, veja a documentação: http:www.google.com"
        });

        if(!filter) {
            logger.createLogger('development.log').warn('Em SearchController', 'message => Busca sem enviar parametros');
            return res.status(400).send({ status: "error", message: "É necessario passar algum parametro para realizar o filtro, veja a documentação: http:www.google.com"})
        }

        const search = await User.findOne({ numberAccount : filter.numberAccount })
        
        if(!search) {
            logger.createLogger('development.log').info('Em SearchController', 'message => Busca não encontrou resultados', `data => ${JSON.stringify(filter)}`);
            return res.send({ status: "success", message: "Busca não retornou resultados", data : [] })
        }
        
        const resultSearch = {
            cpf: search.cpf,
            fullName: search.fullName,
            numberAccount: search.numberAccount    
        }
        
        return res.send({ status: "success", data : resultSearch })
    }
}