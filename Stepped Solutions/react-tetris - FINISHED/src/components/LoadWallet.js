import React, {useState} from 'react';
import st from './styles/GenerateLoadWallet.module.css';
import s from './styles/OtherElements.module.css';
import Redirect from "react-router-dom/es/Redirect";

export function LoadWallet(props) {

    const [inputPassword, setInputPassword] = useState('')
    const [error, setError] = useState(null)


    const onChangeHandlerWalletPassword = (e) => {
        setError(null)
        setInputPassword(e.currentTarget.value)
    }

    const load = () => {
        if(inputPassword.trim() !== '') {
            const EC = require('elliptic').ec;
            const ec = new EC('secp256k1');
            const key = ec.keyFromPrivate(inputPassword.trim(), 'hex');
            let hexstr = '';
            console.log(key.getPublic());
            const input = new TextEncoder('utf-8').encode(key.getPublic().encode('hex'));
            crypto.subtle.digest('SHA-256', input)
                .then(function(digest) {
                    let view = new DataView(digest);
                    hexstr = '';
                    for(let i = 0; i < view.byteLength; i++) {
                        let b = view.getUint8(i);
                        hexstr += '0123456789abcdef'[(b & 0xf0) >> 4];
                        hexstr += '0123456789abcdef'[(b & 0x0f)];
                    }
                    props.setWalletName(hexstr);

                    var xhr2 = new XMLHttpRequest()
                    xhr2.addEventListener('load', () => {
                        props.setBalanceValue(xhr2.responseText);
                        console.log(xhr2.responseText);
                    })
                    let request = 'http://localhost:8080/api/balance?address='+hexstr.toString();
                    xhr2.open('GET', request);
                    xhr2.send();
                })
                .catch(function(err) {
                    console.error(err);
                });
            props.loadClickButton()
            //props.setWalletName("1");
            props.setAuthorized(true)
        } else {
            setError('Passwor cannot be empty')
        }
    }


    if (props.authorized) return <Redirect to={'/tetris'}/>
    else return (
        <div>
            <div className={`${s.descriptionTextStyle} ${st.divContentWrapper}`}>
                <h2 className={s.mainTextStyle}>Load Wallet</h2>
                In order to download an existing wallet and use it, enter the name and password of your wallet.
            </div>
            <hr/>
            <div className={st.divInputForm}>
                <div>
                    <p className={s.paragraphTextStyle}>Enter password:</p>
                    <input
                        onChange={onChangeHandlerWalletPassword}
                        type='password'
                        className={s.inputStyle}
                    />
                </div>
                <button
                    onClick={load}
                    className={s.buttonStyle}>
                    Load
                </button>
                {error}
            </div>
        </div>
    )
}
