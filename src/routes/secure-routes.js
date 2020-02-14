const express = require("express");
const router = express.Router();
const TransactionsController = require("../controllers/TransactionsController");
const SearchController = require("../controllers/SearchController");

// Transactions
router.post("/:userId/transactions", TransactionsController.store);
router.get("/:userId/transactions", TransactionsController.getTransactions);

// Search
router.get("/search", SearchController.search);

module.exports = router;
