import React, { useEffect } from 'react'
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/icons';
import { useGlobalContext } from '../../context/globalContext';
import { income_options } from '../Form/form';
import { expense_options } from '../Expenses/ExpenseForm';

const income_dict = {}
const expense_dict = {}

function Analytics() {
    const {expenses, incomes, getExpenses, getIncomes} = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    const sortIncomes = () => {
        income_options.forEach(option => {
            income_dict[option] = 0
        });
        for (let i = 0; i < incomes.length; i++) {
            if (incomes[i].category in income_dict) {
                income_dict[incomes[i].category] += incomes[i].amount
            }
        }
    }
    const sortExpenses = () => {
        expense_options.forEach(option => {
            expense_dict[option] = 0
        });
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].category in expense_dict) {
                expense_dict[expenses[i].category] += expenses[i].amount
            }
        }
    }

    return (
        <div>
            <InnerLayout>
            <div className='transaction-list'>
                    <div className='incomes'>
                        <h2>Income</h2>
                        {sortIncomes()}
                        {income_options.map((option) => {
                            return <p>{option}: {dollar}{income_dict[option]}</p>
                        })}
                    </div>
                    <div className='expenses'>
                        <h2>Expenses</h2>
                        {sortExpenses()}
                        {expense_options.map((option) => {
                            return <p>{option}: {dollar}{expense_dict[option]}</p>
                        })}
                    </div>
                </div>
            </InnerLayout>
        </div>
    )
}

export default Analytics