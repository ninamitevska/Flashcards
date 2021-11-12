import gensim


def load_models():
    de_model = gensim.models.KeyedVectors.load_word2vec_format('/Users/ninamitevska/fastText-0.9.2/wiki.de.align.vec',
                                                               limit=200000)
    mk_model = gensim.models.KeyedVectors.load_word2vec_format('/Users/ninamitevska/fastText-0.9.2/wiki.mk.align.vec',
                                                               limit=200000)
    en_model = gensim.models.KeyedVectors.load_word2vec_format('/Users/ninamitevska/fastText-0.9.2/wiki.en.align.vec',
                                                               limit=200000)
    language_to_model = {'English': en_model,
                         'German': de_model,
                         'Macedonian': mk_model}

    return language_to_model


def tranlate_top_n(word, language_to_model, source_language, target_language):
    source_model = language_to_model[source_language]
    target_model = language_to_model[target_language]
    word_vec = source_model[word]
    result = target_model.similar_by_vector(word_vec)
    return result


# def get_word_list(language='English'):
#     return ['word'+str(i) for i in range(24)]
