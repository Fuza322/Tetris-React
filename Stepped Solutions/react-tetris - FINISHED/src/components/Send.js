import React from 'react';
import st from "./styles/Send.module.css";
import s from "./styles/OtherElements.module.css";
import Redirect from "react-router-dom/es/Redirect";
import {useInterval} from "../hooks/useInterval";

export function Send(props) {

    function httpGet()
    {
        console.log("httGet");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", 'http://localhost:8080/api//transaction/user?address=' + props.walletName, false ); // false for synchronous request
        xmlHttp.send( null );
        let json = JSON.parse(xmlHttp.responseText);
        let result = []
        for(var i = 0; i < json.length; i++) {
            var obj = json[i];
            if (obj.sender == props.walletName)
            result.push({amount: obj.amount, receiver: obj.receiver, status: obj.block=="0"?"Pending":"Included in block "+obj.block});
        }
        console.log(json);
        props.setSend(result);
        console.log("buff!");
        return 0;
    }

    useInterval(() => {
        httpGet();
    }, 1000);

    function makeColumns(row) {
        return(<> <td>{row.receiver}</td> <td>{row.amount}</td> <td>{row.status}</td> </>)
    }

    let tableTemplate = props.send.map((row, i) => {
        return <tr key={i}>{makeColumns(row)}</tr>
    })

    if (!props.authorized) return <Redirect to={'/generate-wallet'}/>
    else
    return (
        <div>
            <div className={`${s.descriptionTextStyle} ${st.divContentWrapper}`}>
                <h2 className={s.mainTextStyle}>Send</h2>
            </div>
            <div className={st.divContentWrapper}>
                <table border={3} className={s.tableStyle}>
                    <thead>
                    <tr>
                        <th className={s.thStyle}>Recievier</th>
                        <th className={s.thStyle}>Amount (TFC)</th>
                        <th className={s.thStyle}>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableTemplate}
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