//const UserModel = require("../models/UserSchema");

module.exports = {

  store(req, res) {

    const { cpf, email, balance, account_number } = req.body;

    // Se ja existir usuario com esse cpf
    const userExist = await UserModel.findOne({ cpf: cpf })
    if(userExist) {
      return userExist;
    }

    const userRegistred = UserModel.Create({
      cpf,
      email,
      balance,
      account_number,
    });

    return res.send(userRegistred);
  }
}