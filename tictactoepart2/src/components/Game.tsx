// Import React and necessary hooks
import { useState, useEffect } from "react";
// Import the Board component and related functions/types
import { Board, calculateWinner, BoardProps } from "./Board";

// Define a new Reset button component
const ResetButton = ({ onClick }: { onClick: () => void }) => (
  <button className="reset-button" onClick={onClick}>
    Reset Game
  </button>
);

// Define the main Game component
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

  // Calculate the game status
  const winner = calculateWinner(currentSquares);
  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else if (currentSquares.every((square) => square !== null)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

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

  // Add a new reset function
  const handleReset = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
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
      description = "Go to start";
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
      {/* Render the game board and status */}
      <div className="row my-5">
        <div className="col-2 mt-2"></div>
        <div className="col">
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
        <div className="col-3">
          <div className="status my-5">{status}</div>
          <ResetButton onClick={handleReset} />
        </div>
      </div>
      {/* Render the move history */}
      <div className="footer py-2">
        <div className="row">
          <div className="col">
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    </>
  );
};

// Export the Game component as the default export
export default Game;