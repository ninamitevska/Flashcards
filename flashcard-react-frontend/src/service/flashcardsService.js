import axios from "axios";

export async function get_words(question, fromLanguage, toLanguage) {
    const resp = await axios.post(`http://localhost:5000/get_words`, {
            word_clicked: question,
            from_language: fromLanguage,
            to_language: toLanguage
            /*correct_word: correctWord*/
        });
    return resp.data;
}