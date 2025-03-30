const IncomeSchema = require("../models/incomeModel");

exports.deleteIncome = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;
  try {
    const income = await IncomeSchema.findOne({ _id: id, userId: userId });
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    await IncomeSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Income Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getIncomes = async (req, res) => {
  const userId = req.session.userId;
  try {
    const incomes = await IncomeSchema.find({ userId: userId })
      .find()
      .sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addIncome = async (req, res) => {
  const userId = req.session.userId;
  const { title, amount, category, date } = req.body;

  const income = IncomeSchema({
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
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
