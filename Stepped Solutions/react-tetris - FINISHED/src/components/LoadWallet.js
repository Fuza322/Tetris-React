import React from 'react';
import st from './styles/GenerateLoadWallet.module.css';
import s from './styles/OtherElements.module.css';

export function LoadWallet() {
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
                    <input className={s.inputStyle}/>
                </div>
                <div>
                    <p className={s.paragraphTextStyle}>Enter password:</p>
                    <input className={s.inputStyle}/>
                </div>
                <button className={s.buttonStyle}>Load</button>
            </div>
        </div>
    )
}