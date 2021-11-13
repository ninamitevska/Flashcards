import React, {useEffect, useState} from "react";
import Flashcard from "./Flashcard";
import axios from "axios";

const FlashcardList = () => {
    const [flashCards, setFlashcards] = useState([]);
    const [languages, setLanguages] = useState();
    const [fromLanguage, setFromLanguage] = useState("English");
    const [toLanguage, setToLanguage] = useState("English");

    useEffect(() => {
        if (!languages) {
            get_languages();
        }
    });

    const onFromLanguageChange = (e) => {
        setFromLanguage(languages[e.target.value - 1].name);
    };
    const onToLanguageChange = (e) => {
        setToLanguage(languages[e.target.value - 1].name);
    };

    const fromLanguageOptions = languages?.map((language) => {
        return (
            <option value={language.id} key={language.name}>
                {language.name}
            </option>
        );
    });
    const toLanguageOptions = languages?.map((language) => {
        return (
            <option value={language.id} key={language.name}>
                {language.name}
            </option>
        );
    });

    function get_languages() {
        axios
            .get("http://localhost:5000/languages")
            .then((res) => setLanguages(res.data));
    }

    const get_flashcards = async (language) => {
        const resp = await axios.post("http://localhost:5000/flashcards", {
            from_language: language,
        });
        return resp.data["flash_cards"];
    };

    const onGenerateClick = async () => {
        setFlashcards(await get_flashcards(fromLanguage));
    };

    return (
        <div>
            <div className="form-group">
                <label htmlFor="language">Language that you know</label>
                <select defaultChecked="English" onChange={onFromLanguageChange}>
                    {fromLanguageOptions}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="language">Language that you want to learn</label>
                <select defaultChecked="English" onChange={onToLanguageChange}>
                    {toLanguageOptions}
                </select>
            </div>
            <div className="form-group">
                <button className="btn" onClick={() => onGenerateClick()}>
                    Generate
                </button>
            </div>
            <div className="form-group">
                {/*<button className="btn" onClick={cardShuffler(flashcards)} id="shuffle">Shuffle</button>*/}
            </div>
            <div className="card-grid">
                {flashCards &&
                flashCards.map((card) => {
                    return <Flashcard flashcard={card} key={card.id}/>;
                })}
            </div>
        </div>
    );
};

export default FlashcardList;