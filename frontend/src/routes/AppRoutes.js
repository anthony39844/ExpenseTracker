import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import Income from "../Components/Incomes/Income";
import Expense from "../Components/Expenses/Expense";
import Analytics from "../Components/Analytics/Analytics";
import Transactions from "../Components/Transactions/Transactions";
import Home from "../Components/Home/Home";
import { useGlobalContext } from "../context/globalContext";

const AppRoutes = () => {
  const { loggedIn } = useGlobalContext();

  if (!loggedIn) {
    return <Home />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/income" element={<Income />} />
      <Route path="/expense" element={<Expense />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
};

export default AppRoutes;
