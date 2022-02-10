import React from "react";
import "./Rank.css";

const Rank = (props) => {
  const { faceNumber } = props;
  console.log(faceNumber);
  return (
    <div className="rank">
      <div className="  f2">{"Dear User, Welcome"}</div>
      <div className="  f3">{`${faceNumber} faces is detected`}</div>
    </div>
  );
};

export default Rank;
