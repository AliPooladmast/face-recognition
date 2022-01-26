import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonClick }) => {
  return (
    <div className="f3">
      <p>{"The magic brain will detect faces in your pictures"}</p>
      <div className="center">
        <div class="form pa4 br3 shadow-5 center">
          <input
            class="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            class="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
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
