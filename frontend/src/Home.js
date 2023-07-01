import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import Welcome from "./components/Welcome";
import PrioritySlider from "./components/PrioritySlider";
import { BsPlusSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

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
    </>
  );
};

export default Home;
