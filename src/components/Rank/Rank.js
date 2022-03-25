import React from "react";
import "./Rank.css";

const Rank = (props) => {
  const { faceNumber, name } = props;
  return (
    <div className="rank">
      <div className="user">{`Dear ${name}, Welcome`}</div>
      <div className="facenumber">{`${faceNumber} faces detected`}</div>
    </div>
  );
};

export default Rank;
