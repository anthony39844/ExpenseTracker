import axios from "axios";
import { getAuthHeader } from "./authService";

const BASE_URL = "http://localhost:4000/api/v1/";

export const addIncome = async (income, setError) => {
  try {
    await axios.post(`${BASE_URL}add-income`, income, getAuthHeader());
  } catch (err) {
    setError(err.response?.data?.message || "Failed to add income");
    throw err;
  }
};

export const getIncomes = async (setError) => {
  try {
    const response = await axios.get(`${BASE_URL}get-incomes`, getAuthHeader());
    return response.data;
  } catch (err) {
    setError(err.response?.data?.message || "Failed to get incomes");
    throw err;
  }
};

export const deleteIncome = async (id, setError) => {
  try {
    await axios.delete(`${BASE_URL}delete-income/${id}`, getAuthHeader());
  } catch (err) {
    setError(err.response?.data?.message || "Failed to delete income");
    throw err;
  }
};

export const totalIncome = (incomes) => {
  return incomes.reduce((total, income) => total + income.amount, 0);
};
