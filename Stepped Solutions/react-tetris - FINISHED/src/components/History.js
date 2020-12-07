import React from 'react';
import s from "./styles/OtherElements.module.css";
import st from "./styles/History.module.css";

export function History() {
    return (
        <div>
            <div className={`${s.descriptionTextStyle} ${st.divContentWrapper}`}>
                <h2 className={s.mainTextStyle}>History</h2>
            </div>
            <div className={st.divContentWrapper}>
                <table border={3} className={s.tableStyle}>
                    <thead>
                    <tr>
                        <th className={s.thStyle}>Sender</th>
                        <th className={s.thStyle}>Amount (TFC)</th>
                        <th className={s.thStyle}>Recievier</th>
                        <th className={s.thStyle}>Status</th>
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
        </div>
    )
}