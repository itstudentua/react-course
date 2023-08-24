import { useState } from "react";
import { useGoogleSheet } from "./GoogleSheet"
import { splitStringFunc, makeUniq, uniqueElementsNotInFirst } from "./wordsProcessing";
import { generateExcel } from "./generateExcel";

function App() {

  const { googleWords, isLoading, error } = useGoogleSheet();
  const [userWords, setUserWords] = useState("");
  const [wordsInfo, setWordsInfo] = useState([0, 0, 0]);


  function processWords() {
    const tempArr = splitStringFunc(userWords);
    const userWordsArr = makeUniq(tempArr);
    const resultArray = uniqueElementsNotInFirst(googleWords, userWordsArr)

    setWordsInfo([tempArr.length, userWordsArr.length, resultArray]);
    console.log(resultArray);
  }

  function handleDownloadExcel() {
    generateExcel(wordsInfo[2]);
  }

  return (
    <>
      <Header />
      {googleWords.length === 0 && <span>Loading...</span>}
      {!isLoading && googleWords.length > 0 && <Main onDonwloadExcel={handleDownloadExcel} wordsInfo={wordsInfo} onUserWords={setUserWords} processWords={processWords} />}
      {error === "" && <p>{error}</p>}
    </>
  );
}

function Header() {
  return (
    <header>
      <span className="header__link" >Words Learning</span>
    </header>

  );
}

function Main({ processWords, onUserWords, wordsInfo, onDonwloadExcel }) {


  return (
    <main>
      <textarea
        className="main__input"
        type="text"
        placeholder="This is the New Words section. In this field you can enter the text you want to process."
        onChange={e => onUserWords(e.target.value)}
      />
      <button onClick={processWords} className="processBtn">Process</button>
      {
        wordsInfo[0] > 0  &&
        <div className="words_info">
          <p>Total words: {wordsInfo[0]}</p>
          <p>Unique words: {wordsInfo[1]}</p>
          <p>New words: {wordsInfo[2].length}</p>
          {wordsInfo[2].length > 0 && <button onClick={onDonwloadExcel} className="processBtn">Download Excel</button>}
        </div>
      }
    </main>
  );
}

export default App;
