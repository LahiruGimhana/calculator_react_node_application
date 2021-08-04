import React , { useEffect } from 'react';
import './History.css';
import {useDispatch, useSelector } from 'react-redux';
import HistoryData from '../historyData/historyData'
import {getHistoryElemant} from '../redux/action/calculationAction'

function History(props) {
    let dispatch=useDispatch();

    
 
    const clickHistory=()=>{
        if(props.Data!==''){
        dispatch(getHistoryElemant(props.Data, props.value));
        }
    }


    
    return (
        <div >
        <div style={{margin: '2px'}}  id='' type="button" onClick={clickHistory} value={props.Data , props.value} style={{border:'1px solid rgb(55, 56, 58)', backgroundColor:'rgb(55, 56, 58)', margin:'2px'}}>
            <div id='logic' >
                {props.Data}
            </div>
            <div id='h_Result'>
                {props.value}
            </div>
        </div>
        </div>
    )
}

export default History
