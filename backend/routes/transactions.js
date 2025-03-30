const {
  deleteIncome,
  getIncomes,
  addIncome,
} = require("../controllers/income");
const {
  deleteExpense,
  getExpenses,
  addExpense,
} = require("../controllers/expense");
const {
  createUser,
  deleteUser,
  loginUser,
  getUsers,
  getCurrentUser,
} = require("../controllers/user");
const { authenticate } = require("../authenticate");
const router = require("express").Router();

router
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .delete("/delete-expense/:id", deleteExpense)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpenses)
  .delete("/delete-user/:id", deleteUser)
  .post("/create-user", createUser)
  .post("/login-user", loginUser)
  .get("/current-user", authenticate, getCurrentUser)
  .get("/get-users", getUsers)

module.exports = router;
