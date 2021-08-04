import React , { useEffect } from 'react';
import History from './History';
import {useDispatch, useSelector } from 'react-redux';
import HistoryData from '../historyData/historyData'
import {clearHistory, reloadHistory} from '../redux/action/calculationAction'

let historyData = new HistoryData();

function HistoryList(props) {
    let dispatch=useDispatch();
    const Result = useSelector(draft => { return draft.calculation_data });


    const deleteButton=()=>{
        dispatch(clearHistory());
        historyData.removeHistory();
    }

    async function myfnc(){
        let historyArr=await historyData.getHistory();
        dispatch(reloadHistory(historyArr));
    }

    useEffect(() => { 
        myfnc()
        
    },[])


    const expression=()=>{

            if(Result.viewResult.length>0 && Result.viewResult!==''){ 
            let val= Result.viewResult.map(data=>{
                if(data.expression !=='' && data.expressionResult!==''){
                    return(
                        < History Data={data.expression} value={data.expressionResult}/>
                   ); 
                }   
             })
            
             return val;
            }
        }
      
       

    return (
        <div className="row" style={{backgroundColor:'rgb(61, 66, 71)', height:'60vh', paddingTop:'20px'}}>
                <ul className="list-group">
                    <div style={{height:'53vh'}}> 
                        {expression()}
                    </div>
                </ul>
            <div>
                <div className='delete' id='delete' type="button" style={{textAlign:'right'}} onClick={deleteButton}>delete</div>
            </div>
        </div>
    );
    
}

export default React.memo(HistoryList)
