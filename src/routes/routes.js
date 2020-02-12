const express = require("express");
const UserController = require("../controllers/UserController");
const routes = express.Router();
const passport = require("passport");

// Passport config
require("../config/passport").localPassport(passport);

// Login
routes.post("/api/login", passport.authenticate("local"), UserController.login);

// Cadastrar
routes.post("/api/register", UserController.register);

module.exports = routes;
