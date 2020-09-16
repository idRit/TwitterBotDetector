from textgenrnn import textgenrnn
# from bck import upload

import os

#import tensorflowjs as tfjs

# textgen = textgenrnn()
# textgen.reset()
# textgen.train_from_file('./data/s1.txt', num_epochs=60)
# textgen.generate()


def getQuote (pref=""):
    textgen_2 = textgenrnn('textgenrnn_weights.hdf5')
    generated_texts = textgen_2.generate(n=1, prefix=pref, return_as_list=True, temperature=0.2)
    print(generated_texts)
    #tfjs.converters.save_keras_model('textgenrnn_weights.hdf5', '')
    return generated_texts

# Text RNN Random LVD ratio: (0.5 - ( (lvd / biggerstrlen) - 0.5)) / 0.5
# Text RNN Random Dice's Coefficient Ratio: DC / 0.75
# Text Generated
# Bot substring found in accountname or desc
# Retweet and fav mean
# 

def train ():
    textgen = textgenrnn()
    textgen.reset()
    # textgen.train_from_file('./data/s2.txt', num_epochs=150)
    # textgen.train_from_file('./s.txt', num_epochs=1)
    path = os.getcwd()
    textgen.train_from_file(path + '/s.txt', num_epochs=1)
    # textgen.generate()

train()

getQuote()
