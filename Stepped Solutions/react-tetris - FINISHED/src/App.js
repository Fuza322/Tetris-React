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
    const [authorized, setAuthorized] = useState(false)
    const [goalValue, setGoalValue] = useState(0)
    // -------------------------------------------------------------------------------------
    let [walletName, setWalletName] = useState('')
    let [walletGeneratedName, setWalletGeneratedName] = useState('')
    let [walletPassword, setWalletPassword] = useState('')
    let [walletGeneratedPassword, setWalletGeneratedPassword] = useState('')
    let [balanceValue, setBalanceValue] = useState(0)

    function generateButtonClick() {
        setWalletGeneratedName('new_wallet_name')
        setWalletGeneratedPassword('pasha molodetz')
    }

    function loadClickButtonClick() {
        setWalletName(walletName)
        setAuthorized(true)
    }

    function logOutButtonClick() {
        setWalletName('')
        setAuthorized(false)
    }

    return (
        <BrowserRouter>
            <div className="App">
                <NavBar
                    walletName={setWalletName}
                    balance={balanceValue}
                    authorized={authorized}
                    setAuthorized={setAuthorized}
                    logOutButtonClick={logOutButtonClick}
                />
                <Route path='/tetris' render={() =>
                    <Tetris goalValue={goalValue}
                    />
                }/>
                <Route path='/generate-wallet' render={() =>
                    <GenerateWallet
                        walletGeneratedName={walletGeneratedName}
                        walletGeneratedPassword={walletGeneratedPassword}
                        generateButtonClick={generateButtonClick}
                    />
                }/>
                <Route path='/load-wallet' render={() =>
                    <LoadWallet
                        walletPassword={walletPassword}
                        setWalletPassword={setWalletPassword}
                        loadClickButton={loadClickButtonClick}
                    />}
                />
                <Route path='/send' render={() => <Send/>}/>
                <Route path='/history' render={() => <History/>}/>
            </div>
        </BrowserRouter>
    )
}

export default App;