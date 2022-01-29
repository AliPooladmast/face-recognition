import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt4">
        <img
          id="inputImage"
          src={imageURL}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className="boundingBox"
          style={{
            bottom: box.bottomRow,
            left: box.leftCol,
            right: box.rightCol,
            top: box.topRow,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
