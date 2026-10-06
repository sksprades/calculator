import { useState } from 'react'
import './App.css'

function CalcDisplay({DisplayValue, displayBg}) {
  return (
    <div 
      className='Display' 
      style={{ backgroundColor: displayBg || '#05131d' }}
    >
      {DisplayValue}
    </div>
  );
}

function CalcButton({buttonLabel, onClick}) {
  return (
    <button className='Button' onClick={onClick}>
      {buttonLabel}
    </button>
  );
}

function App() {
  const [DisplayValue, setDisplayValue] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNext, setWaitingForNext] = useState(false);
  
  // Track display background color based on active operation
  const [displayBg, setDisplayBg] = useState('#05131d');

  // Map each operation button to a distinct indicator color
  const opColors = {
    '+': '#003b1f', // Dark Green for Addition
    '-': '#3b0000', // Dark Red for Subtraction
    '*': '#3b2f00', // Dark Yellow/Gold for Multiplication
    '÷': '#00253b', // Dark Blue for Division
  };

  const calculate = (first, second, op) => {
    const num1 = parseFloat(first);
    const num2 = parseFloat(second);

    switch (op) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '÷':
        return num2 === 0 ? 'Error' : num1 / num2;
      default:
        return second;
    }
  };

  const buttonClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerText;

    // Handle Number Input
    if (!isNaN(value)) {
      if (
        DisplayValue === '0' || 
        DisplayValue === 'RESET' || 
        DisplayValue === 'Error' || 
        waitingForNext
      ) {
        setDisplayValue(value);
        setWaitingForNext(false);
      } else {
        setDisplayValue(DisplayValue + value);
      }
      return;
    }

    // Handle Clear (CLR)
    if (value === 'CLR') {
      setDisplayValue('RESET');
      setPrevValue(null);
      setOperator(null);
      setWaitingForNext(false);
      setDisplayBg('#05131d'); // Reset display color to default
      return;
    }

    // Handle Equals (=)
    if (value === '=') {
      if (operator && prevValue !== null) {
        const result = calculate(prevValue, DisplayValue, operator);
        setDisplayValue(String(result));
        setPrevValue(null);
        setOperator(null);
        setWaitingForNext(true);
        setDisplayBg('#05131d'); // Reset display color on result
      }
      return;
    }

    // Handle Operators (+, -, *, ÷)
    if (['+', '-', '*', '÷'].includes(value)) {
      if (operator && !waitingForNext) {
        const result = calculate(prevValue, DisplayValue, operator);
        setDisplayValue(String(result));
        setPrevValue(String(result));
      } else {
        setPrevValue(DisplayValue);
      }
      setOperator(value);
      setWaitingForNext(true);
      
      // Update screen background color to match operator
      setDisplayBg(opColors[value] || '#05131d');
    }
  };

  return (
    <div className='App'>
      <div className='Header'>Calculator of Shawn Kent Prades - IT3A</div>
      <div className='Calculator'>
        <CalcDisplay DisplayValue={DisplayValue} displayBg={displayBg} />
        <div className='Keypad'>
          <CalcButton buttonLabel={7} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={8} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={9} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'÷'} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={4} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={5} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={6} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'*'} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={1} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={2} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={3} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'-'} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={"CLR"} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={0} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'='} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'+'} onClick={buttonClickHandler}/>
        </div>
      </div>
    </div>
  );
}

export default App