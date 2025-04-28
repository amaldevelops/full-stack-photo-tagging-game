import { useNavigate, Link } from "react-router-dom";

import maverickPic from "../assets/images/maverick.png";
import iceManPic from "../assets/images/ice-man.png";
import wizardPic from "../assets/images/wizard.png";
import whereIsMaverickImage from "../assets/images/wheres-maverick-image.jpg";

function Game() {
  return (
    <div>
      <h1>Where's Maverick (A photo tagging Game)</h1>

      <div>
        <figure>
          <img
            className="characterImages"
            src={maverickPic}
            alt="Maverick Picture"
          />
          <figcaption>Maverick</figcaption>
        </figure>
        <figure>
          <img
            className="characterImages"
            src={iceManPic}
            alt="Ice Man Picture"
          />
          <figcaption>Ice Man</figcaption>
        </figure>

        <figure>
          <img
            className="characterImages"
            src={wizardPic}
            alt="Wizard Picture"
          />
          <figcaption>Wizard</figcaption>
        </figure>
        <Link to="/">Return to Home page</Link>
      </div>

      <div className="whereIsMaverickImageDiv">
        <img
          className="whereIsMaverickImage"
          src={whereIsMaverickImage}
          alt="Wizard Picture"
        />
      </div>
    </div>
  );
}

export default Game;
