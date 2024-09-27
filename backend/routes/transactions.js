const {deleteIncome} = require('../controllers/income')
const {deleteExpense} = require('../controllers/expense')
const {addUser, deleteUser, loginUser, getUsers} = require('../controllers/user')
const {authenticate} = require('../authenticate')
const IncomeSchema = require("../models/incomeModel");
const ExpenseSchema = require("../models/expenseModel");
const UserSchema = require("../models/userModel");

const router = require('express').Router()

router.post('/add-income', authenticate, async (req, res) => {
    const userId = req.session.userId
    const {title, amount, category, description, date} = req.body;

    const income = IncomeSchema({
        userId,
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
        if (amount <= 0 || typeof amount === 'number') {
            return res.status(400).json({message: "Invalid amount"})
        }
        await income.save()
        res.status(200).json({message: "Income Added"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
})

router.get('/get-incomes', authenticate, async (req, res) => {
    const userId = req.session.userId
    try{
        const incomes = await IncomeSchema.find({ userId: userId }).find().sort({createdAt: -1})
        res.status(200).json(incomes)

    } catch(error) {
        res.status(500).json({message: "Server Error"})
    }
})

router.post('/add-expense', authenticate, async (req, res) => {
    const userId = req.session.userId
    const {title, amount, category, description, date} = req.body;

    const expense = ExpenseSchema({
        userId,
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
        if (amount <= 0 || typeof amount === 'number') {
            return res.status(400).json({message: "Invalid amount"})
        }
        await expense.save()
        res.status(200).json({message: "Expense Added"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
})

router.get('/get-expenses', authenticate, async (req, res) => {
    const userId = req.session.userId
    try{
        const expenses = await ExpenseSchema.find({ userId: userId }).find().sort({createdAt: -1})
        res.status(200).json(expenses)

    } catch(error) {
        res.status(500).json({message: "Server Error"})
    }
})

router.get('/current-user', authenticate, async (req, res) => {
    try{
        const user = await UserSchema.findOne( {userId: req.session.userId})
        res.status(200).json(user)
    } catch(error) {
        res.status(500).json({message: "Server Error"})
    }
})

router.delete('/delete-income/:id', deleteIncome)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/add-user', addUser)
    .get('/get-users', getUsers)
    .delete('/delete-user/:id', deleteUser)
    .post('/login-user', loginUser)

module.exports = router