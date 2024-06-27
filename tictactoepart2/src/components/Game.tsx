// Import React and necessary hooks
import { useState, useEffect } from "react";
// Import the Board component

import Board from "./Board";

// The Game component doesn't take any props, so we don't need to define a props type

const Game = () => {
  // State for the game history (array of board states)
  const [history, setHistory] = useState<Array<Array<string | null>>>([
    Array(9).fill(null),
  ]);
  // State for the current move number
  const [currentMove, setCurrentMove] = useState<number>(0);
  // Determine whose turn it is based on the current move
  const xIsNext = currentMove % 2 === 0;
  // Get the current board state
  const currentSquares = history[currentMove];

  // useEffect hook to log the current move whenever it changes
  useEffect(() => {
    console.log(`Current move: ${currentMove}`);
  }, [currentMove]);

  // Handle a play (when a square is clicked)
  const handlePlay = (nextSquares: Array<string | null>) => {
    // Create a new history array, removing any future moves if we've gone back in time
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    // Set the current move to the latest move
    setCurrentMove(nextHistory.length - 1);
  };

  // Jump to a specific move in the game history
  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  // Create the list of moves for the game history
  const moves = history.map((squares, move) => {
    let description: string;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button className="moves" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  // Render the game
  return (
    <>
      <div className="row">
      <div className="col-2">
          <ol>{moves}</ol>
        </div>
        <div className="col-10">
          <div className="game">
            <div className="game-board">
              <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
              />
            </div>
          </div>
        </div>
        {/* <div className="col">
          <ol>{moves}</ol>
        </div> */}
      </div>
    </>
  );
};

// Export the Game component as the default export
export default Game;
