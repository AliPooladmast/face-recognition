import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = React.forwardRef((props, ref) => {
  const { imageURL, boxState } = props;
  const boxRectangles = boxState.map((item) => (
    <div
      className="boundingBox"
      style={{
        bottom: item.bottomRow,
        left: item.leftCol,
        right: item.rightCol,
        top: item.topRow,
      }}
    ></div>
  ));
  return (
    <div className="center ma">
      <div className="absolute mt4">
        <img
          id="inputImage"
          src={imageURL}
          alt=""
          width="500px"
          height="auto"
          ref={ref}
        />
        <div>{boxRectangles}</div>
      </div>
    </div>
  );
});

export default FaceRecognition;
