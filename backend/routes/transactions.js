const {addIncome, getIncomes, deleteIncome} = require('../controllers/income')
const {addExpense, getExpenses, deleteExpense} = require('../controllers/expense')
const {addUser, getUsers, deleteUser, loginUser} = require('../controllers/user')

const router = require('express').Router()

const authenticate = (req, res, next) => {
    if (req.session.userId) {
        next(); // User is authenticated, proceed to the next middleware
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

router.post('/add-income', addIncome) 
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpenses)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/add-user', addUser)
    .get('/get-users', getUsers)
    .delete('/delete-user/:id', deleteUser)
    .post('/login-user', loginUser)

module.exports = router