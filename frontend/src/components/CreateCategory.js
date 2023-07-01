import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/CreateTodo.css";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const CreateCategory = () => {
  const { loggedUser } = useContext(UserContext);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const CreateCategory = async () => {
    const postCategory = await axios.post(
      "http://localhost:4000/categories/create",
      {
        title: category,
        user: loggedUser,
      }
    );
    const postTodo = await axios.post("http://localhost:4000/todos/create", {
      title: "Enter your first task",
      status: "Low",
      category: category,
      user: loggedUser,
    });
    navigate("/");
    window.location.reload(false);
  };

  return (
    <section id="create-todo">
      <h1>Add new category</h1>
      <input
        type="text"
        placeholder="E.g. Wash the clothes"
        onChange={(e) => setCategory(e.target.value)}
      />
      <form>
        <div className="create-todo-button" onClick={CreateCategory}>
          Add Category
        </div>
      </form>
    </section>
  );
};

export default CreateCategory;
