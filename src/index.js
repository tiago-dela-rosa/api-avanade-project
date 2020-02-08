const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()

// Import routes
const routes = require('./routes')


dotenv.config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

// Connect to DB
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