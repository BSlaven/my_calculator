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
    const { prevOperand: prev, nextOperand: next } = calcState;
    switch(operation) {
      case '-':
        outputResult = parseFloat(prev) - parseFloat(next);
        break; 
      case '*':
        outputResult = parseFloat(prev) * parseFloat(next);
        break;
      case '/':
        outputResult = parseFloat(prev) / parseFloat(next);
        break;
      default:
        outputResult = parseFloat(prev) + parseFloat(next);
        break;
    }
    if(Number.isInteger(outputResult)) return outputResult;
    const [int, decimal] = String(outputResult).split('.');
    const shortDecimal = decimal.substr(0, 6);
    return parseFloat(`${int}.${shortDecimal}`);
  }
  
  const operationClickHandler = event => {
    const eventText = event.target.innerText; 
    const copyState = { ...calcState }
    if(eventText === '-' && copyState.nextOperand.includes('-') && copyState.operation === ('-')) return;

    if(eventText === '-' && calcState.operation === '-' && !calcState.nextOperand) {
      copyState.nextOperand += eventText;
      setCalcState(copyState);
      return;
    }

    if(copyState.nextOperand === '-') return;

    if(!copyState.operation) {
      copyState.operation = eventText;
      
      if(copyState.nextOperand.length > 1) {
        copyState.prevOperand = copyState.nextOperand;
        copyState.nextOperand = '';
      }
      setCalcState(copyState);
      return;
    }

    copyState.prevOperand = calculateValues(calcState.operation)
    copyState.operation = eventText;
    copyState.nextOperand = ''
    setCalcState(copyState);
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
        nextOperand={calcState.nextOperand}
        operation={calcState.operation}
      />
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