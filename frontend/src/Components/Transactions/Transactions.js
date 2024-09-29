import React from 'react'
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/icons';
import { useGlobalContext } from '../../context/globalContext';
import { useEffect } from 'react'
import '../../styles/Transactions.css'
import IncomeItem from '../Item/Item.js';

function Transactions() {
    const {incomes, expenses, totalExpenses, totalIncome, getExpenses, getIncomes} = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <div>
            <InnerLayout>
                <div className='transaction-list'>
                    <div className='incomes'>
                        <h1>Income</h1>
                            <h2>Total Income:  {dollar}{totalIncome()}</h2>
                        <div className='all-incomes'>
                        <h2>All Transactions</h2>
                        {incomes.map((income) => {
                            const {_id, title, amount, date, category, type} = income;
                            return <IncomeItem
                            key={_id}
                            id={_id}
                            title={title}
                            amount={amount}
                            date={date}
                            type={type}
                            category={category}
                            indicatorColor='var(--color-green)'
                            deleteItem={undefined}/>
                        })}
                        </div>
                    </div>
                    <div className='expenses'>
                        <h1>Expenses</h1>  
                            <h2>Total Expenses:  {dollar}{totalExpenses()}</h2>
                        <div className='all-expenses'>
                        <h2>All Transactions</h2>
                        {expenses.map((expense) => {
                            const {_id, title, amount, date, category, type} = expense;
                            return <IncomeItem
                            key={_id}
                            id={_id}
                            title={title}
                            amount={amount}
                            date={date}
                            type={type}
                            category={category}
                            indicatorColor='var(--color-green)'
                            deleteItem={undefined}/>
                        })}
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </div>
    )
}

export default Transactions