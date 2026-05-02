import { useState } from "react";

function Input({ onGuess }) {
    //on guess prop is a function passed from App.jsx that will be called when the user submits a guess
    const [text, setText] = useState("");

    const handleSubmit = () => {
        //resets guess and calls onguess (sends to App.jsx)
        if (text.length === 5) {
            onGuess(text.toLowerCase());
            setText("");
        }
    };
    //handles pressing keys
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="input-area">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={5}
                placeholder="Enter 5-letter word"
            />
            <button onClick={handleSubmit}>Guess</button>
        </div>
    );
}

export default Input;