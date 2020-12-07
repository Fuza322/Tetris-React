import React from 'react';
import st from "./styles/Send.module.css";
import s from "./styles/OtherElements.module.css";

export function Send() {
    return (
        <div>
            <div className={`${s.descriptionTextStyle} ${st.divContentWrapper}`}>
                <h2 className={s.mainTextStyle}>Send</h2>
            </div>
            <div className={st.divContentWrapper}>
                <table border={3} className={s.tableStyle}>
                    <thead>
                    <tr>
                        <th className={s.thStyle}>Status</th>
                        <th className={s.thStyle}>Amount (TFC)</th>
                        <th className={s.thStyle}>Privacy</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>ewew</td>
                        <td>ewew</td>
                        <td>ewew</td>
                    </tr>
                    <tr>
                        <td>ewew</td>
                        <td>ewew</td>
                        <td>ewew</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <hr/>
            <div className={st.divInputForm}>
                <div>
                    <p className={s.mainTextStyle}>Select coins you want to spend.</p>
                    <p className={s.paragraphTextStyle}>Address:</p>
                    <input className={s.inputStyle}/>
                </div>
                <div className={st.divMaxAmountAndFeeContainer}>
                    <button className={s.buttonStyle}>Max</button>
                    <div className={st.divAmountAndFeeText}>
                        Amount (TFC) : 0.0
                    </div>
                </div>
                <div className={st.divAmountAndFeeText}>
                    Fee:
                    <div>
                        <input className={`${s.inputStyle} ${st.inputFee}`}/>
                    </div>
                    <div>
                        Confirmation Expected In: 0 hours
                    </div>
                </div>
                <div className={st.divInputPassword}>
                    <p className={s.paragraphTextStyle}>Password:</p>
                    <input type='password' className={s.inputStyle}/>
                    <button className={s.buttonStyle}>Send Transaсtion</button>
                </div>
            </div>
        </div>
    )
}