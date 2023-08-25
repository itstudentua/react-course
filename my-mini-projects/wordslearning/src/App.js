import { useEffect, useState, useCallback } from "react";
import { useGoogleSheet } from "./GoogleSheet"
import { splitStringFunc, makeUniq, uniqueElementsNotInFirst } from "./wordsProcessing";
import { generateExcel } from "./generateExcel";
import CopyToClipboard from 'react-copy-to-clipboard';


function App() {

  const { googleWords } = useGoogleSheet();
  const [userWords, setUserWords] = useState("");
  const [wordsInfo, setWordsInfo] = useState([0, 0, 0]);
  const [isMyData, setIsMyData] = useState(false);
  const [isNewData, setIsNewData] = useState(false);

  useEffect(() => {
    document.title = `Words Learning ${(isMyData ? "| My data" : "") || (isNewData ? "| New data" : "")}`;
  });

  const processWords = useCallback(() => {
    const tempArr = splitStringFunc(userWords);
    const userWordsArr = makeUniq(tempArr);
    const googleWordsNew = googleWords.map((item) => item.split(",")[0]);
    const resultArray = uniqueElementsNotInFirst(googleWordsNew, userWordsArr)
    console.log(resultArray);

    setWordsInfo([tempArr.length, userWordsArr.length, resultArray]);
  }, [userWords, googleWords]);


  useEffect(() => processWords(), [processWords, userWords]);


  function handleDownloadExcel() {
    generateExcel(wordsInfo[2]);
  }

  function handleDataButtonClick() {
    setIsMyData(myData => !myData);
    setIsNewData(false);

  }

  function handleCloseTableButtonClick() {
    setIsNewData(myData => !myData);
  }

  function handleShowTableButtonClick() {
    setIsNewData(myData => !myData);
  }

  function handleHeaderClick() {
    setIsMyData(false);
    setIsNewData(false);
    setUserWords("");
    setWordsInfo([0, 0, 0]);
  }

  return (
    <>
      <Header onClickHeader={handleHeaderClick} onClickMyData={handleDataButtonClick} isMyData={isMyData} />
      <Main
        googleWords={googleWords}
        onDonwloadExcel={handleDownloadExcel}
        wordsInfo={wordsInfo}
        userWords={userWords}
        onUserWords={setUserWords}
        processWords={processWords}
        isMyData={isMyData}
        onClickShowTable={handleShowTableButtonClick}
        isNewData={isNewData}
        onClickCloseTable={handleCloseTableButtonClick}
      >
      </Main>
    </>
  );
}

function Header({ onClickHeader, onClickMyData, isMyData }) {
  return (
    <header>
      <div className="header__container">
        <h1 onClick={onClickHeader}><span className="header__link_mob">WL</span><span className="header__link">Words Learning</span></h1>
        <Button onClickButton={onClickMyData}>{!isMyData ? "My Data" : "New Data"}</Button>
      </div>
    </header>

  );
}

function Main({ onClickCloseTable, userWords, onClickShowTable, isNewData, isMyData, googleWords, processWords, onUserWords, wordsInfo, onDonwloadExcel, children }) {

  const copyArray = () => {
    setCopied(true); // Устанавливаем состояние "copied" в true после копирования
    setTimeout(() => setCopied(false), 1000); // Через 3 секунды снова устанавливаем в false
  };

  const [copied, setCopied] = useState(false);


  return (
    <main>
      {googleWords.length === 0 && <span className="preloader">Loading...</span>}
      {!isNewData && !isMyData && googleWords.length > 0 ?
        <>

          <TextArea onUserWords={onUserWords} userWords={userWords} processWords={processWords} />
          {
            wordsInfo[0] > 0 &&
            <div className="words_info">
              <CopyToClipboard text={wordsInfo[2].join("\n")} onCopy={copyArray}>
                <img onClick={copyArray} src="../copy.svg" alt="SVG Example" />

              </CopyToClipboard>
              {copied && <p style={{ fontStyle: "italic" }}>Text copied!</p>}

              <p>Total words: {wordsInfo[0]}</p>
              <p>Unique words: {wordsInfo[1]}</p>
              <p>New words: {wordsInfo[2].length}</p>
              {wordsInfo[2].length > 0 &&
                <div style={{ display: "flex", gap: "20px" }}>
                  <Button onClickButton={onClickShowTable}>Show table</Button>
                  <Button onClickButton={onDonwloadExcel}>Download Excel</Button>
                </div>
              }
            </div>
          }
        </> :
        <>
          {isMyData && <Table data={googleWords} />}
          {isNewData &&
            <>
              <Table data={wordsInfo[2]} isNewData={isNewData} />
              <p>Total words: {wordsInfo[2].length}</p>
              <div style={{ display: "flex", gap: "20px", marginTop: "25px" }}>
                <Button onClickButton={onClickCloseTable}>Close table</Button>
                <Button onClickButton={onDonwloadExcel}>Download Excel</Button>
              </div>
            </>
          }

        </>
      }
      {children}
    </main>
  );
}

function Button({ onClickButton, children }) {
  function handleClick() {
    onClickButton();
  }
  return (
    <button onClick={handleClick} className="main__button">{children}</button>
  );
}

function TextArea({ onUserWords, userWords }) {


  return (
    <textarea
      className="main__input"
      type="text"
      placeholder="This is the New Words section. In this field you can enter the text you want to process."
      value={userWords}
      onChange={e => onUserWords(e.target.value)}
    />
  );
}

function Table({ data, isNewData = false }) {
  return (
    <div className="table__container_out">
      <div className="table__container">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Word</th>
              {!isNewData && <th>Translate</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.split(',')[0]}</td>
                {!isNewData && <td>{item.split(",")[1]}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default App;
