import axios from "axios";
import { getAuthHeader } from "./authService";

const BASE_URL = "http://localhost:4000/api/v1/";

export const addExpense = async (expense, setError) => {
  try {
    await axios.post(`${BASE_URL}add-expense`, expense, getAuthHeader());
  } catch (err) {
    setError(err.response?.data?.message || "Failed to add expense");
    throw err;
  }
};

export const getExpenses = async (setError) => {
  try {
    const response = await axios.get(
      `${BASE_URL}get-expenses`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    setError(err.response?.data?.message || "Failed to get expenses");
    throw err;
  }
};

export const deleteExpense = async (id, setError) => {
  try {
    await axios.delete(`${BASE_URL}delete-expense/${id}`, getAuthHeader());
  } catch (err) {
    setError(err.response?.data?.message || "Failed to delete expense");
    throw err;
  }
};

export const totalExpenses = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};
