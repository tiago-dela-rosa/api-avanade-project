const express = require("express");
const router = express.Router();
const TransactionsController = require("../controllers/TransactionsController");

// Esperase que todas as rotas estejem dentro de /user 

//Rota so pode ser acessa apos a autenticacao do token
router.get("/profile", (req, res, next) => {
  //Retorno caso o token seja valido
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token
  });
});

// Transactions
router.post("/:userId/transactions", TransactionsController.store)
router.get("/:userId/transactions", TransactionsController.getTransactions)

// Seach
router.get("/:userId/search")

module.exports = router;
