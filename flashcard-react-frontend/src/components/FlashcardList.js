import React, {useEffect, useState} from "react";
import Flashcard from "./Flashcard";
import {get_flashcards} from "../service/flashcardsService";
import axios from "axios";

const FlashcardList = (props) => {

    const [fcData, setFlashcards] = useState([{}])

    useEffect(() => {
        console.log(props.flash_cards)
        setFlashcards(props.flash_cards)
    })

    let flashCardsList = fcData?.map(flashcard => {
        return (<Flashcard flashcard={flashcard} key={flashcard.id}/>
        );
    });

    return (
        <>
            <div className="card-grid">
                {flashCardsList}
            </div>
        </>
    );
};

export default FlashcardList;
