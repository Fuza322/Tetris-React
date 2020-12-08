import React from 'react';
import s from "./styles/OtherElements.module.css";
import st from "./styles/History.module.css";
import Redirect from "react-router-dom/es/Redirect";
import {useInterval} from "../hooks/useInterval";

export function History(props) {

    function makeColumns(row) {
        return(<><td>{row.sender}</td><td>{row.amount}</td><td>{row.receiver}</td><td>{row.status}</td></>)
    }

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
            result.push({sender: obj.sender, amount: obj.amount, receiver: obj.receiver, status: obj.block=="0"?"Pending":"Included in block "+obj.block});
            console.log(obj.amount);
        }
        console.log(json);
        props.setHistory(result);
        console.log("buff!");
        return 0;
    }

    useInterval(() => {
        httpGet();
    }, 1000);

    let tableTemplate = props.history.map((row, i) => {
        return <tr key={i}>{makeColumns(row)}</tr>
    })

    if (!props.authorized) return <Redirect to={'/generate-wallet'}/>
    else{
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
                        <th className={s.thStyle}>Receiver</th>
                        <th className={s.thStyle}>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {tableTemplate}
                    </tbody>
                </table>
            </div>
        </div>
    )}
}