import axios from "axios";

export function get_words(question/*, correctWord*/) {
    axios.get(`http://localhost:5000/get_words`, {
        params: {
            word_clicked: question,
            /*correct_word: correctWord*/
        }
    }).then(res => (res.data))
}

export function get_flashcards(fromLanguage, toLanguage) {
    //console.log(fcData)
    axios.post(`http://localhost:5000/flashcards`, {
        from_language: fromLanguage,
        to_language: toLanguage
    }).then(res => (res.data))
}