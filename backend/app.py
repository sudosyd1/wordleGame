from flask import Flask, jsonify, request
from flask_cors import CORS
import random
# from words import words #couldnt get this to work, so just read the file directly here

with open('words.txt', 'r') as file:
    word_list = file.read().splitlines()

app = Flask(__name__)
CORS(app) #so react and flask can interact without CORS issues

game = {
    "secret": random.choice(word_list),
    "guesses": [],
    "max_attempts": 5
}
# input {"guess": "crane"}
# return [{"letter": "c", "status": "gray"}, {"letter": "r", "status": "yellow"}, ...]
@app.route("/api/guess", methods=["POST"])
def guess():
    data = request.json          # {"guess": "crane"}
    user_guess = data["guess"]   # "crane"
    if len(user_guess) != 5 or len(game["guesses"]) >= game["max_attempts"]:
        return jsonify({"error": "Invalid guess"}), 400
    feedback = [None] * 5
    secret_letters = list(game["secret"])
    #double pass approach to handle duplicates correctly
    # first find greens
    for i in range(5):
        if user_guess[i] == secret_letters[i]:
            feedback[i] = {"letter": user_guess[i], "status": "green"}
            secret_letters[i] = None  # used up

    # second find yellows and grays
    for i in range(5):
        if feedback[i] is not None:
            continue  # already green
        if user_guess[i] in secret_letters:
            feedback[i] = {"letter": user_guess[i], "status": "yellow"}
            secret_letters[secret_letters.index(user_guess[i])] = None  # used up
        else:
            feedback[i] = {"letter": user_guess[i], "status": "gray"}
    game["guesses"].append(user_guess)
    return jsonify(feedback)

# return the secret word
@app.route("/api/answer", methods=["GET"])
def answer():
    return jsonify({"answer": game["secret"]})

# Pick a new word, reset guesses
@app.route("/api/new-game", methods=["POST"])
def new_game():
    game["secret"] = random.choice(word_list)
    game["guesses"] = []
    return jsonify({"message": "New game started!"})

if __name__ == "__main__":
    app.run(debug=True)

