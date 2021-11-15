from flask import Flask, request, jsonify
from translate_api import tranlate_top_n, load_models
from flask_cors import CORS
import json
import random

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

language2model = load_models()
# global source_language
# global target_language
# with open("./flashcard-react-frontend/src/data/languages.json") as json_data:
#     language_data = json.load(json_data)

@app.route("/")
def on_website_load():  # put application's code here
    return ['word' + str(i) for i in range(24)]

# @app.route("/flashcards_on_start")
# def get_flashcards_on_start():
#     current_language = "German"
#     print(current_language)
#     random_ids = random.sample(range(0, 2000), 24)
#     random_words = [language2model[current_language].index_to_key[idx] for idx in random_ids]
#     flashcards_data = {'flash_cards': [{'id': idx, 'question': word} for idx, word in enumerate(random_words)]}
#     flashcards_data = jsonify(flashcards_data)
#     return flashcards_data


@app.route("/flashcards", methods=['POST'])
def get_flashcards():
    global source_language
    global target_language
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        source_language = data["from_language"]
        target_language = data["to_language"]
        #to_language = request.values['to_language']
        #print(from_language)
        random_ids = random.sample(range(0, 2000), 24)
        random_words = [language2model[source_language].index_to_key[idx] for idx in random_ids]
        flashcards_data = {'flash_cards': [{'id': idx, 'question': word} for idx, word in enumerate(random_words)]}
        flashcards_data = jsonify(flashcards_data)
        return flashcards_data #, source_language


@app.route("/languages")
def get_languages():
    with open("./flashcard-react-frontend/src/data/languages.json") as json_data:
        language_data = json.load(json_data)
    return jsonify(language_data)


@app.route("/get_words", methods=['POST'])
def get_similar_words():
    global source_language
    global target_language
    if request.method == 'POST':
        data = request.get_json()
        # data = request.values
        print("backend", data)
        word_clicked = data['word_clicked']# request.values['word_clicked']
        print(word_clicked)
        # source_language = data["from_language"]
        # target_language = data['to_language']
        print(source_language, target_language)

        top10_words = tranlate_top_n(word_clicked.lower(), language2model, source_language=source_language,
                                     target_language=target_language)
        top10_words = top10_words[0:4]
        correct_answer = top10_words[0]
        random.shuffle(top10_words)
        return jsonify(top10_words)

# @app.route("/check_translation")
# def translate():
#     return ;

if __name__ == '__main__':
    app.run(debug=True)
