import classes from './App.module.css';
import Calculator from './Calculator/Calculator';

function App() {
  return (
    <div className={classes.app}>
      <h1>Slavenov react digitron</h1>
      <Calculator />
    </div>
  );
}

export default App;
