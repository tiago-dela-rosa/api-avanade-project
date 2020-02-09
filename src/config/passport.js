const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Carregar model de usuario
const User = require("../database/models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "cpf" }, (cpf, password, done) => {
      User.findOne({ cpf: cpf }).then(user => {
        if (user) {
          //Usuario encontrado o fluxo segue
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "CPF ou senha incorreta" });
            }
          });
        } else {
          return done(null, false, { message: "CPF ou senha incorreta" });
        }
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
