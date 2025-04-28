import { useNavigate, Link } from "react-router-dom";

function Index() {
  const navigate = useNavigate();

  // const navigate = useNavigate();
  function navigateToGame() {
    console.log("Navigate to Game");
    navigate("/game");
  }
  return (
    <div>
      <h1>Where's Maverick (A photo tagging Game)</h1>
      <button type="button" onClick={() => navigateToGame()}>
        Start Game
      </button>
      {/* <Link to="/game">Game Start</Link> */}
    </div>
  );
}

export default Index;
