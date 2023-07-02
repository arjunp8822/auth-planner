import React, { useContext, useEffect, useState } from "react";
import "./css/PrioritySlider.css";
import CategoryCard from "./CategoryCard";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const PrioritySlider = () => {
  const { userTodos, userCategories } = useContext(UserContext);
  const [sliderValue, setSliderValue] = useState("Low");
  const [loading, setLoading] = useState(true);

  const clickPriorityHandler = async (e) => {
    if (e.target.textContent === "Low") {
      setLoading(true);
      setSliderValue("Low");
      setLoading(false);
    }
    if (e.target.textContent === "Medium") {
      setLoading(true);
      setSliderValue("Medium");
      setLoading(false);
    }
    if (e.target.textContent === "Urgent") {
      setLoading(true);
      setSliderValue("Urgent");
      setLoading(false);
    }
  };

  return (
    <>
      <section id="priority">
        <ul>
          <li
            className={
              sliderValue === "Low"
                ? "category-label-active category-label"
                : "category-label"
            }
            onClick={clickPriorityHandler}
            value="Low"
          >
            <span>Low</span>
            <span className="category-label-num">
              {userTodos.filter((x) => x.status === "Low").length}
            </span>
          </li>
          <li
            className={
              sliderValue === "Medium"
                ? "category-label-active category-label"
                : "category-label"
            }
            onClick={clickPriorityHandler}
          >
            <span>Medium</span>
            <span className="category-label-num">
              {userTodos.filter((x) => x.status === "Medium").length}
            </span>
          </li>
          <li
            className={
              sliderValue === "Urgent"
                ? "category-label-active category-label"
                : "category-label"
            }
            onClick={clickPriorityHandler}
          >
            <span>Urgent</span>
            <span className="category-label-num">
              {userTodos.filter((x) => x.status === "Urgent").length}
            </span>
          </li>
        </ul>
      </section>

      <section className="category-container">
        {loading ? (
          <div>Loading</div>
        ) : (
          userCategories.length > 0 &&
          userCategories.map(
            (category) =>
              userCategories
                .filter((cat) => category.title === cat.title)[0]
                .todos.filter((todo) => todo.status === sliderValue).length >
                0 && (
                <CategoryCard
                  key={category._id}
                  title={category.title}
                  tasks={
                    userCategories
                      .filter((cat) => category.title === cat.title)[0]
                      .todos.filter((todo) => todo.status === sliderValue)
                      .length
                  }
                  taskArray={userCategories
                    .filter((cat) => category.title === cat.title)[0]
                    .todos.filter((todo) => todo.status === sliderValue)}
                  id={category._id}
                />
              )
          )
        )}
        {userCategories.length === 0 && (
          <div>Add your first category below!</div>
        )}
      </section>
    </>
  );
};

export default PrioritySlider;
