export const totalBalance = (incomes, expenses) => {
  const totalIncome = incomes.reduce(
    (total, income) => total + income.amount,
    0
  );
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  return totalIncome - totalExpenses;
};

export const transactionHistory = (incomes, expenses) => {
  const history = [...incomes, ...expenses];
  history.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return history.slice(0, 3);
};
