import React, {useEffect, useState} from "react";
import axios from "axios";
import get_flashcards from "./Flashcard";

const Languages = (props) => {

    const [languages, setLanguages] = useState()

    //const [fcData, setFlashcards] = useState([{}])

    function get_languages(languages) {
        axios.get(`http://localhost:5000/languages`, {
            params: {
                language_data: languages
            }
        }).then(res => setLanguages(res.data))
    }

    useEffect(() => {
        if (!languages) {
            get_languages(props.language_data)
            console.log(languages)
        }
    })

    useEffect(() => {
        if (!fromLanguage) {
            //get_from_languages(props.language_selected)
            console.log(fromLanguage)
        }
    })

    function get_to_languages(toLanguage) {
        axios.get(`http://localhost:5000/languages`, {
            params: {
                to_language_data: toLanguage
            }
        }).then(res => setToLanguage(res.data))
    }

    useEffect(() => {
        if (!toLanguage) {
            //get_to_languages(props.to_language_data)
            //console.log(toLanguage)
        }
    })

    // da gi pratam kako props

    const fromLanguageOptions = languages?.map(language => {
        return <option value={language.id} key={language.name}>{language.name}</option>
    });
    const toLanguageOptions = languages?.map(language => {
        return <option value={language.id} key={language.name}>{language.name}</option>
    });


    const onFromLanguageChange = (e) => {
        setFromLanguage(e.target.language_selected)
        console.log('from', languages[e.target.value - 1].name)
        //get_from_languages(languages[e.target.value - 1].name)
    }
    const onToLanguageChange = (e) => {
        setToLanguage(e.target.to_language_data)
        console.log('to', languages[e.target.value - 1].name)
        //get_to_languages(languages[e.target.value - 1].name)

    }

    return (
        <div>
            <form className="header">
                <div className="form-group">
                    <label htmlFor="language">Language that you know</label>
                    <select defaultChecked="German" onChange={onFromLanguageChange}>
                        {fromLanguageOptions}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="language">Language that you want to learn</label>
                    <select defaultChecked="English" onChange={onToLanguageChange}>
                        {toLanguageOptions}
                    </select>
                </div>
                {/*  <div className="form-group">
                        <label htmlFor="amount">Number of words</label>
                        <input type="number" id="amount" min="1" step="1" defaultValue={10}/>
                    </div>*/}
                <div className="form-group">
                    <button className="btn" onChange={() => get_flashcards(props.language_selected)}>Generate</button>
                </div>
                <div className="form-group">
                    {/*<button className="btn" onClick={cardShuffler(flashcards)} id="shuffle">Shuffle</button>*/}
                </div>
            </form>
        </div>
    );


};
export default Languages;