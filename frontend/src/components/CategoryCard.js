import React, { useContext, useEffect, useState } from "react";
import "./css/CategoryCard.css";
import { MdSchool, MdWork, MdHome } from "react-icons/md";
import { RiTodoFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const CategoryCard = (props) => {
  const [progress, setProgress] = useState(0);

  return (
    <Link to="/todos" className="category-card">
      <div className="progress-bar">
        <div className="progress"></div>
      </div>
      <div className="category-box">
        <div className="category-icon">
          {props.title.toUpperCase() === "WORK" ? (
            <MdWork />
          ) : props.title.toUpperCase() === "HOME" ? (
            <MdHome />
          ) : props.title.toUpperCase() === "SCHOOL" ? (
            <MdSchool />
          ) : (
            <RiTodoFill />
          )}
        </div>
        <div className="category-text">
          <h5>{props.title}</h5>
          {props.tasks === 0 ? (
            <p>{props.tasks} Tasks</p>
          ) : props.tasks === 1 ? (
            <p>{props.tasks} Task</p>
          ) : (
            <p>{props.tasks} Tasks</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
