import React, { useState } from 'react'
import styled from "styled-components"
import avatar from '../../img/avatar.png'
import { menuItems } from '../../utils/menuItems'
import { signout } from '../../utils/icons'

function Navigation({active, setActive}) {
    return (
    <NavStyled>
        <div className='user-con'>
            <img src={avatar} alt=''></img>
            <div className='text'>
                <h2>Mike</h2>
                <p>iourhf </p>
            </div>
        </div>
        <ul className='menu-items'>
            {menuItems.map((item) => {
                return <li 
                    key={item.id}
                    onClick={() => {setActive(item.id)}}
                    className={active === item.id ? 'active' : ''}
                >
                    {item.icon}
                    <span>{item.title}</span>
                </li>
            })}
        </ul>
        <div className='bottom-nav'>
            <li>
                {signout} Sign Out
            </li>
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

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: var(--background);
            box-shadow: 0px 1px 17px var(--box-shadow-color);
        }
        
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
    
`;
export default Navigation