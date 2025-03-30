import ExpenseSchema from "../models/expenseModel.js"

export const deleteExpense = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;
  try {
    const expense = await ExpenseSchema.findOne({ _id: id, userId: userId });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    const result = await ExpenseSchema.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getExpenses = async (req, res) => {
  const userId = req.session.userId;
  try {
    const expenses = await ExpenseSchema.find({ userId: userId })
      .find()
      .sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const addExpense = async (req, res) => {
  const userId = req.session.userId;
  const { title, amount, category, date } = req.body;

  const expense = ExpenseSchema({
    userId,
    title,
    amount,
    category,
    date,
  });

  try {
    //validations
    if (!title || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(Number(amount)) || amount.trim() === "" || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
