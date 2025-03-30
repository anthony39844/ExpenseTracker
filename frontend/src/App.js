import styled from "styled-components"
import {React, useState, useMemo} from 'react'
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
    <AppStyled className="App">
      <MainLayout>
      {!loggedIn 
        ? <Home setActive={setActive}/> 
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
  background-color: var(--primary-darker);
  position: relative;
  main{
    flex: 1;
    background: var(--background-color);
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
