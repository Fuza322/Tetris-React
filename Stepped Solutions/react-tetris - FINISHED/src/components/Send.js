import React, {useState} from 'react';
import st from "./styles/Send.module.css";
import s from "./styles/OtherElements.module.css";
import Redirect from "react-router-dom/es/Redirect";
import {useInterval} from "../hooks/useInterval";

export function Send(props) {

     function httpGet()
     {
         console.log("httGet");
         let xmlHttp = new XMLHttpRequest();
         xmlHttp.open( "GET", 'http://localhost:8080/api//transaction/user?address=' + props.walletName, false ); // false for synchronous request
         xmlHttp.send( null );
         let json = JSON.parse(xmlHttp.responseText);
         let result = []
         for(let i = 0; i < json.length; i++) {
             let obj = json[i];
             if (obj.sender === props.walletName)
             result.push({amount: obj.amount, receiver: obj.receiver, status: obj.block==="0"?"Pending":"Included in block "+obj.block});
         }
         console.log(json);
         props.setSend(result);
         console.log("buff!");
         return 0;
     }

     useInterval(() => {
         httpGet();
     }, 1000);


    const [error, setError] = useState(null)
    const [addressInputValue, setAddressInputValue] = useState('')
    const [amountInputValue, setAmountInputValue] = useState('')
    const [feeInputValue, setFeeInputValue] = useState('')
    const [sendPasswordInputValue, setSendPasswordInputValue] = useState('')
    const [isPrintbalance, setIsPrintbalance] = useState(false)

    const onChangeHandlerAddress = (e) => {
        setError(null)
        setAddressInputValue(e.currentTarget.value)
        // console.log(addressInputValue)
    }

    const onChangeHandlerAmount = (e) => {
        setError(null)
        setAmountInputValue(e.currentTarget.value)
        // console.log(amountInputValue)
    }

    const onChangeHandlerFee = (e) => {
        setError(null)
        setFeeInputValue(e.currentTarget.value)
        // console.log(feeInputValue)
    }

    const onChangeHandlerSendPassword = (e) => {
        setError(null)
        setSendPasswordInputValue(e.currentTarget.value)
        // console.log(sendPasswordInputValue)
    }

    function sendButtonClick() {
        if(addressInputValue !== '' && amountInputValue !== '' && feeInputValue !== '' && sendPasswordInputValue !== '') {
            props.setAddressValue(addressInputValue)
            // console.log(props.addressValue)
            props.setAmountValue(amountInputValue)
            // console.log(props.amountValue)
            props.setFeeValue(feeInputValue)
            // console.log(props.feeValue)
            props.setSendPasswordValue(sendPasswordInputValue)
            // console.log(props.sendPasswordValue)
            setError(null)
        } else {
            setAddressInputValue('')
            setAmountInputValue('')
            setFeeInputValue('')
            setSendPasswordInputValue('')
            setError('Input\'s fields cannot be empty!')
        }
    }

    function maxButtonClick() {
        setIsPrintbalance(true)
    }

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
                    <input onChange={onChangeHandlerAddress} className={s.inputStyle}/>
                </div>
                <div className={st.divMaxAmountAndFeeContainer}>
                    <button
                        onClick={maxButtonClick}
                        className={s.buttonStyle}
                    >Max</button>
                    <div className={st.divAmountAndFeeText}>Amount (TFC):</div>
                    <input value={isPrintbalance ? props.balanceValue : amountInputValue} onChange={onChangeHandlerAmount} type="text" className={`${s.inputStyle}`}/>
                </div>
                <div className={st.divAmountAndFeeText}>
                    Fee:
                    <div>
                        <input onChange={onChangeHandlerFee} type="text" className={`${s.inputStyle} ${st.inputFee}`}/>
                    </div>
                    <div>
                        Confirmation Expected In: {props.confirmationHours} hours
                    </div>
                </div>
                <div className={st.divInputPassword}>
                    <p className={s.paragraphTextStyle}>Password:</p>
                    <input onChange={onChangeHandlerSendPassword} type='password' className={s.inputStyle}/>
                    <button onClick={sendButtonClick} className={s.buttonStyle}>Send Transaсtion</button>
                </div>
                {error}
            </div>
        </div>
    )
}