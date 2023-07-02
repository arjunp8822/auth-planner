import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import Welcome from "./components/Welcome";
import PrioritySlider from "./components/PrioritySlider";
import { useNavigate } from "react-router-dom";
import BannerImg from "./assets/banner-removebg.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const { loggedUser, editCategory, setEditCategory } = useContext(UserContext);
  const [todoPriority, setTodoPriority] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchTodoData = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const editCategoryHandler = async () => {
    setEditCategory(!editCategory);
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

  const newCategory = () => {
    navigate("/newcategory");
  };

  return (
    <>
      <section id="banner">
        <img src={BannerImg} alt="banner-img" className="banner-img" />
        <div className="banner-text">
          <h3>Task Management & To-Do List</h3>
          <p>
            This productive tool is designed to help you better manage your
            tasks conveniently!
          </p>
          <button className="start-button">
            <a href="#home">
              <p>Lets Start</p>
              <FaLongArrowAltRight />
            </a>
          </button>
        </div>
      </section>

      <section id="home">
        {loading ? (
          <div>Loading</div>
        ) : (
          <>
            <Welcome />
            {loggedUser && (
              <>
                <PrioritySlider priority={todoPriority} />
              </>
            )}
            {loggedUser && (
              <div className="category-button-container">
                <button className="add-category" onClick={newCategory}>
                  +
                </button>
                <button onClick={editCategoryHandler}>
                  {editCategory ? "Done" : "Edit"}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
