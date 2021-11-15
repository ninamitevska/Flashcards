import React, {useState, useEffect } from "react";
import '../app.css'
import {get_words} from "../service/flashcardsService";
import axios from "axios";


const Flashcard = (props) => {

    const [flip, setFlip] = useState(false)
    let flipClass = `card ${flip ? 'flip' : ''}`
    const [wordClick, setWordClicked] = useState();

    const doSelect = (word) => {
        console.log(word);

    }
    const options = wordClick?.map(it =>
        (<div key={it[0]}>
            <input className="radio" type="radio" onClick={() => doSelect(it[0])}/> {it[0]}

        </div>)
    )

    const onWordClick = async () => {
        const data = await get_words(props.flashcard.question, props.language);
        setWordClicked(data);
    };

    return (
        <>
            <div className={flipClass}
                 onClick={() => {
                     setFlip(!flip);
                     onWordClick();
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