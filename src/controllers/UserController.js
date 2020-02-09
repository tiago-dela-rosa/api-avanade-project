const UserSchema = require("../models/User");

module.exports = {

  store(req, res) {

    const { fullname, cpf, email, password, balance, accountNumber } = req.body;

    console.log(req.body)

    // // Se ja existir usuario com esse cpf
    //const userExist = UserSchema.findOne({ cpf: req.body.cpf })
    
    // if(userExist) {
    //   return userExist;
    // }

    const userRegistred = UserSchema.Create({
      fullname: req.body.fullname,
      cpf: req.body.cpf,
      email: req.body.email,
      password: req.body.password,
      balance: req.body.balance,
      accountNumber: req.body.accountNumber
    });

    return res.send(userRegistred);
  }
}