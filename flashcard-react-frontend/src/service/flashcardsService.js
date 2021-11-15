import axios from "axios";

export async function get_words(question, language) {
    const resp = await axios.get(`http://localhost:5000/get_words`, {
        params: {
            word_clicked: question,
            from_language: language
            /*correct_word: correctWord*/
        }});
    return resp.data;
}

export function get_flashcards(fromLanguage, toLanguage) {
    //console.log(fcData)
    axios.post(`http://localhost:5000/flashcards`, {
        from_language: fromLanguage,
        to_language: toLanguage
    }).then(res => (res.data))
}