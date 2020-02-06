const mongoose = require('mongoose')

mongoose.createConnection("mongodb://localhost/bitbank", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(response => console.log('Conected to Database..'))
.catch(error => console.log('error ->', error.message));

mongoose.Promise = global.Promise

module.exports = mongoose