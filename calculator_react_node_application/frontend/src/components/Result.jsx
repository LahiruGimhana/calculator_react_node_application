import React from 'react';
import './Result.css';
import {useSelector } from 'react-redux';


function Result() {

    const Result = useSelector(state => { return state.calculation_data })

    return (
        <div>
            <div className="row" id='result_history'>
                <span className="label label-default">{Result.lastNum}{Result.lastOpr}</span>
            </div>
            <div className="row" id='result'>
                <span className="label label-default" id="alert"  style={{height:'50px'}}>
                    <p placeholder="Result">{Result.Result}</p>
                </span>
            </div>
        </div>
    )
}

export default React.memo(Result)
// export default Result
