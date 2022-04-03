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

const initialUser = {
  id: "",
  name: "",
  email: "",
  enteries: 0,
  joined: "",
};

function App() {
  const [imageURL, setImageURL] = useState("");
  const [boxState, setBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState("false");
  const [user, setUser] = useState(initialUser);
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

    setBoxes(boxes);
    // setFaceNumber(boxes.length);

    fetch("http://localhost:3000/image", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
      }),
    })
      .then((response) => response.json())
      .then((count) => {
        setUser((user) => {
          return { ...user, enteries: count };
        });
      })
      .catch((err) => console.log(err));
  };

  const onButtonClick = () => {
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageURL,
      }),
    })
      .then((response) => response.json())
      .then((result) => boxCoordinates(result))
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    if (route === "home") {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
      setUser(initialUser);
      setImageURL("");
      setBoxes([]);
    }
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

  return (
    <div className="App">
      <ParticlesApp />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank faceNumber={user.enteries} name={user.name} />
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
        <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
