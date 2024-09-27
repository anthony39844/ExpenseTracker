import React, { useState } from 'react'
import styled from "styled-components"
import Button from '../Button/Button'
import { signout } from '../../utils/icons';
import { useGlobalContext } from '../../context/globalContext'

function Home() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {logIn, createAccount, error, setError} = useGlobalContext() 

    const handleLogIn = (e) => {
        e.preventDefault()
        setError('')
        logIn(username, password)
    }

    const handleCreateAccount = (e) => {
        e.preventDefault()
        setError('')
        createAccount(username, password)
    }

    return (
    <HomeStyled>
        <div className='input-control'>
            <input 
                type='text'
                value={username}
                name={'username'}
                placeholder="Username"
                onChange={(e) => {
                    setUsername(e.target.value)
                }}>
            </input>
        </div>
        <div className='input-control'>
            <input 
                type='text'
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
                bg={'var(--color-accent)'}
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
                bg={'var(--color-accent)'}
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
    flex-direction: column; /* Align children vertically */
    justify-content: center; /* Centers vertically */
    align-items: center; /* Centers horizontally */
    width: 100%; /* Adjust the width as needed */
    margin: 0 auto; /* Centers the div horizontally */
    padding: 20px; /* Optional for some spacing */
    input {
        width: 100%; /* Adjust the width of the input */
        height: 50px; /* Adjust the height of the input */
        font-size: 20px; /* Increase the font size */
        margin: 10px 0; /* Adds some spacing between inputs */
        padding: 15px; /* Optional for padding inside the input */
        box-shadow: 0px 1px 15px var(--box-shadow-color);
        color: var(--primary-color9);
        font-family:  inherit;
        outline: none;
        border-radius: 5px;
        border: 2px solid #fff;
        resize: none;
        &::placeholder {
            color: var(--primary-color4);
        }
    }
    .submit-btn {
        margin: 10px 0;
    }
`;

export default Home