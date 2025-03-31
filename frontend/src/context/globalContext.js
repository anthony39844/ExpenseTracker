import React, { useState, useContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const setLocalStorage = (response) => {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    setLoggedIn(true);
    setUsername(response.data.user.username);
    setError(null);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUsername("");
    setError(null);
  };

  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income, getAuthHeader());

      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add income");
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}get-incomes`,
        getAuthHeader()
      );
      setIncomes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get incomes");
    }
  };

  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}delete-income/${id}`, getAuthHeader());
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount;
    });
    return totalIncome;
  };

  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}add-expense`, expense, getAuthHeader());
      getExpenses();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const getExpenses = async () => {
    const response = await axios.get(
      `${BASE_URL}get-expenses`,
      getAuthHeader()
    );
    setExpenses(response.data);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${BASE_URL}delete-expense/${id}`, getAuthHeader());
    getExpenses();
  };

  const totalExpenses = () => {
    let totalExpenses = 0;
    expenses.forEach((income) => {
      totalExpenses += income.amount;
    });
    return totalExpenses;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  const logIn = async (user, pass) => {
    try {
      const response = await axios.post(
        `${BASE_URL}login-user`,
        { username: user, password: pass },
        { withCredentials: true }
      );
      setLocalStorage(response);
    } catch (err) {
      setError(err.response.data.message);
      return;
    }
  };

  const createAccount = async (user, pass) => {
    try {
      const response = await axios.post(`${BASE_URL}create-user`, {
        username: user,
        password: pass,
      });
      setLocalStorage(response);
    } catch (err) {
      setError(err.response.data.message);
      return;
    }
  };

  const deleteUser = async () => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    await axios
      .delete(`${BASE_URL}delete-user/${id}`, getAuthHeader())
      .catch((err) => {
        setError(err.response.data.message);
      });
    clearLocalStorage();
  };

  const signOut = async () => {
    clearLocalStorage();
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        expenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        logIn,
        createAccount,
        loggedIn,
        setLoggedIn,
        deleteUser,
        username,
        signOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
