# Definitely Not Wordle 🟩🟨⬜

A fullstack Wordle-inspired word guessing game built for the **GoLinks 2026 Fullstack Engineering Intern** hiring project.

## How to Play

1. Guess the secret 5-letter word within 5 tries.
2. After each guess, colored tiles reveal how close you are:
   - 🟩 **Green** — correct letter, correct position
   - 🟨 **Yellow** — correct letter, wrong position
   - ⬜ **Gray** — letter not in the word
3. Use the feedback to narrow down the answer. Good luck!

## Tech Stack

**Frontend:** React (Vite) — lightweight, fast dev server, and I'm most comfortable building UIs with React's component model.

**Backend:** Flask (Python) — simple and minimal for a REST API with just a few endpoints. No need for a heavier framework for this scope.

**Hosting:** Vercel (frontend) + Render (backend) — both offer free tiers with GitHub auto-deploy, making the deployment pipeline straightforward.

I chose this stack because it gave me the fastest path to a working, deployed product using tools I'm confident in.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/guess` | Submit a 5-letter guess, returns color feedback for each letter |
| GET | `/api/answer` | Returns the secret word |
| POST | `/api/new-game` | Resets the game with a new secret word |

## Running Locally

**Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

The Flask server runs on `http://localhost:5000` and the React app runs on `http://localhost:5173`.

## Project Structure

```
wordleGame/
├── backend/
│   ├── app.py              # Flask server and game logic
│   ├── words.txt           # Word list for secret word selection
│   └── requirements.txt    # Python dependencies
└── frontend/
    ├── src/
    │   ├── App.jsx          # Main game component
    │   └── components/
    │       ├── Grid.jsx     # 5x5 tile board
    │       ├── Tile.jsx     # Individual letter tile
    │       └── Input.jsx    # Guess input field
    └── package.json
```
