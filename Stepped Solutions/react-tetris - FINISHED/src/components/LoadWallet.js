import React from 'react';
import st from './styles/GenerateLoadWallet.module.css';
import s from './styles/OtherElements.module.css';

export function LoadWallet(props) {

    const onChangeHandlerWalletName = (e) => {
        props.setWalletName(e.currentTarget.value)
    }

    const onChangeHandlerWalletPassword = (e) => {
        props.setWalletPassword(e.currentTarget.value)
    }

    return (
        <div>
            <div className={`${s.descriptionTextStyle} ${st.divContentWrapper}`}>
                <h2 className={s.mainTextStyle}>Load Wallet</h2>
                In order to download an existing wallet and use it, enter the name and password of your wallet.
            </div>
            <hr/>
            <div className={st.divInputForm}>
                <div>
                    <p className={s.paragraphTextStyle}>Wallet name:</p>
                    <input
                        onChange={onChangeHandlerWalletName}
                        className={s.inputStyle}
                    />
                </div>
                <div>
                    <p className={s.paragraphTextStyle}>Enter password:</p>
                    <input
                        onChange={onChangeHandlerWalletPassword}
                        type='password'
                        className={s.inputStyle}
                    />
                </div>
                <button
                    onClick={props.loadClickButton}
                    className={s.buttonStyle}
                >Load</button>
            </div>
        </div>
    )
}