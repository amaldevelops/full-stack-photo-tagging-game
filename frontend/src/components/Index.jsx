import { useNavigate, Link } from "react-router-dom";
import LeaderBoard from "./LeaderBoard.jsx";

function Index() {
  const navigate = useNavigate();

  function navigateToGame() {
    console.log("Navigate to Game");
    navigate("/full-stack-photo-tagging-game/game");
  }
  return (
    <div className="IntroDiv">
      <h1>Where's Maverick (A photo tagging Game)</h1>
      <p>
        Wheres Waldo type game where you should try to find Maverick, Ice Man,
        and Wizard as soon as possible!
      </p>
      <button className="button" type="button" onClick={() => navigateToGame()}>
        Start Game
      </button>
      <div>
        <LeaderBoard />
      </div>
    </div>
  );
}

export default Index;
