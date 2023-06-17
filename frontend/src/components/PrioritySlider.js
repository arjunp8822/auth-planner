import React, { useState } from "react";
import "./css/PrioritySlider.css";

const PrioritySlider = () => {
  const [sliderPosition, setSliderPosition] = useState(1);
  return (
    <section id="priority">
      <div className="slider">
        <ul>
          <li onClick={() => setSliderPosition(1)}>LOW</li>
          <li onClick={() => setSliderPosition(2)}>MEDIUM</li>
          <li onClick={() => setSliderPosition(3)}>URGENT</li>
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
