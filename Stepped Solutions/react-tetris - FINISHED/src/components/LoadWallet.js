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
            props.loadClickButton()
            props.setAuthorized(true)
        } else {
            setError('Title is required')
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
