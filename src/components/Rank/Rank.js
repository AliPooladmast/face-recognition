import React from "react";
import "./Rank.css";

const Rank = (props) => {
  const { faceNumber } = props;
  return (
    <div className="rank">
      <div className="user">{"Dear User, Welcome"}</div>
      <div className="facenumber">{`${faceNumber} faces detected`}</div>
    </div>
  );
};

export default Rank;
