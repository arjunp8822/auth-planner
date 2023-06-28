import React, { useState } from "react";
import "./css/PrioritySlider.css";

const PrioritySlider = (props) => {
  const [sliderPosition, setSliderPosition] = useState(1);
  console.log(props.priority);
  return (
    <section id="priority">
      <div className="slider">
        <ul>
          <li className="category-label" onClick={() => setSliderPosition(1)}>
            <span>LOW</span>
            <span className="category-label-num">{props.priority.low}</span>
          </li>
          <li className="category-label" onClick={() => setSliderPosition(2)}>
            <span>MEDIUM</span>
            <span className="category-label-num">{props.priority.medium}</span>
          </li>
          <li className="category-label" onClick={() => setSliderPosition(3)}>
            <span>URGENT</span>
            <span className="category-label-num">{props.priority.urgent}</span>
          </li>
        </ul>
        <div
          className={
            sliderPosition === 1
              ? "slide position-one"
              : sliderPosition === 2
              ? "slide position-two"
              : sliderPosition === 3
              ? "slide position-three"
              : "slide"
          }
        ></div>
        <div className="inactive-slider"></div>
      </div>
    </section>
  );
};

export default PrioritySlider;
