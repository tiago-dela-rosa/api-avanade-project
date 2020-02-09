const express = require('express')
const UserController = require('./controllers/UserController')
const TransactionsController = require('./controllers/TransactionsController')
const routes = express.Router()

// Users
routes.post('/api/v1/users', UserController.store)

// Transactions
routes.post('/api/v1/users/:userId/transactions/', TransactionsController.store)

module.exports = routes;