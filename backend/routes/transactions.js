const {addIncome, getIncomes, deleteIncome} = require('../controllers/income')
const {addExpense, getExpenses, deleteExpense} = require('../controllers/expense')
const {upload_file} = require('../controllers/uploading')

const router = require('express').Router()

router.post('/add-income', addIncome) 
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpenses)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/upload_files/:file', upload_file)

module.exports = router