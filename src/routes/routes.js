const express = require('express');
//const UserController = require('./controllers/UserController');
const routes = express.Router();
var validator = require('validator');


// Login
routes.get('/api/login', (req, res) => {
  res.send('chegou aqui');
});

// Cadastrar
routes.post('/api/register', (req, res) => {
   const { cpf, password, fullName, email } = req.body;

   const balance = 0.00;
   const accountNumber = "945801-1";



   // Check para verificar se todos os campos foram preenchidos
   if(!cpf || !password || !fullName || !email) {
     res.status(400).send({msg : 'Por favor preencha todos os campos.'});
     return false;
   }

   // Check do email
   if (!validator.isEmail(email)) {
    res.status(400).send({msg : 'Preencha um email válido.'});
   }
   
  console.log(req.body);
  res.send('chegou aqui');
});

// Transactions
routes.get('/api/v1/transactions/', (req, res) => {
  res.send({
    "transactionDate" : "2020-12-3 9:30:22",
    "amountTransfered" : "20000"
  });
})

module.exports = routes;