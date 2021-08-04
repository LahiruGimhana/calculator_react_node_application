import {GET_INPUT_VALUE, GET_HISTORY_VALUE, CLEAR_HISTORY ,RELOAD_HISTORY } from './actionTypes';

export const sendInputNu=(Num)=>{
    return {type: GET_INPUT_VALUE, mode:'NUM',  Num}
}

export const sendInputOpr=(Opr)=>{
    return {type: GET_INPUT_VALUE, mode:'OPR', Opr}
}

export const getHistoryElemant=(exp, res)=>{
    return {type:GET_HISTORY_VALUE, exp, res}
}

export const clearHistory =()=>{
    return {type:CLEAR_HISTORY}
}

export const reloadHistory=(historyList)=>{
    return {type:RELOAD_HISTORY, historyList}
}