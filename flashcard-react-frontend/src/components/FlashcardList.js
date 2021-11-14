import React, { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import axios from "axios";

const FlashcardList = (props) => {
  const [fcData, setFlashcards] = useState([{}]);

  function get_flashcards() {
    axios
      .get(`http://localhost:5000/flashcards`, {
        params: {
          language_selected: props.fromLanguage,
        },
      })
      .then((res) => setFlashcards(res.data));
  }

  useEffect(() => {
    get_flashcards();
  }, [props, props.fromLanguage]);

  let flashCardsList = fcData?.map((flashcard) => {
    return (
      <Flashcard
        flashcard={flashcard}
        key={flashcard.id}
        fromLanguage={props.fromLanguage}
        toLanguage={props.toLanguage}
      />
    );
  });

  return <div className="card-grid">{flashCardsList}</div>;
};

export default FlashcardList;
