import React, {useState} from 'react';
import Tetris from './components/Tetris';
import {NavBar} from "./components/NavBar";
import {GenerateWallet} from "./components/GenerateWallet";
import {BrowserRouter, Route} from 'react-router-dom';
import {LoadWallet} from "./components/LoadWallet";
import {Send} from "./components/Send";
import {History} from "./components/History";


function App() {

    const [balanceValue, setBalanceValue] = useState(0)
    const [authorized, setAuthorized] = useState(true)

    return (
        <BrowserRouter>
            <div className="App">
                <NavBar
                    balance={balanceValue}
                    authorized={authorized}
                    setAuthorized={setAuthorized}
                />
                <Route path='/tetris' component={Tetris}/>
                <Route path='/generate-wallet' component={GenerateWallet}/>
                <Route path='/load-wallet' component={LoadWallet}/>
                <Route path='/send' component={Send}/>
                <Route path='/history' component={History}/>
            </div>
        </BrowserRouter>
    )
}

export default App;