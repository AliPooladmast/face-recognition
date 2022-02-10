import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = (props) => {
  const { onInputChange, onButtonClick } = props;
  return (
    <div className="f3">
      <p className="imageLink__text">
        {
          "Please enter the picture link here so that the AI recognize the faces"
        }
      </p>
      <div className="center">
        <div className="form pa4 br3 shadow-5 center">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonClick}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
