import Tile from "./Tile";

function Grid({ guesses, maxAttempts }) {
    const rows = [];

    //loop through each row. If there's a guess for that row,
    // render the letters with colors. If not, render empty tiles.
    for (let i = 0; i < maxAttempts; i++) {
        const guess = guesses[i]; // might be undefined if not guessed yet
        const tiles = [];
        for (let j = 0; j < 5; j++) {
            if (guess) {
                // this row has a guess — show letter + color
                tiles.push(
                    <Tile
                        key={j}
                        letter={guess[j].letter}
                        status={guess[j].status}
                    />
                );
            } else {
                // empty row — show blank tile
                tiles.push(<Tile key={j} letter="" status="" />);
            }
        }
        rows.push(
            <div key={i} className="row">
                {tiles}
            </div>
        );
    }
    return <div className="grid">{rows}</div>;
}

export default Grid;