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
    const [authorized, setAuthorized] = useState(true)
    const [goalValue, setGoalValue] = useState(0)
    // -------------------------------------------------------------------------------------
    let [walletName, setWalletName] = useState('')
    let [walletHeaderName, setWalletHeaderName] = useState('Wallet_Header_Name')
    let [walletPassword, setWalletPassword] = useState('')
    let [balanceValue, setBalanceValue] = useState(0)

    function loadClickButton() {
        
    }

    return (
        <BrowserRouter>
            <div className="App">
                <NavBar
                    walletHeaderName={walletHeaderName}
                    balance={balanceValue}
                    authorized={authorized}
                    setAuthorized={setAuthorized}
                />
                <Route path='/tetris' render={() =>
                    <Tetris goalValue={goalValue}
                    />
                }/>
                <Route path='/generate-wallet' render={() => <GenerateWallet/>}/>
                <Route path='/load-wallet' render={() =>
                    <LoadWallet
                        walletName={walletName}
                        setWalletName={setWalletName}
                        walletPassword={walletPassword}
                        setWalletPassword={setWalletPassword}
                        loadClickButton={loadClickButton}
                    />}
                />
                <Route path='/send' render={() => <Send/>}/>
                <Route path='/history' render={() => <History/>}/>
            </div>
        </BrowserRouter>
    )
}

export default App;