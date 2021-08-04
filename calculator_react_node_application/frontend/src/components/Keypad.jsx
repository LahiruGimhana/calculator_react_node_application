import React ,{ useState} from 'react';
import './Keypad.css';
import { Card } from 'antd';
import {sendInputNu , sendInputOpr} from '../redux/action/calculationAction';
import { useDispatch } from 'react-redux';


function Keypad(props) {
    let dispatch=useDispatch();
    const gridStyle = {
        width: '25%',
        height: '9vh',
        textAlign: 'center',
        paddingTop:'1.5vh',
        paddingBottom:'1vh  ',
        borderColor: 'coral'
      };


      const InputNum=(inputValue)=>{
            dispatch(sendInputNu(inputValue));
        }
        

      const InputOpr=(operator)=>{ 
            
            dispatch(sendInputOpr(operator));
        }

    return (
        <div className="Keypad">
            <div className="row">
                <Card.Grid style={gridStyle} onClick={()=>InputOpr('C')}>C</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputOpr('x')}>x</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputOpr('%')}>%</Card.Grid>
                {/* <Card.Grid style={gridStyle} onClick={()=>InputOpr('%')}>%</Card.Grid> */}
                {/* <Key /> */}
                <Card.Grid style={gridStyle} onClick={()=>InputOpr('/')}>/</Card.Grid>
            </div>

            <div className="row">
                <Card.Grid style={gridStyle} onClick={()=>InputNum('7')}>7</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputNum('8')}>8</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputNum('9')}>9</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputOpr('*')}>*</Card.Grid>
            </div>
            <div className="row">
                <Card.Grid style={gridStyle} onClick={()=>InputNum('4')}>4</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputNum('5')}>5</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputNum('6')}>6</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputOpr('-')}>-</Card.Grid>
            </div>
            <div className="row">
                <Card.Grid style={gridStyle} onClick={()=>InputNum('1')}>1</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputNum('2')}>2</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputNum('3')}>3</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputOpr('+')}>+</Card.Grid>
            </div>
            <div className="row">
                <Card.Grid style={gridStyle} onClick={()=>InputOpr('+/-')}>+/-</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputNum('0')}>0</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputNum('.')}>.</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>InputOpr('=')}>=</Card.Grid>
                {/* <Card.Grid ></Card.Grid> */}
            </div>        
        </div>
    )
}

export default Keypad
