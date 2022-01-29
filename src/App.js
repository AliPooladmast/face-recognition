import React, { Component } from "react";
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

const app = new Clarifai.App({
  apiKey: "5e6f5b8dcac84dff84f9c84ab458d8ab",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: "www",
      isSignedIn: false,
    };
  }

  onInputChange = (event) => {
    this.setState({ imageURL: event.target.value });
  };

  boxCoordinates = (data) => {
    const boundingBox =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: boundingBox.left_col * width,
      topRow: boundingBox.top_row * height,
      rightCol: width - boundingBox.right_col * width,
      bottomRow: height - boundingBox.bottom_row * height,
    };
  };

  displayBox = (box) => {
    this.setState({ box: box });
    console.log(box);
  };

  onButtonClick = () => {
    console.log("click");

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.imageURL)
      .then((response) => this.displayBox(this.boxCoordinates(response)))
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    route === "home"
      ? this.setState({ isSignedIn: true })
      : this.setState({ isSignedIn: false });
    this.setState({ route: route });
  };

  render() {
    const { imageURL, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <ParticlesApp />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonClick={this.onButtonClick}
            />
            <FaceRecognition imageURL={imageURL} box={box} />
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
