//const UserModel = require("../models/UserSchema");

module.exports = {

  store(req, res) {

    const { cpf, email, balance, account_number } = req.body;

    const userRegistred = UserModel.Create({
      cpf,
      email,
      balance,
      account_number,
    });

    return res.send(userRegistred);
  }
}