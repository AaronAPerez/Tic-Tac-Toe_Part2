// Import React and the Square component
import Square from "./Square";

// Define the props interface for the Board component
interface BoardProps {
  xIsNext: boolean; // Whether it's X's turn
  squares: Array<string | null>; // The current state of the board
  onPlay: (nextSquares: Array<string | null>) => void; // Function to call when a move is made
}

// Define the Board component using the BoardProps interface
const Board = ({ xIsNext, squares, onPlay }: BoardProps) => {
  // Handler for when a square is clicked
  const handleClick = (i: number) => {
    // If there's a winner or the square is already filled, do nothing
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Create a copy of the squares array
    const nextSquares = squares.slice();
    // Set the value of the clicked square based on whose turn it is
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // Call the onPlay function with the updated squares
    onPlay(nextSquares);
  };

  // Calculate the winner (if any)
  const winner = calculateWinner(squares);
  // Determine the status message
  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every((square) => square !== null)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // Render the board
  return (
    <>
      {/* Render each row of the board */}
      <div className="board-row">
        <div className="row">
          {/* Render each square in the row */}
          <div className="col-6 col-md-4">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          </div>
          <div className="col-6 col-md-4">
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          </div>
          <div className="col-6 col-md-4">
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
        </div>
      </div>
      <div className="board-row">
        <div className="row">
          {/* Render each square in the row */}
          <div className="col-6 col-md-4">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          </div>
          <div className="col-6 col-md-4">
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          </div>
          <div className="col-6 col-md-4">
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
        </div>
      </div>
      <div className="board-row">
        <div className="row">
          {/* Render each square in the row */}
          <div className="col-6 col-md-4">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          </div>
          <div className="col-6 col-md-4">
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          </div>
          <div className="col-6 col-md-4">
            <Square value={squares[8]} onSquareClick={() => handleClick()} />
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to calculate the winner
const calculateWinner = (squares: Array<string | null>): string | null => {
  // Define all possible winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Check each winning combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // If all three squares in a line are the same (and not null), we have a winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // If no winner, return null
  return null;
};

// Export the Board component, calculateWinner function, and BoardProps interface
export { Board, calculateWinner };
export type { BoardProps };