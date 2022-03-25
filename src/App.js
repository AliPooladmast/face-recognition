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
  const [imageURL, setImageURL] = useState(
    "https://static.techspot.com/images2/news/bigimage/2020/06/2020-06-08-image-8.jpg"
  );
  const [boxState, setBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState("false");
  const [faceNumber, setFaceNumber] = useState(0);
  const [detectClick, setDetectClick] = useState("false");
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    enteries: 0,
    joined: "",
  });
  const imageRef = useRef();

  const onInputChange = (event) => {
    setImageURL(event.target.value);
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
    setFaceNumber(boxes.length);
    setBoxes(boxes);
  };

  const onButtonClick = () => {
    setDetectClick((state) => !state);
  };

  const onRouteChange = (route) => {
    route === "home" ? setIsSignedIn(true) : setIsSignedIn(false);
    setRoute(route);
  };

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      enteries: data.enteries,
      joined: data.joined,
    });
  };

  useEffect(() => {
    // app.models
    //   .predict(Clarifai.FACE_DETECT_MODEL, imageURL)
    //   .then((response) => boxCoordinates(response))
    //   .catch((err) => console.log(err));
  }, [detectClick]);

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
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
