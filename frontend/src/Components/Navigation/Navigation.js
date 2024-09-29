import React, {useEffect} from 'react'
import styled from "styled-components"
import { menuItems } from '../../utils/menuItems'
import { X, signout } from '../../utils/icons'
import Button from '../Button/Button'
import { useGlobalContext } from '../../context/globalContext'
import ProfileIcon from './ProfileIcon'

function Navigation({active, setActive}) {
    const {setLoggedIn, setError, deleteUser, username, getUsername} = useGlobalContext()

    useEffect(() => {
        getUsername()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        setLoggedIn(false)
        setError('')
    }

    const handleDeletion = e => {
        e.preventDefault()
        deleteUser()
    }
    
    return (
    <NavStyled>
        <div className='user-con'>
            <ProfileIcon></ProfileIcon>
            <div className='text'>
                <h2>{username}</h2>
            </div>
        </div>
        <ul className='menu-items'>
            {menuItems.map((item) => {
                return <li 
                    key={item.id}
                    onClick={() => {setActive(item.id); setError('')}}
                    className={active === item.id ? 'active' : ''}
                >
                    {item.icon}
                    <span>{item.title}</span>
                </li>
            })}
        </ul>
        <div className='bottom-nav'>
            <Button
                name={'Sign Out'}
                icon={signout}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                bg={'var(--color-accent)'}
                color={'#fff'}
                onClick={handleSubmit}>
                {signout}
            </Button>
            <div className='delete-btn'>
                <Button
                    name={'Delete Account'}
                    icon={X}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                    onClick={handleDeletion}>
                    {X}
                </Button>
            </div>
        </div>
    </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: var(--background-color);
    border: 3px solid var(--white);
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        
        h2 {
            color: var(--primary-color-full);
        }
        p {
            color: var(--primary-color6)
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;

        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: 0.6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: var(--primary-color6);
            padding-left: 1rem;
            position: relative;
        }

        i {
            color: var(--primary-color6);
            font-size: 1.4rem;
            transition: all .4s ease-in-out;
        }
    }

    .active {
        color: var(--primary-color-full) !important;
        i {
            color: var(--primary-color-full);
        }
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }

    .delete-btn {
        margin-top: 10px
    }
    
`;
export default Navigation