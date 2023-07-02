import React from "react";
import "./css/ProgressBar.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar = (props) => {
  const percentage = props.progress;
  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      className="progress"
      styles={{
        text: {
          fill: "#24252c",
          fontSize: "23px",
        },
        path: {
          stroke: `#5f33e1`,
        },
        trail: {
          stroke: "#ede8ff",
        },
      }}
    />
  );
};

export default ProgressBar;
