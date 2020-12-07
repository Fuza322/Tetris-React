import React, {useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
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

    let [histoty, setHistory] = useState([
        {sender: 'test1', amount: 'test2', recievier: 'test3', status: 'test4'},
        {sender: 'test1', amount: 'test2', recievier: 'test3', status: 'test4'},
        {sender: 'test1', amount: 'test2', recievier: 'test3', status: 'test4'},
        {sender: 'test1', amount: 'test2', recievier: 'test3', status: 'test4'},
        {sender: 'test1', amount: 'test2', recievier: 'test3', status: 'test4'}
    ])

    let [send, setSend] = useState([
        {recievier: 'test1', amount: 'test2', status: 'test3'},
        {recievier: 'test1', amount: 'test2', status: 'test3'},
        {recievier: 'test1', amount: 'test2', status: 'test3'},
        {recievier: 'test1', amount: 'test2', status: 'test3'},
        {recievier: 'test1', amount: 'test2', status: 'test3'}
    ])

    function generateButtonClick() {
        const EC = require('elliptic').ec;
        const ec = new EC('secp256k1');
        const key = ec.genKeyPair();
        console.log(key.getPublic());
        const input = new TextEncoder('utf-8').encode(key.getPublic().encode('hex'));
        crypto.subtle.digest('SHA-256', input)
            .then(function(digest) {
                let view = new DataView(digest);
                let hexstr = '';
                for(let i = 0; i < view.byteLength; i++) {
                    let b = view.getUint8(i);
                    hexstr += '0123456789abcdef'[(b & 0xf0) >> 4];
                    hexstr += '0123456789abcdef'[(b & 0x0f)];
                }
                setWalletGeneratedName(hexstr);
            })
            .catch(function(err) {
                console.error(err);
            });
        setWalletGeneratedPassword(key.getPrivate().toString('hex'));
    }

    function loadButtonClick() {
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
                    walletName={walletName}
                    balance={balanceValue}
                    authorized={authorized}
                    setAuthorized={setAuthorized}
                    logOutButtonClick={logOutButtonClick}
                />
                <Route path='/tetris' render={() =>
                    <Tetris goalValue={goalValue}
                            authorized={authorized}
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
                        walletDataPassword={walletPassword}
                        setWalletDataPassword={setWalletPassword}
                        setWalletName={setWalletName}
                        setBalanceValue ={setBalanceValue}
                        loadClickButton={loadButtonClick}
                        authorized={authorized}
                        setAuthorized={setAuthorized}
                    />}
                />
                <Route path='/send' render={() => <Send authorized={authorized}/>}/>
                <Route path='/history' render={() => <History authorized={authorized}/>}/>
            </div>
        </BrowserRouter>
    )
}

export default App;
