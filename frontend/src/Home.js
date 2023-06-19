import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import Welcome from "./components/Welcome";
import PrioritySlider from "./components/PrioritySlider";
import CategoryCard from "./components/CategoryCard";
import { BsPlusSquareFill } from "react-icons/bs";

const Home = () => {
  const { loggedUser } = useContext(UserContext);
  const [categories, setCategories] = useState([]);

  const fetchCategoryData = async () => {
    const result = await axios.get("http://localhost:4000/categories", {
      user: loggedUser,
    });
    setCategories(result.data);
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <>
      <Welcome />
      <PrioritySlider />
      <section className="category-container">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            title={category.title}
            tasks={category.todos.length}
          />
        ))}
      </section>
      <div className="add-category">
        <BsPlusSquareFill />
      </div>
    </>
  );
};

export default Home;
