import { useNavigate, Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

import maverickPic from "../assets/images/maverick.png";
import iceManPic from "../assets/images/ice-man.png";
import wizardPic from "../assets/images/wizard.png";
import whereIsMaverickImage from "../assets/images/wheres-maverick-image.jpg";
import Home from "../assets/images/home-icon.svg";

function Game() {
  const [cssColorChange, SetCssColorChange] = useState("");
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const imgRef = useRef(null);

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

  // In HTML Image maps The coords for a rectangle are defined as:
  // x1,y1,x2,y2
  // x1,y1 are the coordinates of the top-left corner of the rectangle.
  // x2,y2 are the coordinates of the bottom-right corner of the rectangle.
  // Maverick: 624, 240,633, 267
  // Ice Man:
  // Wizard:
  const [coords, setCoords] = useState(null);

  function userSelections(cssClassName) {
    SetCssColorChange(cssClassName);
  }

  const handleImageClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent; // Get coordinates relative to the image
    setCoords({ x: offsetX, y: offsetY });
    console.log(`Clicked at: (${offsetX}, ${offsetY})`);
  };

  return (
    <div>
      <div>
        {coords && (
          <div>
            <p>
              Selected Coordinates: {coords.x}, {coords.y}
            </p>
            <p>
              Image Dimensions: {imageDimensions.width}x{imageDimensions.height}
            </p>
          </div>
        )}
      </div>
      <div>
        <h1>Where's Maverick (A photo tagging Game)</h1>
        <p>Try to find Maverick, Ice Man and Wizard as soon as possible !</p>
      </div>

      <div>
        <button onClick={() => userSelections("correctSelection")}>
          Change Color
        </button>
        <figure className={cssColorChange}>
          <img
            className="characterImages"
            src={maverickPic}
            alt="Maverick Picture"
          />
          <figcaption>
            <strong>Maverick</strong>
          </figcaption>
        </figure>
        <figure className={cssColorChange}>
          <img
            className="characterImages"
            src={iceManPic}
            alt="Ice Man Picture"
          />
          <figcaption>
            <strong>Ice Man</strong>
          </figcaption>
        </figure>

        <figure className={cssColorChange}>
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
          useMap="#lookupMap"
          onClick={handleImageClick}
          ref={imgRef}
        />
        <map name="lookupMap">
          <area
            shape="rect"
            coords="624, 240,633, 267 "
            onClick={() => userSelections("correctSelection")}
          ></area>
        </map>
      </div>
    </div>
  );
}

export default Game;
