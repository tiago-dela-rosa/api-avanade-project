const express = require("express");

const router = express.Router();

//Rota so pode ser acessa apos a autenticacao do token
router.get("/profile", (req, res, next) => {
  //Retorno caso o token seja valido
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token
  });
});

module.exports = router;
