const express = require('express')
const routes = express.Router()

// Users
routes.get('/api/v1/users', (req, res) => {
  res.send({
    "user" : "Fulano de tal",
    "idade" : 40
  });
})

// Transfers
routes.get('/api/v1/transfers/:idClient', (req, res) => {
  res.send({
    "user": "Fulano de tal",
    "idade": 40
  });
})


module.exports = routes;