const ExpenseSchema = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body;

    const expense = ExpenseSchema({
        title, 
        amount, 
        category,
        description,
        date
    })

    try {
        //validations
        if (!title || !description || !category || !date) {
            return res.status(400).json({message: "All fields are required"})
        } 
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({message: "Invalid amount"})
        }
        await expense.save()
        res.status(200).json({message: "Expense Added"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }

    console.log(expense)
}


exports.getExpenses = async (req, res) => {
    try{
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)

    } catch(error) {
        res.status(500).json({message: "Server Error"})
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ExpenseSchema.findByIdAndDelete(id);
        
        if (!result) {
            return res.status(404).json({ message: "Expense not found" });
        }
        
        res.status(200).json({ message: "Expense Deleted" });
    } catch (error) {
        console.error(error); // Optional: log the error for debugging
        res.status(500).json({ message: "Server Error" });
    }
};

