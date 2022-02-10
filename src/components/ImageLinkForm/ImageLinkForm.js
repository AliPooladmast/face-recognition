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
      <div class="input-group">
        <input
          type="text"
          class="input"
          placeholder="Paste here"
          onChange={onInputChange}
        />
        <button class="btn btn--primary" onClick={onButtonClick}>
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
