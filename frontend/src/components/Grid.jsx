import Tile from "./Tile";

function Grid({ guesses, maxAttempts }) {
    const rows = [];

    for (let i = 0; i < maxAttempts; i++) {
        const guess = guesses[i];
        const tiles = [];

        for (let j = 0; j < 5; j++) {
            if (guess) {
                tiles.push(
                    <Tile
                        key={j}
                        letter={guess[j].letter}
                        status={guess[j].status}
                    />
                );
            } else {
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