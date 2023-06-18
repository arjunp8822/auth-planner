import React, { useState } from "react";
import "./css/CategoryCard.css";
import { MdSchool } from "react-icons/md";
import { Link } from "react-router-dom";

const CategoryCard = () => {
  const [progress, setProgress] = useState(0);
  // need to add functionality above based on completeness
  return (
    <Link to="/todos" className="category-card">
      <div className="progress-bar">
        <div className="progress"></div>
      </div>
      <div className="category-box">
        <div className="category-icon">
          <MdSchool />
        </div>
        <div className="category-text">
          <h5>School</h5>
          <p>5 Tasks</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
