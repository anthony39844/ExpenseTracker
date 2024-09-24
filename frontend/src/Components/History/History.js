import {React } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { useEffect } from 'react'

function History() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()


    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) => {
                const {id, title, amount, type} = item
                return (
                    <div className='history-item'>
                        <p style={{
                            color: type==='expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>
                        <p style={{
                            color: type==='expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {type === 'expense' ? `-${amount}` : `+${amount}`}
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px var(--box-shadow-color);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History