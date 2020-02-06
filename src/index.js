const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


// Connect to DB
mongoose.connect(
  "mongodb+srv://tiago_lopes:tiago123456@cluster0-7s16h.mongodb.net/test",
  () => console.log('conectado!')
);

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('ok');
})

app.listen(3000)