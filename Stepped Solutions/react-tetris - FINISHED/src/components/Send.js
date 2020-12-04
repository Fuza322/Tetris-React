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
                        <th className={s.thStyle}>Amount (BTC)</th>
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
            <div className={st.divInputForm}>
                <div>
                    <p className={s.paragraphTextStyle}>Select coins you want to spend:</p>
                    <input className={s.inputStyle}/>
                </div>
            </div>
        </div>
    )
}