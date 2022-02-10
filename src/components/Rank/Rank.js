import React from "react";
import "./Rank.css";

const Rank = (props) => {
  const { faceNumber } = props;
  return (
    <div className="rank">
      <div className="  f2">{"Dear User, Welcome"}</div>
      <div className="  f3">{`# faces is detected`}</div>
    </div>
  );
};

export default Rank;
