import React, { useState } from "react";
import "./css/TodoCard.css";
import { BsCheck2 } from "react-icons/bs";

const TodoCard = (props) => {
  const [checkboxState, setCheckboxState] = useState(false);
  return (
    <div className="todocard">
      <div
        className={checkboxState ? "clicked" : "checkbox"}
        onClick={() => setCheckboxState(!checkboxState)}
      >
        {checkboxState && <BsCheck2 />}
      </div>
      <p className={checkboxState ? "todo-text complete" : "todo-text"}>
        {props.title}
      </p>
    </div>
  );
};

export default TodoCard;
