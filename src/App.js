import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesApp from "./components/ParticlesApp/ParticlesApp";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Clarifai from "clarifai";
import { useState, useRef, useEffect } from "react";

const app = new Clarifai.App({
  apiKey: "5e6f5b8dcac84dff84f9c84ab458d8ab",
});

function App() {
  const [imageURL, setImageURL] = useState("");
  const [boxState, setBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState("false");
  const imageRef = useRef();
  let faceNumber;

  const onInputChange = (event) => {
    setImageURL(event.target.value);
    // console.log(event);
  };

  const boxCoordinates = (data) => {
    const width = Number(imageRef.current.width);
    const height = Number(imageRef.current.height);

    let boundingBox;
    let boxes = [];
    data.outputs[0].data.regions.forEach((item, index) => {
      boundingBox = item.region_info.bounding_box;
      boxes[index] = {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - boundingBox.right_col * width,
        bottomRow: height - boundingBox.bottom_row * height,
      };
    });
    faceNumber = boxes.length;
    console.log(faceNumber);
    setBoxes(boxes);
  };

  const onButtonClick = () => {
    // console.log("click");

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, imageURL)
      .then((response) => boxCoordinates(response))
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    route === "home" ? setIsSignedIn(true) : setIsSignedIn(false);
    setRoute(route);
  };

  return (
    <div className="App">
      <ParticlesApp />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank faceNumber={faceNumber} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonClick={onButtonClick}
          />
          <FaceRecognition
            imageURL={imageURL}
            boxState={boxState}
            ref={imageRef}
          />
        </div>
      ) : route === "signin" ? (
        <SignIn onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
