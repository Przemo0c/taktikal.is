//Styles
import "./style.css";

//Components
import InputField from "./components/organisms/InputField";

//Other
import { useEffect, useState } from "react";

function App() {
  const [apiData, setApiData] = useState(null);
  const [recordArray, setRecordArray] = useState(null);
  const [searchPhrase, setSearchPhrase] = useState("");
  let [selectedItemNumber, setSelectedItemNumber] = useState(0);
  let [foundRecordNumber, setFoundRecordNumber] = useState(0);

  //Settings for the text labels
  const appSettings = {
    placeholderText : "Þekktir viðtakendur",
    noResultText : "Engar niðurstöður"
  }
  /*
    I have saved the data on the server to make it more 'real'
    then I am fetching it using fetch function (optional : axios library)
    then saving it to state using useState hook.
  */
  useEffect(() => {
    fetch("https://api.jsonbin.io/b/61fac32869b72261be4d6f14")
    .then(res => res.json())
    .then(
      (result) => {
        setApiData(result);
      },
      (error) => {
        setApiData(null);
        throw new Error("API Data has not been fetched.");
      }
    )

    document.addEventListener("keydown", handleKeyPressInput, false);
    return () => {
      document.removeEventListener("keydown", handleKeyPressInput)
    }
  }, []);

  /*
    Filtering on copied api array to avoid modifying original
    based on user searched phrase using regular expression 
    (optional custom algorithm)
    this array is later on passed as prop to filter results.
  */
  const handleSearchInput = (e) => {
    let val = e.target.value;
    setSearchPhrase(val);

    if(val.length === 0){
      handleResetValues();
      return;
    }
    
    let apiCopy = [...apiData];
    setRecordArray(apiCopy);
  
    let foundRecordsArray = apiCopy.filter(record => {
      let apiName = record.name;
      let apiEmail = record.email;
      let regEx = new RegExp(String.raw`(${val.toUpperCase()})`);
   
      //regEX to match the search phrase
      return (apiName.toUpperCase().match(regEx) || apiEmail.toUpperCase().match(regEx)) 
    })

    foundRecordsArray.length === 0 ? setRecordArray(null) : setRecordArray(foundRecordsArray);
    setFoundRecordNumber(foundRecordsArray.length);
  }

  /*
    Behaviour of "enter" pressing, "arrowDown" and "arrowUp"
  */
  const handleKeyPressInput = (e) => {
    switch(e.keyCode){
      case 13:
        handleSelectRecord();
      break;
      case 40:
        let o = parseInt(++selectedItemNumber);
        setSelectedItemNumber(o);
      break;
      case 38:
        let k = parseInt(--selectedItemNumber);
        setSelectedItemNumber(k);
      break;
      default:
      break;
    }
  }

  const handleSelectRecord = () => {
    handleResetValues();
  }

  const handleResetValues = () => {
    setSearchPhrase("");
    setRecordArray(null);
    setSelectedItemNumber(0);
    setFoundRecordNumber(0);
  }

  return (
    <div className="App">
        {apiData ? <InputField handleSearchInput={handleSearchInput} handleKeyPressInput={handleKeyPressInput} handleSelectRecord={handleSelectRecord} selectedItemNumber={selectedItemNumber} recordArray={recordArray} searchPhrase={searchPhrase} appSettings={appSettings}/> : null}
    </div>
  );
}

export default App;
