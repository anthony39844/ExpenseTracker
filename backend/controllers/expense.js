const ExpenseSchema = require("../models/expenseModel");


exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ExpenseSchema.findByIdAndDelete(id);
        
        if (!result) {
            return res.status(404).json({ message: "Expense not found" });
        }
        
        res.status(200).json({ message: "Expense Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

