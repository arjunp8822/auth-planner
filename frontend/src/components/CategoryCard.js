import React, { useContext, useEffect, useState } from "react";
import "./css/CategoryCard.css";
import { MdSchool, MdWork, MdHome } from "react-icons/md";
import { RiTodoFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const CategoryCard = (props) => {
  const [progress, setProgress] = useState(0);
  const { editCategory } = useContext(UserContext);

  const deleteCategoryHandler = async (e) => {
    e.preventDefault();
    const id = props.id;
    const categoryResponse = await axios.get(
      `http://localhost:4000/categories/${id}`
    );
    const todos = await categoryResponse.data.todos;
    todos.forEach(async (todo) => {
      const deleteTodo = await axios.delete(
        `http://localhost:4000/todos/${todo._id}`
      );
      console.log(deleteTodo);
    });
    const deleteCategory = await axios.delete(
      `http://localhost:4000/todos/${id}`
    );
    window.location.reload(false);
  };

  return (
    <Link to={`/todos/${props.id}`} className="category-card">
      {editCategory && (
        <button className="delete-category" onClick={deleteCategoryHandler}>
          X
        </button>
      )}
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
