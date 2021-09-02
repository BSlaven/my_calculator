import classes from './Display.module.css';

const Display = ({ prevOperand, nextOperand}) => {
  return (
    <div className={classes.display}>
      <div className={classes.result} id="display">{prevOperand}</div>
      <div className={classes.input} id="input">{nextOperand || 0}</div>
    </div>
  )
}

export default Display;