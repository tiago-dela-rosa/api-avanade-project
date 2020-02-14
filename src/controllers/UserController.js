var validator = require("validator");
const { cpf } = require("cpf-cnpj-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { checkIfNumberAccountExists } = require("./utils/accountNumber");
const { Joi } = require("joi");

const dotenv = require("dotenv");
dotenv.config();

// Passport config
require("../config/passport").localPassport(passport);

module.exports = {
  async register(req, res) {
    const { password, fullName, email } = req.body;

    const cpfReq = req.body.cpf;

    const balance = 0.0;

    let numberAccount = await checkIfNumberAccountExists();

    // Check para verificar se todos os campos foram preenchidos
    if (!cpfReq || !password || !fullName || !email) {
      res.status(400).send({ msg: "Por favor preencha todos os campos." });
      return false;
    }

    //check de senha
    // const joiValidationBody = Joi.object().keys({
    //   password: Joi.number()
    //     .integer()
    //     .min(6)
    //     .max(6)
    // });

    // const { error } = Joi.validate(req.body, joiValidationBody);

    // if (error) {
    //   res.status(400).send({ msg: "Formato de senha incorreto" });
    // }

    //Check de CPF
    if (!cpf.isValid(cpfReq)) {
      res.status(400).send({ msg: "Por favor preencha um CPF válido." });
    }

    // Check do email
    if (!validator.isEmail(email)) {
      res.status(400).send({ msg: "Preencha um email válido." });
    }

    // Verificar se usuario existe no banco
    User.findOne({ cpf: cpfReq })
      .then(user => {
        if (user) {
          res.status(400).send({ msg: "Usuário já cadastrado com esse CPF" });
        } else {
          const newUser = new User({
            cpf: cpfReq,
            password,
            email,
            fullName,
            balance,
            numberAccount
          });

          //Hash na senha
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;

              //Passar a senha do usuario para hash
              newUser.password = hash;

              //Persisitir dados do novo usuario no banco
              newUser
                .save()
                .then(user => {
                  res
                    .status(200)
                    .send({ msg: "Usuário cadastrado com sucesso." });
                })
                .catch(err => console.log(err));
            })
          );
        }
      })
      .catch(error => console.log(error));
  },

  login(req, res, next) {
    passport.authenticate("local", async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error("An Error occurred");
          return next(error);
        }
        req.login(user, { session: false }, async error => {
          if (error) return next(error);
          //salva id e email no token
          const body = {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            cpf: user.cpf,
            balance: user.balance,
            numberAccount: user.numberAccount
          };
          const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
          //Manda o token, id e email de volta na resposta
          return res.json({ token, body });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }
};
