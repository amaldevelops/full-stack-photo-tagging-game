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

  const [coords, setCoords] = useState(null);
  const [normalizedCoords, setNormalizedCoords] = useState({
    x: 0,
    y: 0,
  });

  const imgRef = useRef(null);

  // Store mavericks's normalized coordinates based on original image dimensions (1920x1080)
  // These are the coordinates for maverick when the image is at full resolution.
  const maverickNormalized = {
    x: 1100 / 1920, // 1100px / 1920px width of the image
    y: 380 / 1080, // 380px / 1080px height of the image
  };

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

  function userSelections(cssClassName) {
    SetCssColorChange(cssClassName);
  }

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
    console.log(`Normalized Click Coordinates: (${normalizedX}, ${normalizedY})`);

    // Check if the user clicked near mavericks's normalized position
    const tolerance = 0.05; // Tolerance for "near" (5% of image size)
    if (
      Math.abs(normalizedX - maverickNormalized.x) < tolerance &&
      Math.abs(normalizedY - maverickNormalized.y) < tolerance
    ) {
      console.log("You found maverick!");
    } else {
      console.log("Try again!");
    }
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
            <p>
              Normalized Coordinates X:{normalizedCoords.x} Y:{normalizedCoords.y}
            </p>
          </div>
        )}
      </div>
      <div>
        <h1>Where's Maverick (A photo tagging Game)</h1>
        <p>Try to find Maverick, Ice Man, and Wizard as soon as possible!</p>
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
          alt="Where's Maverick"
          useMap="#lookupMap"
          onClick={handleImageClick}
          ref={imgRef}
        />
        <map name="lookupMap">
          <area
            shape="rect"
            coords="624, 240,633, 267"
            onClick={() => userSelections("correctSelection")}
          ></area>
        </map>
      </div>
    </div>
  );
}

export default Game;
