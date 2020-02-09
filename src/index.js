const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// Passport config
require("./config/passport")(passport);

app.use(cookieParser());

// Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "topSecret",
    resave: true,
    saveUninitialized: true
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Rotas
const routes = require("./routes/routes");
app.use("/", routes);

// Conectar ao banco
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("conectado"))
  .catch(err => {
    console.log("Erro na conexão ao banco de dados : " + err.message);
  });

app.listen(3000);
