import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import Welcome from "./components/Welcome";
import PrioritySlider from "./components/PrioritySlider";
import CategoryCard from "./components/CategoryCard";
import { BsPlusSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loggedUser } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [todoPriority, setTodoPriority] = useState({});
  const navigate = useNavigate();

  const fetchCategoryData = async () => {
    const result = await axios.get("http://localhost:4000/categories", {
      user: loggedUser,
    });
    setCategories(result.data);
  };

  const fetchTodoData = async () => {
    const result = await axios.get("http://localhost:4000/todos", {
      user: loggedUser,
    });

    setTodoPriority({
      low: result.data.filter((todo) => {
        if (todo.status === "Low") {
          return true;
        }
        return false;
      }).length,
      medium: result.data.filter((todo) => {
        if (todo.status === "Medium") {
          return true;
        }
        return false;
      }).length,
      urgent: result.data.filter((todo) => {
        if (todo.status === "Urgent") {
          return true;
        }
        return false;
      }).length,
    });
  };

  console.log(todoPriority);

  useEffect(() => {
    fetchCategoryData();
    fetchTodoData();
  }, []);

  const newCategory = () => {
    navigate("/newcategory");
  };

  return (
    <>
      <Welcome />
      {loggedUser && (
        <>
          <PrioritySlider priority={todoPriority} />
          <section className="category-container">
            {categories.length > 0 &&
              categories.map((category) => (
                <CategoryCard
                  key={category._id}
                  title={category.title}
                  tasks={category.todos.length}
                />
              ))}
          </section>
        </>
      )}
      {loggedUser && (
        <div className="add-category" onClick={newCategory}>
          <BsPlusSquareFill />
        </div>
      )}
    </>
  );
};

export default Home;
