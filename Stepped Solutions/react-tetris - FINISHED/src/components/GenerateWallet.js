import React from 'react';
import st from './styles/GenerateLoadWallet.module.css';
import s from './styles/OtherElements.module.css';

export function GenerateWallet(props) {
    return (
        <div>
            <div className={`${s.descriptionTextStyle} ${st.divContentWrapper}`}>
                <h2 className={s.mainTextStyle}>Generate new wallet</h2>
                Heads up! <br/>
                You cannot recover your wallet password. So we strongly advise you to write your password to place
                that you will not forget!<br/>
                Also, don't tell your wallet password to anyone!
            </div>
            <hr/>
            <div className={st.divInputForm}>
                <div>
                    <p className={s.paragraphTextStyle}>Wallet public adress: {props.walletGeneratedName}</p>
                </div>
                <div>
                    <p className={s.paragraphTextStyle}>Wallet password: {props.walletGeneratedPassword}</p>
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