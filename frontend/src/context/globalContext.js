import React, { useState, useContext } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:4000/api/v1/'

const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)

    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income, {withCredentials: true})
            .catch((err) => {
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`, {withCredentials: true})
        setIncomes(response.data)
    }

    const deleteIncome = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome += income.amount
        })
        return totalIncome
    }

    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expense, {withCredentials: true})
            .catch((err) => {
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`, {withCredentials: true})
        setExpenses(response.data)
    }

    const deleteExpense = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalExpenses = 0;
        expenses.forEach((income) => {
            totalExpenses += income.amount
        })
        return totalExpenses
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

    const logIn = async (user, pass) => {
        const response = await axios.post(`${BASE_URL}login-user`, {username: user, password: pass}, {withCredentials: true})
            .then(() => {
                setLoggedIn(true)
            })
            .catch((err) => {
                setError(err.response.data.message)
            })
    }

    const createAccount = async (user, pass) => {
        const response = await axios.post(`${BASE_URL}add-user`, {username: user, password: pass}, {withCredentials: true})
            .then(() => {
                setLoggedIn(true)
            })
            .catch((err) => {
                setError(err.response.data.message)
            })
    }

    const deleteUser = async (req, res) => {
        const user = await axios.get(`${BASE_URL}current-user`, {withCredentials: true})
        const id = user.data.userId
        const response = await axios.delete(`${BASE_URL}delete-user/${id}`)
            .then(() => {
                setLoggedIn(false) // maybe add a confirmation pop up 
            })
            .catch((err) => {
                setError(err.response.data.message)
            })

    }
        

    return (
        <GlobalContext.Provider value={{
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
            deleteUser
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}