// import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import {GET_INPUT_VALUE , GET_HISTORY_VALUE, CLEAR_HISTORY,RELOAD_HISTORY} from '../action/actionTypes';
import produce from "immer";
import HistoryData from '../../historyData/historyData';
let historyData = new HistoryData();

let INITIAL_STATE={LN:[], viewResult:[],  lastOpr:'',currentNum:'' ,lastNum:'' , mode:'NUM'}
const calculationReducer = produce((draft, action) => {
    switch(action.type){
        case GET_INPUT_VALUE:
            //check mode and add numbers to LN array
            if(action.mode==="NUM"){
                //if previous mode is OPR and again click number, lastNum empty, so actually need a number in first iteration
                if(draft.mode==='OPR' && draft.lastNum==='' && draft.lastOpr==='') {  
                    draft.lastNum=parseFloat(draft.LN.join("")); //use array to float **********
                    draft.LN = [];
                    draft.mode='OPR';
                }
                else if(draft.mode==='OPR' && draft.lastNum!=='' && draft.lastOpr!==""){ //lastNum not empty, then click new numbers 
                    draft.currentNum=parseFloat(draft.LN.join(""));
                    draft.LN = [];
                    draft.mode='NUM';
                }

                    //push numbers to LN arrray
                    draft.LN.push(action.Num);
                    //string parse to float
                    draft.Result=parseFloat(draft.LN.join(""));
                    draft.mode = 'NUM';
                    return draft;

            }



            //check mode and add Operator , press operator
            if(action.mode==="OPR"){

                //click 'c' or 'x' button state convert to initialise state
                if(action.Opr==='C' || action.Opr==='x'){
                    draft = {LN:[], Result : 0, viewResult:[] ,lastOpr:'',currentNum:'' ,lastNum:'' ,mode:'NUM' }
                    return draft;
                }

                //check mode and operator add to satate
                if(draft.lastNum==='' && draft.mode==='NUM'){
                    draft.lastOpr= action.Opr;
                    console.log(draft.lastOpr);
                    draft.mode=action.mode;
                }else if(draft.mode==='OPR'){
                    draft.lastOpr= action.Opr;
                    draft.mode=action.mode;  
                }else{
                    draft.mode='NUM';
                }
                
                //check mode and after LN array zero and add value to the currentNumber
                if(draft.mode==='NUM'){
                    if(draft.LN.length!==0){
                        draft.currentNum=parseFloat(draft.LN.join("")); //use array to float **********
                        console.log(draft.currentNum);
                        draft.LN = [];
                    }

                    //calculate result
                    if(draft.lastNum!==''){
                        let Result;
                        let lastNum=parseFloat(draft.lastNum);
                        draft.lastNum=lastNum;
                        let LastOpr=action.Opr;

                        if(draft.lastOpr==='+'){
                            Result=draft.lastNum + draft.currentNum;
                        }else if(draft.lastOpr==='-'){
                            Result=draft.lastNum - draft.currentNum;
                        }else if(draft.lastOpr==='*'){
                            Result=draft.lastNum * draft.currentNum;
                        }else if(draft.lastOpr==='/'){
                            Result=draft.lastNum / draft.currentNum;
                        }else if(draft.lastOpr==='='){
                            Result=draft.Result;
                        }

                    //result add to satate
                    draft.Result=Result;
                    draft.mode='NUM';

                    //create expression
                    let Expr;
                         if(draft.currentNum!==''){
                            Expr=draft.lastNum + draft.lastOpr + draft.currentNum + '=';
                        }else{
                            Expr=draft.lastNum + '=';
                        }
                    // state.expression.push(Expr);
                    draft.currentNum='';


                    //add values to viewResult array
                    let vResult={expressionResult:Result.toString(), expression:Expr}
                    draft.viewResult.push(vResult);
                    
                    historyData.addNewHistory(vResult); // call api to add result and expression to backend 
                    draft.lastOpr = LastOpr;
                    draft.lastNum = Result;
                
                    return draft;

                }
                //Result add to state lastNum 
                draft.lastNum=draft.Result

                
                if(draft.lastOpr==='' && action.Opr!=='C'){
                    draft.lastOpr = action.Opr;
                    draft.mode = action.mode;
                    return draft;
                }
                return draft;

            }
            draft.lastNum=draft.Result;
            return draft;

        }

        //clear all the historysd
        case CLEAR_HISTORY:
            draft.viewResult = [];
            return draft;

        //get selected clicked history
        case GET_HISTORY_VALUE:
            draft.lastOpr='';
            draft.Result = action.res;
            draft.lastNum = action.res;
            draft.mode = 'OPR';
            return draft;
        
        //refresh calculator and reload hostory
        case RELOAD_HISTORY:
            if(action.historyList.length>0){
                draft.viewResult = action.historyList;
            }
            return draft;

        default:
            return draft; 
        }
                  
}, INITIAL_STATE);

export default calculationReducer














































// const calculationReducer=(state={LN:[], viewResult:[],  lastOpr:'',currentNum:'' ,lastNum:'' , mode:'NUM'}, action)=> {
//     switch(action.type){
//         case GET_INPUT_VALUE:
//             //check mode and add numbers to LN array
//             if(action.mode==="NUM"){
//                 //if previous mode is OPR and again click number, lastNum empty, so actually need a number in first iteration
//                 if(state.mode==='OPR' && state.lastNum==='') {  
//                     state.lastNum=parseFloat(state.LN.join("")); //use array to float **********
//                     state.LN.length=0;
//                     state.mode='OPR';
//                 }
//                 else if(state.mode==='OPR' && state.lastNum!==''){ //lastNum not empty, then click new numbers 
//                     state.currentNum=parseFloat(state.LN.join(""));
//                     state.LN.length=0;
//                     state.mode='NUM';
//                 }
//                 else{
//                     // state.Result=parseFloat(state.LN.join(""));
//                     // state={...state, Result: state.lastNum,  logic: action.Num, mode:'NUM'}
//                 }

//                     //push numbers to LN arrray
//                     state.LN.push(action.Num);
//                     //string parse to float
//                     state.Result=parseFloat(state.LN.join(""));
                    
//                     state={...state, mode:'NUM'}
//                     return state;

//             }



//             //check mode and add Operator , press operator
//             if(action.mode==="OPR"){
//                 // state.lastNum=state.Result;

//                 //click 'c' or 'x' button state convert to initialise state
//                 if(action.Opr==='C' || action.Opr==='x'){
//                     state={...state, LN:[], Result : 0, viewResult:[] ,lastOpr:'',currentNum:'' ,lastNum:'' ,mode:'NUM' }
//                     return state;
//                 }

//                 //check mode and operator add to satate
//                 if(state.lastNum==='' && state.mode==='NUM'){
//                     state.lastOpr= action.Opr;
//                     console.log(state.lastOpr);
//                     state.mode=action.mode;
//                 }else if(state.mode==='OPR'){
//                     state.lastOpr= action.Opr;
//                     state.mode=action.mode;  
//                 }else{
//                     state.mode='NUM';
//                 }
                
//                 //check mode and after LN array zero and add value to the currentNumber
//                 if(state.mode==='NUM'){
//                     if(state.LN.length!==0){
//                         state.currentNum=parseFloat(state.LN.join("")); //use array to float **********
//                         console.log(state.currentNum);
//                         state.LN.length=0;
//                     }else{
//                     }

//                     //calculate result
//                     if(state.lastNum!==''){
//                         let Result;
//                          let lastNum=parseFloat(state.lastNum);
//                         state.lastNum=lastNum;
//                         let LastOpr=action.Opr;

//                         if(state.lastOpr==='+'){
//                             Result=state.lastNum + state.currentNum;
//                         }else if(state.lastOpr==='-'){
//                             Result=state.lastNum - state.currentNum;
//                         }else if(state.lastOpr==='*'){
//                             Result=state.lastNum * state.currentNum;
//                         }else if(state.lastOpr==='/'){
//                             Result=state.lastNum / state.currentNum;
//                         }else if(state.lastOpr==='='){
//                             Result=state.Result;
//                         }else {
//                             // Result=state.Result;
//                         }

//                     //result add to satate
//                     state.Result=Result;
//                     state.mode='NUM';

//                     //create expression
//                     let Expr;
//                          if(state.currentNum!==''){
//                             Expr=state.lastNum + state.lastOpr + state.currentNum + '=';
//                         }else{
//                             Expr=state.lastNum + '=';
//                         }
//                     // state.expression.push(Expr);
//                     state.currentNum='';
//                     // state.result.push(Result.toString());


//                     //add values to viewResult array
//                     let vResult={expressionResult:Result.toString(), expression:Expr}
//                     state.viewResult.push(vResult);
                    
//                     historyData.addNewHistory(vResult); // call api to add result and expression to backend 
//                     state={...state, lastNum:Result,  lastOpr:LastOpr}
                
//                     return state;

//                 }
//                 //Result add to state lastNum 
//                 state.lastNum=state.Result

                
//                 if(state.lastOpr==='' && action.Opr!=='C'){
//                     state={...state,  lastOpr:action.Opr, mode: action.mode}
//                     return state;
//                 }
//                 return state;

//             }
//             state.lastNum=state.Result
//             state={...state, state}
//             return state;

//         }

//         //clear all the historysd
//         case CLEAR_HISTORY:
//             state={...state,  viewResult:[] }
//             return state

//         //get selected clicked history
//         case GET_HISTORY_VALUE:
//             state.lastOpr='';
//             state={...state, Result:action.res, lastNum:action.res, mode:'OPR'};
//             return state;
        
//         //refresh calculator and reload hostory
//         case RELOAD_HISTORY:
//             if(action.historyList.length>0){
//                 state={...state, viewResult:action.historyList};

//             }
//             return state;

//         default:
//             return state; 
//         }
                  
// }

// export default calculationReducer

