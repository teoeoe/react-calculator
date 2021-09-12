import React, {useState} from 'react';
import {MdBackspace} from 'react-icons/md';

function App() {

  const regexOperators=/[+*-/]/;

  const [exp, setExp] = useState("");
  const [ans, setAns] = useState(exp);

  const calc=()=> {
    setAns(eval(exp));
    setExp(eval(exp));
  }

  const clc=()=> {
    setExp("");
    setAns(0);
  }

  const del=()=> {
    setExp(exp.slice(0,- 1));
  } 

  const disp=(key)=> {
    setExp((prevValue) => {
      if (regexOperators.test(key) && regexOperators.test(prevValue[prevValue.length - 1])){
        let newValue;
        if (/[-]/.test(key)) {
          newValue = prevValue.slice(0, prevValue.length) + key;
        } 
        else {
          let count = 0;
          for (let i = 0; i < prevValue.length; i++) {
            if (isNaN(+prevValue[i])) {
              count++;
            } else {
              count = 0;
            }
          }
          newValue = prevValue.slice(0, prevValue.length - count) + key;
        }

        setExp(newValue);
      } 
      else {
        if (prevValue) {
          prevValue = prevValue + "";
          let valArr = prevValue.split({regexOperators});
          let lastNumber = valArr[valArr.length - 1];
          if (!isNaN(lastNumber) && /[.]/.test(lastNumber) && key === ".") {
            key = "";
          }
        }

        setExp(
          (prevValue + key).replace(/^0/g, "").replace(/\.+/g, ".")
        );
      }
    });

    setAns((prevValue) =>
      (prevValue + key).replace(/^0/g, "").replace(/\.+/g, ".")
    );
  }

  return (
  <div className="App">
    <div className="title-tag"><h1>Javascript Calculator</h1></div>
    <div className="calculator-container">
      <div className="output">
        <input
        className="expression"
        disabled
        placeholder="0"
        value={exp}></input>
        <input
        id="display"
        className="answer-input"
        disabled
        placeholder="0"
        value={ans}></input>
      </div>

    <div className="keys">
      <button id="subtract" onClick={()=>disp("-")}>-</button>
      <button id="add" onClick={()=>disp("+")}>+</button>
      <button id="multiply" onClick={()=>disp("*")}>x</button>
      <button id="divide" onClick={()=>disp("/")}>/</button>
      <button id="seven" onClick={()=>disp("7")}>7</button>
      <button id="eight" onClick={()=>disp("8")}>8</button>
      <button id="nine" onClick={()=>disp("9")}>9</button>
      <button id="clear" onClick={clc}>C</button>
      <button id="four" onClick={()=>disp("4")}>4</button>
      <button id="five" onClick={()=>disp("5")}>5</button>
      <button id="six" onClick={()=>disp("6")}>6</button>
      <button id="one" onClick={()=>disp("1")}>1</button>
      <button id="two" onClick={()=>disp("2")}>2</button>
      <button id="three" onClick={()=>disp("3")}>3</button>
      <button id="delete" onClick={del}><MdBackspace/></button>
      <button id="decimal" onClick={()=>disp(".")}>.</button>
      <button id="zero" onClick={()=>disp("0")}>0</button>
      <button id="equals" onClick={calc}>=</button>
    </div>
  </div>
  <div className="footer">Created with the help of <a href="https://codesandbox.io/s/fcc-javascript-calculator-forked-jnc8b?file=/src/App.jsx" target="_blank">
Landon Schlangen</a>
  </div>
</div>
  );
}
export default App;