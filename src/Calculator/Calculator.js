import React, { useState } from 'react';
import Display from '../Display/Display';
import classes from './Calculator.module.css';

const Calculator = () => {
  const [calcState, setCalcState] = useState({
    prevOperand: 0,
    nextOperand: '',
    operation: undefined
  });
  
  const calculateValues = operation => {
    let outputResult;
    switch(operation) {
      case '+':
        outputResult = parseFloat(calcState.prevOperand) + parseFloat(calcState.nextOperand);
        break;
      case '-':
        outputResult = parseFloat(calcState.prevOperand) - parseFloat(calcState.nextOperand);
        break; 
      case '*':
        outputResult = parseFloat(calcState.prevOperand) * parseFloat(calcState.nextOperand);
        break;
      case '/':
        outputResult = parseFloat(calcState.prevOperand) / parseFloat(calcState.nextOperand);
        break;
    }
    if(Number.isInteger(outputResult)) return outputResult;
    const [int, decimal] = String(outputResult).split('.');
    const shortDecimal = decimal.substr(0, 6);
    return parseFloat(`${int}.${shortDecimal}`);
 }
  
  const operationClickHandler = event => {
    if(event.target.innerText === '-' && calcState.nextOperand === '') {
      if(calcState.operation === undefined) {
        setCalcState(prevState => ({
          ...prevState,
          operation: event.target.innerText
        }))
        return
      }
      if(calcState.nextOperand.split('').includes('-')) return;
      setCalcState(prevState => ({
        ...prevState,
        nextOperand: prevState.nextOperand += event.target.innerText
      }))
      return
    }
    if(calcState.nextOperand === '-') return;
    
    if(calcState.nextOperand === '') {
      setCalcState((prevState) => ({ ...prevState, operation: event.target.innerText }));
    } else if(calcState.nextOperand !== '' && calcState.operation === undefined) {
      setCalcState((prevState) => ({
        prevOperand: prevState.nextOperand,
        operation: event.target.innerText,
        nextOperand: ''
      }))
    } else if(calcState.nextOperand && calcState.operation) {
      setCalcState(({      
        prevOperand: calculateValues(calcState.operation),
        operation: event.target.innerText,
        nextOperand: ''
      }));
    }
  }
  
  const equalClickHandler = () => {
    if(calcState.operation === undefined || calcState.nextOperand === '') return;
    setCalcState({
      prevOperand: calculateValues(calcState.operation),
      operation: undefined,
      nextOperand: ''
    })
  }
  
  const clearValues = () => {
    setCalcState({ 
      prevOperand: 0,
      operation: undefined,
      nextOperand: ''
    });
  }
  
  const inputValue = e => { 
    const value = e.target.innerText;
    setCalcState({ ...calcState, nextOperand: calcState.nextOperand += value });
  }
  
  const inputZeroValue = e => {
    if(calcState.nextOperand === '') return;
    setCalcState({ 
      ...calcState,
      nextOperand: calcState.nextOperand += e.target.innerText 
    });
  }
  
  const inputDecimalValue = e => {
    if(/\./.test(calcState.nextOperand)) return;
    if(calcState.nextOperand === '') {
      setCalcState(prevState => ({
        ...prevState,
        nextOperand: '0.'      
      }))      
    } else {
      setCalcState(prevState => ({
        ...prevState,
        nextOperand: prevState.nextOperand += e.target.innerText      
      }))
    }
  }
  
  return (
    <div className={classes.calculator}>
      <Display 
        prevOperand={calcState.prevOperand} 
        nextOperand={calcState.nextOperand} />
      <div 
        id="clear" 
        onClick={clearValues} 
        className={`${classes.clear} ${classes.key}`}>AC</div>
      <div 
        id="zero" 
        onClick={inputZeroValue} 
        className={`${classes.key} ${classes.zero}`}>0</div>
      <div 
        id="one" 
        onClick={inputValue} 
        className={`${classes.key} ${classes.one}`}>1</div>
      <div 
        id="two" 
        onClick={inputValue} 
        className={`${classes.key} ${classes.two}`}>2</div>
      <div 
        id="three" 
        onClick={inputValue} 
        className={`${classes.key} ${classes.three}`}>3</div>
      <div 
        id="four" 
        onClick={inputValue} 
        className={`${classes.key} ${classes.four}`}>4</div>
      <div 
        id="five" 
        onClick={inputValue} 
        className={`${classes.key} ${classes.five}`}>5</div>
      <div 
        id="six" 
        onClick={inputValue} 
        className={`${classes.key} ${classes.six}`}>6</div>
      <div 
        id="seven" 
        onClick={inputValue} 
        className={`${classes.key} ${classes.seven}`}>7</div>
      <div 
        id="eight" 
        onClick={inputValue} 
        className={`${classes.key} ${classes.eight}`}>8</div>
      <div 
        id="nine" 
        onClick={inputValue} 
        className={`${classes.key} ${classes.nine}`}>9</div>
      <div 
        id="equals" 
        onClick={equalClickHandler} 
        className={`${classes.key} ${classes.equals}`}>=</div>
      <div 
        id="add" 
        onClick={operationClickHandler} 
        className={`${classes.key} ${classes.add}`}>+</div>
      <div 
        id="subtract" 
        onClick={operationClickHandler} 
        className={`${classes.key} ${classes.subtract}`}>-</div>
      <div 
        id="multiply" 
        onClick={operationClickHandler} 
        className={`${classes.key} ${classes.multiply}`}>*</div>
      <div 
        id="divide" 
        onClick={operationClickHandler} 
        className={`${classes.key} ${classes.divide}`}>/</div>
      <div 
        id="decimal" 
        onClick={inputDecimalValue} 
        className={`${classes.key} ${classes.decimal}`}>.</div>
    </div>
  )
}

export default Calculator;