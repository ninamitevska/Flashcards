import React, { useState } from "react";
import "../app.css";
import axios from "axios";

const Flashcard = (props) => {
  const [flip, setFlip] = useState(false);
  const [questionTranslations, setQuestionTranslations] = useState();
  const [correctAnswer, setCorrectAnswer] = useState(undefined);

  const correctClass =
    correctAnswer === true
      ? "bg-success"
      : correctAnswer === false
      ? "bg-danger"
      : "";

  let flipClass = `card ${flip ? "flip" : ""}`;

  const options = questionTranslations?.map((it) => (
    <div key={it[0]}>
      <input type="radio" onClick={() => doSelect(it[0])} /> {it[0]}
    </div>
  ));

  return (
    <>
      <div
        className={`${flipClass} ${correctClass}`}
        onClick={() => {
          setFlip(!flip);
          get_words(props.flashcard.question);
        }}
      >
        <div className="front">{props.flashcard.question}</div>

        <div className="back">{options}</div>
      </div>
    </>
  );

  function get_words(question) {
    axios
      .get(`http://localhost:5000/get_words`, {
        params: {
          word_clicked: question,
        },
      })
      .then((res) => setQuestionTranslations(res.data));
  }

  function doSelect(selectedAnswer) {
    // todo: implement this method in python. Should return true/false
    axios
      .get(`http://localhost:5000/check_translation`, {
        params: {
          question: props.flashcard.question,
          selected_answer: selectedAnswer,
        },
      })
      .then((res) => setCorrectAnswer(res.data));
  }
};

export default Flashcard;
