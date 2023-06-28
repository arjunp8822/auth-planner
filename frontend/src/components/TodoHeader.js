import React from "react";
import { MdSchool } from "react-icons/md";
import "./css/TodoHeader.css";

const TodoHeader = (props) => {
  return (
    <div className="todo-header-container">
      <div className="todo-header">
        <h1>{props.title}</h1>
        <MdSchool />
      </div>
      {props.tasks === 1 ? (
        <p>{props.tasks} Task</p>
      ) : (
        <p>{props.tasks} Tasks</p>
      )}
    </div>
  );
};

export default TodoHeader;
