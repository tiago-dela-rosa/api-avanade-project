const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

// Bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Rotas
const routes = require('./routes/routes')
app.use('/', routes)


// Conectar ao banco
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(
  process.env.DB_CONNECT, {
   useNewUrlParser : true ,
   useUnifiedTopology: true,
  }).then(() => console.log('conectado'))
    .catch(err => {
    console.log('Erro na conexão ao banco de dados : ' + err.message);
  });
     


// Router middleware
//app.use('/api/v1/user', authRoute)

app.listen(3000)