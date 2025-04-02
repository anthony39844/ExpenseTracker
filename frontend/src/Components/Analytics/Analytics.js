import React, { useEffect } from 'react'
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/icons';
import { useGlobalContext } from '../../context/globalContext';
import { income_options } from '../Incomes/IncomeForm';
import { expense_options } from '../Expenses/ExpenseForm';
import BarGraph from '../Chart/BarGraph';
import '../../styles/Analytics.css'

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
            <div className='analytics-list'>
                    <div className='incomes'>
                        <div className='income-cat'>
                            <h1>Income</h1>
                            {sortIncomes()}
                            {income_options.map((option) => {
                                return <p>{option}: {dollar}{income_dict[option]}</p>
                            })}
                        </div>
                        <div className='bar-graph'>
                            {<BarGraph labels={income_options} values={income_dict}></BarGraph>}
                        </div>
                    </div>
                    <div className='expenses'>
                        <div className='expense-cat'>
                            <h1>Expenses</h1>
                            {sortExpenses()}
                            {expense_options.map((option) => {
                                return <p>{option}: {dollar}{expense_dict[option]}</p>
                            })}
                        </div>
                        <div className='bar-graph'>
                            {<BarGraph labels={expense_options} values={expense_dict}></BarGraph>}
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </div>
    )
}

export default Analytics