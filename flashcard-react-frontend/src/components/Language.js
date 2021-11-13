import React, {useEffect, useState} from "react";
import axios from "axios";
import {get_flashcards} from "../service/flashcardsService";
import FlashcardList from "./FlashcardList";


const Languages = (props) => {

    const [languages, setLanguages] = useState()
    const [fromLanguage, setFromLanguage] = useState()
    const [toLanguage, setToLanguage] = useState()

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

    function get_from_languages(fromLanguage) {
        axios.get(`http://localhost:5000/flashcards`, {
            params: {
                from_language: fromLanguage
            }
        }).then(res => setFromLanguage(res.data))
    }

    useEffect(() => {
        if (!fromLanguage) {
            get_from_languages(props.from_language)
            console.log(fromLanguage)
        }
    })

    function get_to_languages(toLanguage) {
        axios.get(`http://localhost:5000/languages`, {
            params: {
                to_language: toLanguage
            }
        }).then(res => setToLanguage(res.data))
    }

    useEffect(() => {
        if (!toLanguage) {
            get_to_languages(props.to_language)
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
        setFromLanguage(languages[e.target.value - 1].name)
        console.log('from', languages[e.target.value - 1].name)
        //get_from_languages(languages[e.target.value - 1].name)
    }
    const onToLanguageChange = (e) => {
        setToLanguage(languages[e.target.value - 1].name)
        console.log('to', languages[e.target.value - 1].name)
        //get_to_languages(languages[e.target.value - 1].name)

    }

    return (
        <div>
            <form className="header">
                <div className="form-group">
                    <label htmlFor="language">Language that you know</label>
                    <select onChange={onFromLanguageChange}>
                        {fromLanguageOptions}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="language">Language that you want to learn</label>
                    <select onChange={onToLanguageChange}>
                        {toLanguageOptions}
                    </select>
                </div>
                {/*  <div className="form-group">
                        <label htmlFor="amount">Number of words</label>
                        <input type="number" id="amount" min="1" step="1" defaultValue={10}/>
                    </div>*/}
                <div className="form-group">
                    <button className="btn" onClick={() => <FlashcardList
                        flash_cards={get_flashcards(fromLanguage, toLanguage)}/>}>Generate
                    </button>
                </div>
                <div className="form-group">
                    {/*<button className="btn" onClick={cardShuffler(flashcards)} id="shuffle">Shuffle</button>*/}
                </div>
            </form>
        </div>
    );


};
export default Languages;