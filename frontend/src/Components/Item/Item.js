import React from 'react'
import styled from "styled-components"
import { calendar, dollar, trash, money, sportsbet, gift, returns, food, takeout, clothing, shopping, misc, stocks, tv, travel, house, school } from '../../utils/icons';
import Button from '../Button/Button';
import { dateFormating } from '../../utils/dateFormat';

function Item(
    {
        id, title, amount, date, category, deleteItem, indicatorColor, type
    })
    {

    const categoryIcon = () => {
        switch(category) {
            case 'Salary':
                return money
            case 'Sports Betting':
                return sportsbet
            case 'Payment':
                return money
            case 'Gift':
                return gift
            case 'Return':
                return returns
            default:
                return ''
        }
    }

    const expenseIcon = () => {
        switch(category) {
            case 'Groceries':
                return food
            case 'Clothes':
                return clothing
            case 'Shopping':
                return shopping
            case 'Entertainment':
                return gift
            case 'Misc':
                return misc
            case 'Food':
                return takeout
            case 'Stocks':
                return stocks
            case 'Subscriptions':
                return tv
            case 'Traveling':
                return travel
            case 'Rent':
                return house
            case 'School':
                return school
            default:
                return ''
        }
    }

    return (
        <IncomeStyled indicator={indicatorColor}>
            <div className='icon'>
                {type === 'expense' ? expenseIcon() : categoryIcon()} 
            </div>
            <div className='content'>
                <h5>{title}</h5>
                <div className='inner-content'>
                    <div className='text'>
                        <p>{dollar}{amount}</p>
                        <p>{calendar}{dateFormating(date)}</p>
                    </div>
                    <div className='btn-con'>
                        {deleteItem === undefined ? <></> :
                        <Button
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color)'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}>
                        </Button>}
                    </div>
                </div>
            </div>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    background: var(--background);
    border: 2px solid var(--white);
    box-shadow: 0px 1px 15px var(--box-shadow-color);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--white);
        i {
            font-size: 2.6rem;
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5 {
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative; 
            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }
        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default Item