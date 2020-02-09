const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../database/models/User");

//Verificar se o token do usuario é valido
passport.use(
  new JWTstrategy(
    {
      secretOrKey: "top_secret",
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
