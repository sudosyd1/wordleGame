import { useState } from "react";
import Grid from "./components/Grid";
import Input from "./components/Input";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
    const [guesses, setGuesses] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");
    const maxAttempts = 5;

    const handleGuess = async (guess) => {
        const response = await fetch(`${API_URL}/api/guess`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ guess: guess }),
        });
        const data = await response.json();

        if (data.error) {
            setMessage(data.error);
            return;
        }

        const newGuesses = [...guesses, data];
        setGuesses(newGuesses);

        // Check win — all 5 letters green
        if (data.every((tile) => tile.status === "green")) {
            setMessage("You won!");
            setGameOver(true);
            return;
        }

        // Check lose — used all attempts
        if (newGuesses.length >= maxAttempts) {
            // Fetch the answer to show them
            const answerRes = await fetch(`${API_URL}/api/answer`);
            const answerData = await answerRes.json();
            setMessage(`Game over! The word was ${answerData.answer}`);
            setGameOver(true);
        }
    };

    const handleNewGame = async () => {
        await fetch(`${API_URL}/api/new-game`, { method: "POST" });
        setGuesses([]);
        setGameOver(false);
        setMessage("");
    };

    return (
        <div className="app">
            <h1>Definitely Not Wordle</h1>
            <Grid guesses={guesses} maxAttempts={maxAttempts} />
            {!gameOver && <Input onGuess={handleGuess} />}
            {message && <p className="message">{message}</p>}
            {gameOver && <button onClick={handleNewGame}>Play Again</button>}
        </div>
    );
}

export default App;