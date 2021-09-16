import React, { useState } from 'react';
import Display from '../Display/Display';
import classes from './Calculator.module.css';

const Calculator = () => {
  const [calcState, setCalcState] = useState({
    prevOperand: 0,
    nextOperand: '',
    operation: null
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
    return outputResult;
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
    if(copyState.operation === eventText && !copyState.nextOperand.length > 1) return;

    if(!copyState.operation && copyState.nextOperand) {
      copyState.operation = eventText;
      copyState.prevOperand = copyState.nextOperand;
      copyState.nextOperand = '';
      setCalcState(copyState);
    } else if(copyState.operation && copyState.nextOperand) {
      copyState.prevOperand = calculateValues(calcState.operation)
      copyState.operation = eventText;
      copyState.nextOperand = ''
      setCalcState(copyState);
    } else {
      copyState.operation = eventText;
      copyState.nextOperand = '';
      setCalcState(copyState);
    }
  }
  
  const equalClickHandler = () => {
    const copyState = { ...calcState };
    if(!copyState.operation || !copyState.nextOperand) return;
    copyState.prevOperand = calculateValues(copyState.operation);
    copyState.operation = null;
    copyState.nextOperand = '';
    setCalcState(copyState);
  }
  
  const clearValues = () => {
    const copyState = { ...calcState };
    copyState.prevOperand = 0;
    copyState.operation = null;
    copyState.nextOperand = '';
    setCalcState(copyState);
  }
  
  const inputValue = e => { 
    const copyState = { ...calcState };
    const value = e.target.innerText;
    copyState.nextOperand += value;
    setCalcState(copyState);
  }
  
  const inputZeroValue = () => {
    const copyState = { ...calcState };
    if(copyState.nextOperand === '0') return;
    copyState.nextOperand += '0';
    setCalcState(copyState);
  }
  
  const inputDecimalValue = () => {
    const copyState = { ...calcState };
    if(/\./.test(copyState.nextOperand)) return;

    if(!copyState.nextOperand || copyState.nextOperand === '-') {
      copyState.nextOperand += '0.';
    } else {
      copyState.nextOperand += '.';
    }
    setCalcState(copyState);
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