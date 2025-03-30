import { deleteIncome, getIncomes, addIncome } from "../controllers/income.js";
import {
  deleteExpense,
  getExpenses,
  addExpense,
} from "../controllers/expense.js";
import {
  createUser,
  deleteUser,
  loginUser,
  getUsers,
  getCurrentUser,
} from "../controllers/user.js";
import { authenticate } from "../authenticate.js";
import express from "express";

const router = express.Router();

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
  .get("/get-users", getUsers);

export default router;
