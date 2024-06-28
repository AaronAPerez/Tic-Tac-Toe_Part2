// Define the props interface for the Square component
interface SquareProps {
  value: string | null; // The value to display in the square (X, O, or null)
  onSquareClick: () => void; // Function to call when the square is clicked
}

// Define the Square component using the SquareProps interface
const Square = ({ value, onSquareClick }: SquareProps) => {
  return (
    // Render a button with the 'square' class, onClick handler, and the value
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

// Export the Square component as the default export
export default Square;