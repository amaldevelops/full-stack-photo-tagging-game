import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import maverickPic from "../assets/images/maverick.png";
import iceManPic from "../assets/images/ice-man.png";
import wizardPic from "../assets/images/wizard.png";
import whereIsMaverickImage from "../assets/images/wheres-maverick-image.jpg";
import Home from "../assets/images/home-icon.svg";

const apiURL = import.meta.env.VITE_API_URL;

function Game() {
  const timerRef = useRef(null);

  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);

  const [backEndStatus, SetBackEndStatus] = useState("loading");

  const [cssColorChange, SetCssColorChange] = useState({
    maverick: "",
    iceman: "",
    wizard: "",
  });

  // This will record the current status of the game
  const [gameStatus, setGameStatus] = useState({
    maverick: "notFound",
    iceman: "notFound",
    wizard: "notFound",
    name: "",
    time: "",
    currentStatus: "start",
  });
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [coords, setCoords] = useState(null);

  //Following will set the normalized coordinates
  const [normalizedCoords, setNormalizedCoords] = useState({
    x: 0,
    y: 0,
  });

  const [menuVisible, setMenuVisible] = useState(false);

  const [menuPosition, setMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  // This will record the relevant user selections
  const [userSelection, setUserSelection] = useState();

  const imgRef = useRef(null);

  // Store mavericks's normalized coordinates based on original image dimensions (1920x1080)
  // These are the coordinates for maverick when the image is at full resolution.
  const maverickNormalized = {
    x: 1100 / 1920, // 1100px / 1920px width of the image
    y: 380 / 1080, // 380px / 1080px height of the image
  };

  const iceManNormalized = {
    x: 207 / 1920, // 207px / 1920px width of the image
    y: 383 / 1080, // 383px / 1080px height of the image
  };

  const wizardNormalized = {
    x: 519 / 1920, // 1100px / 1920px width of the image
    y: 381 / 1080, // 380px / 1080px height of the image
  };

  useEffect(() => {
    timerRef.current = setInterval(
      () => setSeconds((seconds) => seconds + 1),
      1000
    );

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    setGameStatus((prev) => ({ ...prev, time: seconds }));
  }, [seconds]);

  useEffect(() => {
    function gameState() {
      if (
        gameStatus.maverick === "found" &&
        gameStatus.iceman === "found" &&
        gameStatus.wizard === "found" &&
        gameStatus.currentStatus !== "gameOver"
      ) {
        console.log("Game Ended");
        setGameStatus((prev) => ({ ...prev, currentStatus: "gameOver" }));

        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      } else {
        console.log("Waiting for Selection....");
      }
    }
    gameState();
  }, [gameStatus]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      const { width, height } = img.getBoundingClientRect();
      setImageDimensions({
        width: Math.round(width),
        height: Math.round(height),
      });
    };

    if (img.complete) {
      handleLoad(); // image already loaded (cached)
    } else {
      img.addEventListener("load", handleLoad);
    }

    return () => {
      img.removeEventListener("load", handleLoad);
    };
  }, []);

  function userClicks(characterName) {
    setUserSelection(characterName);
    console.log(userSelection);

    // Check if the user clicked near mavericks's normalized position
    const tolerance = 0.05; // Tolerance for "near" (5% of image size)
    if (
      characterName === "maverick" &&
      Math.abs(normalizedCoords.x - maverickNormalized.x) < tolerance &&
      Math.abs(normalizedCoords.y - maverickNormalized.y) < tolerance
    ) {
      console.log("You found maverick!");
      setGameStatus((prev) => ({ ...prev, maverick: "found" }));
      SetCssColorChange((prev) => ({ ...prev, maverick: "correctSelection" }));
      setMenuVisible(false);
    } else if (
      characterName === "iceman" &&
      Math.abs(normalizedCoords.x - iceManNormalized.x) < tolerance &&
      Math.abs(normalizedCoords.y - iceManNormalized.y) < tolerance
    ) {
      console.log("You found Iceman!");
      SetCssColorChange((prev) => ({ ...prev, iceman: "correctSelection" }));
      setGameStatus((prev) => ({ ...prev, iceman: "found" }));
      setMenuVisible(false);
    } else if (
      characterName === "wizard" &&
      Math.abs(normalizedCoords.x - wizardNormalized.x) < tolerance &&
      Math.abs(normalizedCoords.y - wizardNormalized.y) < tolerance
    ) {
      console.log("You found Wizard!");
      SetCssColorChange((prev) => ({ ...prev, wizard: "correctSelection" }));
      setGameStatus((prev) => ({ ...prev, wizard: "found" }));
      setMenuVisible(false);
    } else {
      console.log(
        "Please Try again! Character: " + characterName + " is Incorrect !"
      );
      SetCssColorChange((prev) => ({
        ...prev,
        [characterName]: "inCorrectSelection",
      }));
      console.log(cssColorChange);
      setMenuVisible(false);
    }
  }

  const hideMenu = () => {
    setMenuVisible(false);
  };

  const handleImageClick = (e) => {
    const { left, top } = imgRef.current.getBoundingClientRect();
    const { clientX, clientY } = e.nativeEvent;

    // Calculate coordinates relative to the image
    const offsetX = clientX - left;
    const offsetY = clientY - top;

    setCoords({ x: offsetX, y: offsetY });

    // Normalize the user's click coordinates
    const normalizedX = offsetX / imageDimensions.width;
    const normalizedY = offsetY / imageDimensions.height;

    setNormalizedCoords({ x: normalizedX, y: normalizedY });

    console.log(`Clicked at: (${offsetX}, ${offsetY})`);
    console.log(
      `Normalized Click Coordinates: (${normalizedX}, ${normalizedY})`
    );

    setMenuPosition({ x: offsetX, y: offsetY });

    setMenuVisible(true);
  };

  // useEffect(() => {
  //   console.log("Game Status:", gameStatus);
  // }, [gameStatus]);

  async function gameOver() {
    try {
      console.log("Game Over");
      // console.log("Game Over Data:", gameOverData);

      let response = await fetch(`${apiURL}/gameover`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameStatus),
      });

      if (!response.ok) {
        SetBackEndStatus("error");
        throw new Error("HTTP Error! Status", response.status);
      }

      const queryResult = await response.json();
      console.log(queryResult);

      navigate("/");
    } catch (error) {
      alert(
        "Backend or Network error ! Please try again, in few minutes if you wish to save your score on leaderboard"
      );
      SetBackEndStatus("error");
      console.error(error);
    }
  }

  function resetGame() {
    setGameStatus((prev) => ({
      ...prev,
      maverick: "notFound",
      iceman: "notFound",
      wizard: "notFound",
      name: "",
      time: "",
      currentStatus: "start",
    }));

    SetCssColorChange((prev) => ({
      ...prev,
      maverick: "",
      iceman: "",
      wizard: "",
    }));
  }

  return (
    <div>
      <div>
        {coords && (
          <div className="divBorder">
            <h3>Game Technical Info</h3>
            <p>
              Selected Coordinates: {coords.x}, {coords.y}
            </p>
            <p>
              Image Dimensions: {imageDimensions.width}x{imageDimensions.height}
            </p>
            <p>
              Normalized Coordinates X:{normalizedCoords.x} Y:
              {normalizedCoords.y}
            </p>
          </div>
        )}
      </div>
      <div className="gameIntroDiv">
        <h1>Where's Maverick (A photo tagging Game)</h1>
        <p>Try to find Maverick, Ice Man, and Wizard as soon as possible!</p>
      </div>
      <div className="divBorder">
        <h3>Game Timer : </h3>
        <h4>{seconds}</h4>
      </div>
      <div>
        <figure className={cssColorChange.maverick}>
          <img
            className="characterImages"
            src={maverickPic}
            alt="Maverick Picture"
          />
          <figcaption>
            <strong>Maverick</strong>
          </figcaption>
        </figure>
        <figure className={cssColorChange.iceman}>
          <img
            className="characterImages"
            src={iceManPic}
            alt="Ice Man Picture"
          />
          <figcaption>
            <strong>Ice Man</strong>
          </figcaption>
        </figure>

        <figure className={cssColorChange.wizard}>
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
          alt="Where's Maverick"
          useMap="#lookupMap"
          onClick={handleImageClick}
          ref={imgRef}
        />
      </div>

      <div>
        {menuVisible && (
          <div
            className="menu"
            style={{
              left: `${menuPosition.x + 20}px`,
              top: `${menuPosition.y + 100}px`,
            }}
          >
            <div className="menuButtonsDiv">
              <h3>Choose the Character</h3>

              <p>
                You clicked coordinates (X:{coords.x} Y:{coords.y})
              </p>
              <button
                onClick={() => {
                  userClicks("maverick");
                }}
              >
                Maverick
              </button>
              <button
                onClick={() => {
                  userClicks("iceman");
                }}
              >
                Ice Man
              </button>
              <button
                onClick={() => {
                  userClicks("wizard");
                }}
              >
                Wizard
              </button>
              <button onClick={hideMenu}>Close Menu</button>
            </div>
          </div>
        )}
      </div>

      <div>
        {gameStatus.currentStatus === "gameOver" && (
          <div className="popup-overlay">
            <div className="popup-box">
              <label htmlFor="playerName">
                Game Over ! Please Enter Your Name:
              </label>
              <input
                id="playerName"
                type="text"
                value={gameStatus.name}
                onChange={(e) =>
                  setGameStatus((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <button type="submit" onClick={() => gameOver()}>
                Submit
              </button>
              <button className="close-btn" onClick={() => resetGame()}>
                Reset Game
              </button>
              <p>
                Please note if you click reset game, scores will not be saved in
                leaderboard
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
