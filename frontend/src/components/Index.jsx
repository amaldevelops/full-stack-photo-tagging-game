import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  function navigateToGame() {
    console.log("Yayyy");
  }
  return (
    <div>
      <h1>Where's Maverick (A photo tagging Game)</h1>
      <button type="button" onClick={() => navigateToGame()}>
        Start Game
      </button>
    </div>
  );
}

export default Index;
