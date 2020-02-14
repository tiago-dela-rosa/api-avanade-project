const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const dotenv = require("dotenv");
dotenv.config();

//Carregar model de usuario
const User = require("../models/User");

module.exports = {
  localPassport: function(passport) {
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
  },

  JWTPassport: function() {
    passport.use(
      new JWTstrategy(
        {
          secretOrKey: process.env.JWT_SECRET,
          //Token deve ser passado como Bearer
          jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        (payload, done) => {
          User.findOne(payload._id)
            .then(user => {
              if (user) {
                return done(null, {
                  id: user._id,
                  email: user.email
                });
              }
              return done(null, false);
            })
            .catch(error => done(error, null));
        }
      )
    );
  }
};
