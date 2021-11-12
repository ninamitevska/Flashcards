import React from "react";
import FlashcardList from "./FlashcardList";
import Languages from "./Language";

function App() {

    return (
        <div className="App">
            <Languages/>
            <div className="container">
                <FlashcardList/>
            </div>
        </div>
    );
}

export default App;
