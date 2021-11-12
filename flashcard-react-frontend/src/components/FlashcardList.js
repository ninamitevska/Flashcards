import React, {useEffect, useState} from "react";
import Flashcard from "./Flashcard";
import axios from "axios";

const FlashcardList = (props) => {

    const [fcData, setFlashcards] = useState([{}])

    useEffect(() => {
        fetch("/flashcards").then(
            FlashcardData => FlashcardData.json()
        ).then(
            fcData => {
                setFlashcards(fcData['flash_cards'])
            }
        )
    }, [])

    function get_flashcards(fcData) {
        axios.get(`http://localhost:5000/flashcards`, {
            params: {
                flash_cards: fcData
            }
        }).then(res => setFlashcards(res.data))
    }

    useEffect(() => {
        if (!fcData) {
            get_flashcards()
            console.log(fcData)
        }
    })

    let flashCardsList = fcData?.map(flashcard => {
        return (<Flashcard flashcard={flashcard} key={flashcard.id}/>
        );
    });

    return (

        <div className="card-grid">
            {flashCardsList}
        </div>
    );
};

export default FlashcardList;