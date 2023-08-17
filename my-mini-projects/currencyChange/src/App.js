// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import {useEffect, useState} from "react";


export default function App() {
  const host = 'api.frankfurter.app';

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amountCurrency, setAmountCurrency] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [resCurrency, setResCurrency] = useState(0);


  useEffect(function(){

    async function fetchCurrency() {
      setIsLoading(true);
        const res = await fetch(`https://${host}/latest?amount=${amountCurrency}&from=${fromCurrency}&to=${toCurrency}`);
        const data = await res.json();
        setResCurrency(data.rates[toCurrency]);
        setIsLoading(false);
    }
    if (fromCurrency === toCurrency) {setResCurrency(amountCurrency); return;}
    fetchCurrency();
  }, [fromCurrency, toCurrency, amountCurrency]);
 

  return (
    <div>
      <input value={amountCurrency} type="text"  onChange={(e) => setAmountCurrency(Number(e.target.value))}/>
      <select disabled={isLoading} value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select disabled={isLoading} value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{resCurrency} {toCurrency}</p>
    </div>
  );
}
