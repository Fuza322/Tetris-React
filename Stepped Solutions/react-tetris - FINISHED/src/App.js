import React, {useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import v1 from "uuid";
import Tetris from './components/Tetris';
import {NavBar} from "./components/NavBar";
import {GenerateWallet} from "./components/GenerateWallet";
import {LoadWallet} from "./components/LoadWallet";
import {Send} from "./components/Send";
import {History} from "./components/History";


function App() {
    // authorized - переменная, вошли ли в кошелёк? (boolean), setAuthorized - функция для установки нового значения
    const [authorized, setAuthorized] = useState(true)
    // goalValue - переменная значения гола, setGoal - функция для установки нового значения
    const [goalValue, setGoalValue] = useState(0)
    // -------------------------------------------------------------------------------------
    // walletName - переменная, хранящая имя текущего кошелька, setWalletName - функция для установки нового значения
    let [walletName, setWalletName] = useState('Wallet_Name')
    // balanceValue - переменная текущего баланса, setBalanceValue - функция для установки нового значения
    let [balanceValue, setBalanceValue] = useState(0)

    return (
        <BrowserRouter>
            <div className="App">
                <NavBar
                    walletName={walletName}
                    balance={balanceValue}
                    authorized={authorized}
                    setAuthorized={setAuthorized}
                />
                <Route path='/tetris' render={() =>
                    <Tetris goalValue={goalValue}
                    />
                }/>
                <Route path='/generate-wallet' render={() => <GenerateWallet/>}/>
                <Route path='/load-wallet' render={() => <LoadWallet/>}/>
                <Route path='/send' render={() => <Send/>}/>
                <Route path='/history' render={() => <History/>}/>
            </div>
        </BrowserRouter>
    )
}

export default App;