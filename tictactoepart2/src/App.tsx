// Import the Game component and CSS styles
import Game from "./components/Game";
import "./index.css";

// Define the main App component
const App = () => {
  return (
    <>
      {/* Create a container for the game */}
      <div className="container">
        {/* Add a title for the game */}
        <h1 className="text-center my-4">Tic Tac Toe</h1>
        {/* Render the Game component */}
        <Game />
      </div>
    </>
  );
};

// Export the App component as the default export
export default App;