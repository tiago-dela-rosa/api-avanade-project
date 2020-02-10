var validator = require("validator");
const { cpf } = require("cpf-cnpj-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Passport config
require("../config/passport")(passport);

module.exports = {
  register(req, res) {
    const { password, fullName, email } = req.body;

    const cpfReq = req.body.cpf;

    const balance = 0.0;
    const numberAccount = "945801-3";

    // Check para verificar se todos os campos foram preenchidos
    if (!cpfReq || !password || !fullName || !email) {
      res.status(400).send({ msg: "Por favor preencha todos os campos." });
      return false;
    }

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
          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, "top_secret");
          //Manda o token, id e email de volta na resposta
          return res.json({ token, body });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }
};
