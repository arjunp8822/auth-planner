import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/CreateTodo.css";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const CreateTodo = () => {
  const { loggedUser } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [todo, setTodo] = useState("");
  const navigate = useNavigate();

  const fetchCategoryData = async () => {
    const result = await axios.get("http://localhost:4000/categories", {
      user: loggedUser,
    });
    setCategories(result.data);
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const createTodo = async () => {
    const post = await axios.post("http://localhost:4000/todos/create", {
      title: todo,
      status: "Low",
      category: activeCategory,
      user: loggedUser,
    });
    navigate("/");
  };

  return (
    <section id="create-todo">
      <h1>Add new task</h1>
      <input
        type="text"
        placeholder="E.g. Wash the clothes"
        onChange={(e) => setTodo(e.target.value)}
      />
      <form>
        <div className="create-todo-container">
          {categories.length > 0 &&
            categories.map((category) => (
              <div
                onClick={() => setActiveCategory(category.title)}
                className={
                  activeCategory === category.title
                    ? "category-button button-active"
                    : "category-button"
                }
              >
                {category.title}
              </div>
            ))}
        </div>
        <div className="create-todo-button" onClick={createTodo}>
          Add task
        </div>
      </form>
    </section>
  );
};

export default CreateTodo;
