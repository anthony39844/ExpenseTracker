import React, { useEffect } from 'react'
import styled from "styled-components"
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/form';
import IncomeItem from '../Item/Item.js';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const {addExpense, expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() => {
        getExpenses()
    }, [])

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className='total-income'>
                    Total Expenses: 
                    <span>
                        ${totalExpenses()}
                    </span>
                </h2>
                <div className='income-content'>
                    <div className='form-container'>
                        <ExpenseForm></ExpenseForm>
                    </div>
                    <div className='incomes'>
                        {expenses.map((expense) => {
                            const {_id, title, amount, date, category, description, type} = expense;
                            return <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    category={category}
                                    indicatorColor='var(--color-green)'
                                    deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--background);
        border: 2px solid var(--white);
        box-shadow: 0px 1px 15px var(--box-shadow-color);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span {
            font-size: 2.5rem;
            font-weight: 800px;
            color: var(--color-green)
        }
    }
    .income-content {
        display: flex;
        gap: 2rem;
        .incomes {
            flex: 1;
        }
    }
`;

export default Expenses