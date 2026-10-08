import { useState } from 'react'
import './App.css'

function CalcDisplay({ DisplayValue, backgroundColor }) {
  return (
    <div className='Display' style={{ backgroundColor }}>
      {DisplayValue}
    </div>
  );
}

const opColors = {
  '+': '#003b1f',
  '-': '#3b0000',
  '*': '#3b2f00',
  '÷': '#00253b',
};

function CalcButton({ buttonLabel, onClick }) {
  return (
    <button className='Button' onClick={onClick}>
      {buttonLabel}
    </button>
  );
}

function App() {
  const [DisplayValue, setDisplayValue] = useState(0);
  const [displayBg, setDisplayBg] = useState(undefined);

  const buttonClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setDisplayValue(value);

    if (opColors[value]) {
      setDisplayBg(opColors[value]);
    }
  }

  return (
    <div className=' App'>
      <div className='Header'>Calculator of Shawn Kent Prades - IT3A</div>
      <div className='Calculator'>
        <CalcDisplay DisplayValue={DisplayValue} backgroundColor={displayBg} />
        <div className='Keypad'>
          <CalcButton buttonLabel={7} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={8} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={9} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'÷'} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={4} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={5} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={6} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'x'} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={1} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={2} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={3} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'-'} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={"C"} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={0} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'='} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'+'} onClick={buttonClickHandler}/>
        </div>
      </div>
    </div>
  );
} 

export default App
