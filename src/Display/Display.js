import { useEffect, useRef } from 'react';
import classes from './Display.module.css';

const Display = ({ prevOperand, nextOperand, operation }) => {

  const calcDisplay = useRef();
  const calcInput = useRef();
  
  useEffect(() => {
    if(!operation) return;
    console.log(operation);
    
  }, [operation]);
  
  useEffect(() => {
    calcDisplay.current.innerText = prevOperand;
  }, [prevOperand]);
  
  useEffect(() => {
    calcInput.current.innerText = nextOperand === '' ?
      '0' : nextOperand;
  }, [nextOperand]);
  
  return (
    <div className={classes.display}>
      <div 
        ref={calcDisplay} 
        className={classes.result} 
        id="display">{prevOperand}</div>
      <div 
        ref={calcInput} 
        className={classes.input} 
        id="input">{nextOperand || 0}</div>
    </div>
  )
}

export default Display;