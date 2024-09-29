import styled from "styled-components"
import {React, useState, useMemo, useContext} from 'react'
import bg from './img/bg.png'
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Incomes/Income";
import Expense from "./Components/Expenses/Expense";
import { useGlobalContext } from "./context/globalContext";
import Home from "./Components/Home/Home";
import Transactions from "./Components/Transactions/Transactions";
import Analytics from "./Components/Analytics/Analytics";

function App() {
  const [active, setActive] = useState(1)

  const {loggedIn} = useGlobalContext()

  const displayData = () => {
    switch(active) {
      case 1:
        return <Dashboard/>
      case 2:
        return <Transactions/>
      case 3:
        return <Income/>
      case 4:
        return <Expense/>
      case 5: 
        return <Analytics/>
      default:
        return <Dashboard/>
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb/>
  }, [])
  return (
    <AppStyled bg={bg} className="App">
      <MainLayout>
      {!loggedIn 
        ? <Home /> 
        : (
            <>
                {orbMemo}
                <Navigation active={active} setActive={setActive} />
                <main>
                    {displayData()}
                </main>
            </>
        )}
      </MainLayout>
    </AppStyled> 
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid var(--white);
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
