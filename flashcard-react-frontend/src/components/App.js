import React from "react";
import FlashcardList from "./FlashcardList";
import Languages from "./Language";

function App() {
  const [fromLanguage, setFromLanguage] = useState();
  const [toLanguage, setToLanguage] = useState();

  return (
    <div className="App">
      <Languages
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
