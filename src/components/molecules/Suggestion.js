import React from 'react';
import stringTOHTML from 'html-react-parser';
 
const Suggestion = ( {handleSelectRecord, selectedItemNumber, index, name, email, searchPhrase, noResult = false, appSettings} ) => {
    let suggestionContent = null;
    let suggestionClass = null;
    let nameHTML;
    let emailHTML;

    (index === selectedItemNumber && !noResult) ? suggestionClass="suggestion active" : suggestionClass="suggestion";
    if(noResult){
        suggestionContent = (
            <p className="no-record-text">{appSettings.noResultText}</p>
        )
    } else {
        if (searchPhrase){
            let re = new RegExp(searchPhrase,"gi");
            nameHTML = stringTOHTML(name.replace(re, `<strong>${searchPhrase}</strong>`));
            emailHTML = stringTOHTML(email.replace(re, `<strong>${searchPhrase}</strong>`));
        }
        suggestionContent = (
            <>
                <p className="name-text">{nameHTML}</p>
                <p className="email-text">{emailHTML}</p>
            </>
        )
    }

    return ( 
        <li className={suggestionClass} onClick={!noResult ? () => handleSelectRecord() : null}>
            <div className="suggestion-container">
                {suggestionContent}
            </div> 
        </li>
    );
}
 
export default Suggestion;