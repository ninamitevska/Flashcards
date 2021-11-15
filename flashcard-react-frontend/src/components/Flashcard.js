import React, {useState, useEffect} from "react";
import '../app.css'
import {get_words} from "../service/flashcardsService";

const Flashcard = (props) => {

    const [flip, setFlip] = useState(false)
    let flipClass = `card ${flip ? 'flip' : ''}`
    const [correctAnswer, setCorrectAnswer] = useState(undefined);
    const correctClass =
        correctAnswer === true
            ? "text-success"
            : correctAnswer === false
                ? "text-danger"
                : "";


    const [wordClick, setWordClicked] = useState();

    const doSelect = (word) => {
        console.log(word);
    // implement od Riste
    }

    const options = wordClick?.map(it =>
        (<div key={it[0]}>
            <input className="radio" type="radio" onClick={() => doSelect(it[0])}/> {it[0]}
        </div>)
    )

    const onWordClick = async () => {
        const data = await get_words(props.flashcard.question, props.fromLanguage, props.toLanguage);
        console.log(props.flashcard.question)
        setWordClicked(data);
    };

    return (
        <>
            <div className={`${flipClass} ${correctClass}`}
                 onClick={() => {
                     setFlip(!flip);
                     onWordClick(props.flashcard.question);
                 }}>
                <div className="front">
                    {props.flashcard.question}
                </div>

                <div className="back">
                    {options}
                </div>
            </div>
        </>
    );
};

export default Flashcard;