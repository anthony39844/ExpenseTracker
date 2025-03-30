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
  .delete("/delete-income/:id", authenticate, deleteIncome)
  .post("/add-income", authenticate, addIncome)
  .get("/get-incomes", authenticate, getIncomes)
  .delete("/delete-expense/:id", authenticate, deleteExpense)
  .post("/add-expense", authenticate, addExpense)
  .get("/get-expenses", authenticate, getExpenses)
  .delete("/delete-user/:id", authenticate, deleteUser)
  .post("/create-user", createUser)
  .post("/login-user", loginUser)
  .get("/current-user", authenticate, getCurrentUser)
  .get("/get-users", getUsers)

module.exports = router;
