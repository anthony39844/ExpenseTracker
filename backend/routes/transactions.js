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
} from "../controllers/user.js";
import { verifyToken } from "../middleware/authenticate.js";
import express from "express";

const router = express.Router();

router
  .delete("/delete-income/:id", verifyToken, deleteIncome)
  .post("/add-income", verifyToken, addIncome)
  .get("/get-incomes", verifyToken, getIncomes)
  .delete("/delete-expense/:id", verifyToken, deleteExpense)
  .post("/add-expense", verifyToken, addExpense)
  .get("/get-expenses", verifyToken, getExpenses)
  .delete("/delete-user/:id", verifyToken, deleteUser)
  .post("/create-user", createUser)
  .post("/login-user", loginUser)

export default router;
