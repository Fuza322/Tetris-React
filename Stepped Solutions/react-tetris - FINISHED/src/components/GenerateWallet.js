import React from 'react';
import st from './styles/GenerateLoadWallet.module.css';
import s from './styles/OtherElements.module.css';

export function GenerateWallet(props) {
    return (
        <div>
            <div className={`${s.descriptionTextStyle} ${st.divContentWrapper}`}>
                <h2 className={s.mainTextStyle}>Generate Wallet</h2>
                Heads up!
                You cannot recover your wallet without your password. Therefore we strongly advise you to use a password
                that you will not forget
            </div>
            <hr/>
            <div className={st.divInputForm}>
                <div>
                    <p className={s.paragraphTextStyle}>Wallet name: {props.walletGeneratedName}</p>
                </div>
                <div>
                    <p className={s.paragraphTextStyle}>Choose password: {props.walletGeneratedPassword}</p>
                </div>
                <button
                    onClick={props.generateButtonClick}
                    className={s.buttonStyle}>
                    Generate
                </button>
            </div>
        </div>
    )
}