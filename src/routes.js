const express = require('express')
const UserController = require('./controllers/UserController');
const routes = express.Router()

// Users
routes.post('/api/v1/users', UserController.store);

// Transactions
routes.get('/api/v1/transactions/', (req, res) => {
  res.send({
    "transactionDate" : "2020-12-3 9:30:22",
    "amountTransfered" : "20000"
  });
})

module.exports = routes;