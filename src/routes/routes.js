const express = require('express');
//const UserController = require('./controllers/UserController');
const routes = express.Router();
var validator = require('validator');
const { cpf } = require('cpf-cnpj-validator');
const User = require("../database/models/User");


// Login
routes.get('/api/login', (req, res) => {
  res.send('chegou aqui');
});

// Cadastrar
routes.post('/api/register', (req, res) => {
   const { password, fullName, email } = req.body;

   const cpfReq = req.body.cpf;

   const balance = 0.00;
   const accountNumber = "945801-1";

   // Check para verificar se todos os campos foram preenchidos
   if(!cpfReq || !password || !fullName || !email) {
     res.status(400).send({msg : 'Por favor preencha todos os campos.'});
     return false;
   }

   //Check de CPF
   if (!cpf.isValid(cpfReq)) {
    res.status(400).send({msg : 'Por favor preencha um CPF válido.'});
   }

   // Check do email
   if (!validator.isEmail(email)) {
    res.status(400).send({msg : 'Preencha um email válido.'});
   }


  // Verificar se usuario existe no banco
  User.findOne({"cpf" : cpfReq}).
    then(user => {
      if (user) {
        res.status(400).send({msg : 'Usuário já cadastrado com esse CPF'});
        console.log('aqui');
      } else {
        console.log("novo usuario");
      }
    })
    .catch(error => console.log(error));

});



module.exports = routes;