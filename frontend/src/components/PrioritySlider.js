import React, { useContext, useEffect, useState } from "react";
import "./css/PrioritySlider.css";
import CategoryCard from "./CategoryCard";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const PrioritySlider = () => {
  const [sliderPosition, setSliderPosition] = useState(1);
  const { userData } = useContext(UserContext);
  const [sliderValue, setSliderValue] = useState("Low");

  const clickPriorityHandler = async (e) => {
    if (e.target.textContent === "Low") {
      setSliderPosition(1);
      setSliderValue("Low");
    }
    if (e.target.textContent === "Medium") {
      setSliderPosition(2);
      setSliderValue("Medium");
    }
    if (e.target.textContent === "Urgent") {
      setSliderPosition(3);
      setSliderValue("Urgent");
    }
  };

  return (
    <>
      <section id="priority">
        <div className="slider">
          <ul>
            <li
              className="category-label"
              onClick={clickPriorityHandler}
              value="Low"
            >
              <span>Low</span>
              <span className="category-label-num">
                {userData.todos.filter((x) => x.status === "Low").length}
              </span>
            </li>
            <li className="category-label" onClick={clickPriorityHandler}>
              <span>Medium</span>
              <span className="category-label-num">
                {userData.todos.filter((x) => x.status === "Medium").length}
              </span>
            </li>
            <li className="category-label" onClick={clickPriorityHandler}>
              <span>Urgent</span>
              <span className="category-label-num">
                {userData.todos.filter((x) => x.status === "Urgent").length}
              </span>
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
      <section className="category-container">
        {userData.categories.length > 0 &&
          userData.categories.map(
            (category) =>
              userData.categories
                .filter((cat) => category.title === cat.title)[0]
                .todos.filter((todo) => todo.status === sliderValue).length >
                0 && (
                <CategoryCard
                  key={category._id}
                  title={category.title}
                  tasks={
                    userData.categories
                      .filter((cat) => category.title === cat.title)[0]
                      .todos.filter((todo) => todo.status === sliderValue)
                      .length
                  }
                  id={category._id}
                />
              )
          )}
        {userData.categories.length === 0 && <div>None exist</div>}
      </section>
    </>
  );
};

export default PrioritySlider;
