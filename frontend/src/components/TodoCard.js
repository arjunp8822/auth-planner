import React, { useState } from "react";
import "./css/TodoCard.css";
import { BsCheck2 } from "react-icons/bs";
import axios from "axios";

const TodoCard = (props) => {
  const [checkboxState, setCheckboxState] = useState(false);

  const deleteHandler = async (e) => {
    const id = props.id;
    await axios.delete(`http://localhost:4000/todos/${id}`);
    window.location.reload(false);
  };

  return (
    <div className="todocard">
      <div className="todocard-text">
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
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
};

export default TodoCard;
