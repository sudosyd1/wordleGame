import { useState } from "react";
import Grid from "./components/Grid";
import Input from "./components/Input";
import "./App.css";

const API_URL= import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
    const [guesses, setGuesses] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");
    const maxAttempts = 5;

    const handleGuess = async (guess) => {
        // 1. Send guess to Flask
        const response = await fetch(`${API_URL}/api/guess`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ guess: guess }),
        });
        const data = await response.json();

        // 2. If Flask returned an error, show it
        if (data.error) {
            setMessage(data.error);
            return;
        }

        // 3. Add this guess to our list
        const newGuesses = [...guesses, data];
        setGuesses(newGuesses);

        // 4. Check if they won
        if (data.every((tile) => tile.status === "green")) {
            setMessage("You won!");
            setGameOver(true);
            return;
        }

        // 5. Check if they lost
        if (newGuesses.length >= maxAttempts) {
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
            {/* only render this if the condition is true */}
            {gameOver && (
                <button onClick={handleNewGame}>Play Again</button>
            )}
        </div>
    );
}

export default App;