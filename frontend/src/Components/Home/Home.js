import React, { useState } from 'react'
import styled from "styled-components"
import Button from '../Button/Button'
import { signout } from '../../utils/icons';
import { useGlobalContext } from '../../context/globalContext'

function Home({setActive}) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {logIn, createAccount, error, setError} = useGlobalContext() 

    const handleLogIn = (e) => {
        e.preventDefault()
        setError('')
        logIn(username, password)
        setActive(1)
    }

    const handleCreateAccount = (e) => {
        e.preventDefault()
        setError('')
        createAccount(username, password)
        setActive(1)
    }

    return (
    <HomeStyled>
        <h1 style={{color: '#fff', marginBottom: '15px'}}>Expense Tracker</h1>
        <div className='username'>
            <input 
                type='username'
                value={username}
                name={'username'}
                placeholder="Username"
                onChange={(e) => {
                    setUsername(e.target.value)
                }}>
            </input>
        </div>
        <div className='password'>
            <input 
                type='password'
                value={password}
                name={'password'}
                placeholder="Password"
                onChange={(e) => {
                    setPassword(e.target.value)
            }}>
            </input>
        </div>
        <div className='submit-btn'>
            <Button 
                name={'Create Account'}
                icon={signout}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                bg={'var(--btns)'}
                color={'#fff'}
                onClick={handleCreateAccount}>
            </Button>
        </div>
        <div className='submit-btn'>
            <Button 
                name={'Sign In'}
                icon={signout}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                bg={'var(--btns)'}
                color={'#fff'}
                onClick={handleLogIn}>
            </Button>
        </div>
        {error && <p className='error'>{error}</p>}
    </HomeStyled>
    )
}

const HomeStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%; 
    margin: 0 auto;
    padding: 20px; 
    input {
        width: 100%;
        height: 50px;
        font-size: 20px;
        margin: 10px 0;
        padding: 15px; 
        box-shadow: 0px 1px 15px var(--box-shadow-color);
        color: var(--primary-text9);
        font-family:  inherit;
        outline: none;
        border-radius: 5px;
        border: 2px solid #fff;
        resize: none;
        &::placeholder {
            color: var(--primary-text4);
        }
    }
    .submit-btn {
        margin: 10px 0;
    }
`;

export default Home