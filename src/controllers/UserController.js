const { check, validationResult } = require('express-validator');
const User = require("../models/User");

module.exports = {

  async store(req, res) {

    const { fullname, cpf, email, password, balance, accountNumber } = req.body;

    const userExist = await User.findOne({ cpf: cpf })

    if(userExist)
      return res.status(409).json({ error: "User already exist"});

    const userRegistred = await User.create({
      fullname: fullname,
      cpf: cpf,
      email: email,
      password: password,
      balance: balance,
      accountNumber: accountNumber
    });

    return res.status(200).send({
      message: "User successfully registered",
      user: userRegistred 
    });
  }
}