import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = (props) => {
  const { onInputChange, onButtonClick } = props;
  return (
    <div className="container">
      <p className="imageLink__text">
        {
          "Please enter the picture link here so that the AI recognize the faces"
        }
      </p>
      <div className="input-group">
        <input
          type="text"
          className="input"
          placeholder="Paste here"
          onChange={onInputChange}
        />
        <button className="btn btn--primary" onClick={onButtonClick}>
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
