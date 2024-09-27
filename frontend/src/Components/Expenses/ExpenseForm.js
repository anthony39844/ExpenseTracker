import {React, useState} from 'react'
import styled from "styled-components"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button'
import { plus } from '../../utils/icons'

function ExpenseForm() {
    const {addExpense, error, setError} = useGlobalContext() 
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: new Date(),
        category: ''
    })

    const {title, amount, date, category} = inputState 

    const handleInput = type => e => {
        setInputState({...inputState, [type]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addExpense(inputState)
        setInputState({
                title: '',
                amount: '',
                date: new Date(),
                category: ''
        })
    }

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className='input-control'>
                <input 
                    type='text'
                    value={title}
                    name={'title'}
                    placeholder="Expense Title"
                    onChange={handleInput('title')}>
                </input>
            </div>
            <div className='input-control'>
                <input 
                    type='text'
                    value={amount}
                    name={'amount'}
                    placeholder="Expense Amount"
                    onChange={handleInput('amount')}>
                </input>
            </div>
            <div className='input-control'>
                <DatePicker
                    id='date'
                    placeholderText='Enter a Date'
                    selected={date}
                    dateFormat={'MM/dd/yyyy'}
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}>

                </DatePicker>
            </div>
            <div className='selects input-control'>
                <select required value={category} name='category' id='category' onChange={handleInput('category')}>
                    <option value="" disabled>Select Option</option>
                    <option value="groceries">Groceries</option>
                    <option value="clothes">Clothes</option>
                    <option value="shopping">Shopping</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="food">Food</option>
                    <option value="stocks">Stocks</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="traveling">Traveling</option>
                    <option value="rent">Rent</option>
                    <option value="school">School</option>
                    <option value="misc">Misc.</option>
                </select>
            </div>
            <div className='submit-btn'>
                    <Button 
                        name={'Add Expense'}
                        icon={plus}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'var(--color-accent)'}
                        color={'#fff'}>
                    </Button>
            </div>
        </ExpenseFormStyled>
    )
}

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select {
        font-family:  inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px var(--box-shadow-color);
        color: var(--primary-color9);
        &::placeholder {
            color: var(--primary-color4);
        }
        .input-control {
            input {
                width: 100%;
            }
        }
        .selects {
            display: flex;
            justify-content: flex-end;
            select {
                color: var(--primary-color4);
                &:focus, &:active {
                    color: var(--primary-color-full);
                }
            }
        }
    }
`;

export default ExpenseForm