import React, { useState, useContext } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:4000/api/v1/'

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    const addIncome = async (income) => {
        console.log("add I")
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
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

    const addExpense = async (income) => {
        console.log("add E")
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
    }

    const deleteExpense = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }
    const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await fetch('http://localhost:8080/api/v1/upload_file', {
          method: 'POST',
          body: formData,
        })
        const jsonData = await response.json();


        for (const transaction of jsonData) {
            transaction.amount *= -1
            console.log(transaction.title)
            if (transaction.amount > 0) {

                await addIncome(transaction);
            } else {
                transaction.amount *= -1
                await addExpense(transaction)
            }
        }
        
      } catch (error) {
      }
        // try{
        //     const response = await axios.post(`${BASE_URL}upload_files/${file}`)

        // } catch (err) {
        //     console.log(err)
        // }
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
            uploadFile
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}