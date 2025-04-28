import { useNavigate, Link } from "react-router-dom";

import maverickPic from "../assets/images/maverick.png";
import iceManPic from "../assets/images/ice-man.png";
import wizardPic from "../assets/images/wizard.png";
import whereIsMaverickImage from "../assets/images/wheres-maverick-image.jpg";
import Home from "../assets/images/home-icon.svg";

function Game() {
  return (
    <div>
      <div>
        <h1>Where's Maverick (A photo tagging Game)</h1>
        <p>Try to find Maverick, Ice Man and Wizard as soon as possible !</p>
      </div>

      <div>
        <figure>
          <img
            className="characterImages"
            src={maverickPic}
            alt="Maverick Picture"
          />
          <figcaption>
            <strong>Maverick</strong>
          </figcaption>
        </figure>
        <figure>
          <img
            className="characterImages"
            src={iceManPic}
            alt="Ice Man Picture"
          />
          <figcaption>
            <strong>Ice Man</strong>
          </figcaption>
        </figure>

        <figure>
          <img
            className="characterImages"
            src={wizardPic}
            alt="Wizard Picture"
          />
          <figcaption>
            {" "}
            <strong>Wizard</strong>
          </figcaption>
        </figure>

        <Link to="/">
          <figure>
            <img className="characterImages" src={Home} alt="Home Picture" />
            <figcaption>
              <strong>Return Home</strong>
            </figcaption>
          </figure>
        </Link>
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
