import React from 'react';
import Infographic from '../molecules/Infographic';
import Suggestion from '../molecules/Suggestion';

const InputField = ( {handleSearchInput, handleSelectRecord, recordArray, searchPhrase, appSettings, selectedItemNumber} ) => {
    let renderedSuggestionListItems = null;
    if (recordArray){
        renderedSuggestionListItems = recordArray.map((suggestion, index) => {
            return <Suggestion key={index} handleSelectRecord={handleSelectRecord} selectedItemNumber={selectedItemNumber} name={suggestion.name} index={index} email={suggestion.email} searchPhrase={searchPhrase} appSettings={appSettings}/>
        })
    } else {
        renderedSuggestionListItems = (
            <Suggestion noResult={true} appSettings={appSettings}/>
        )
    }
    //Controlled input field component 
    return ( 
        <div className="inputfield">
            <Infographic/>
            <div className="field-container">
                <input type="text" placeholder={appSettings.placeholderText} value={searchPhrase} onChange={(e) => handleSearchInput(e)}/>
            </div>
            <ul className="suggestion-list">
                {renderedSuggestionListItems}
            </ul>
        </div>
    );
}
 
export default InputField;