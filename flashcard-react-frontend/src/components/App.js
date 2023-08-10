import React from "react";
import FlashcardList from "./FlashcardList";

function App() {
  const [fromLanguage, setFromLanguage] = useState();
  const [toLanguage, setToLanguage] = useState();

  return (
    <div className="App">
      <Language
        setFromLanguage={setFromLanguage}
        setToLanguage={setToLanguage}
      />
      <div className="container">
        <FlashcardList fromLanguage={fromLanguage} toLanguage={toLanguage} />
      </div>
    </div>
  );
}

export default App;
