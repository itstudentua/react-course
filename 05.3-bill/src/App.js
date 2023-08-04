import "./index.css";
import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState('');

  const [perc1, setPerc1] = useState(0);
  const [perc2, setPerc2] = useState(0);

  const res = ((bill * perc1) / 100 + (bill * perc2) / 100) / 2;

  function handleClick() {
    setBill('');
    setPerc1(0);
    setPerc2(0);   
  }
  return (
    <div>
      <BillInput setBill={setBill} bill={bill} />
      <SelectPercentage perc={perc1} setPerc={setPerc1}>How did you like the service?</SelectPercentage>
      <SelectPercentage perc={perc2} setPerc={setPerc2}>How did your friend like the service?</SelectPercentage>
      <Output bill={bill} res={res} />
      <Reset handleClick={handleClick}/>
    </div>
  );
}

function BillInput({ bill, setBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input type="text" placeholder="Bill value" value={bill} onChange={(e) => setBill(e.target.value)} />
    </div>
  );
}

function SelectPercentage({ children, perc, setPerc }) {
  return (
    <div>
      <label>{children}</label>
      <select value={perc}
        onChange={(e) => setPerc(Number(e.target.value))}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, res }) {
  return <h1>You pay ${Number(bill) + Number(res)} (${bill} + ${res} tip)</h1>
}

function Reset({handleClick}) {
  return <button onClick={handleClick}>Reset</button>
}
