import React from "react";
import { MdSchool } from "react-icons/md";
import "./css/TodoHeader.css";

const TodoHeader = () => {
  return (
    <div className="todo-header-container">
      <div className="todo-header">
        <h1>School</h1>
        <MdSchool />
      </div>
      <p>5 Tasks</p>
    </div>
  );
};

export default TodoHeader;
