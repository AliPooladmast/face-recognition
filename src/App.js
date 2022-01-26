import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesApp from "./components/ParticlesApp/ParticlesApp";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  };

  onButtonClick = () => {
    console.log("click");
  };

  render() {
    return (
      <div className="App">
        <ParticlesApp />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonClick={this.onButtonClick}
        />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
