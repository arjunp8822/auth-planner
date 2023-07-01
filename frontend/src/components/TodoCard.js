import React, { useContext, useEffect, useState } from "react";
import "./css/TodoCard.css";
import { BsCheck2 } from "react-icons/bs";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const TodoCard = (props) => {
  const [checkboxState, setCheckboxState] = useState(props.isComplete);
  const [editState, setEditState] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const { detectProgressUpdate, setDetectProgressUpdate } =
    useContext(UserContext);

  const deleteHandler = async (e) => {
    const id = props.id;
    await axios.delete(`http://localhost:4000/todos/${id}`);
    window.location.reload(false);
  };

  const editHandler = async (e) => {
    setEditState(true);
  };

  const editSubmit = async (e) => {
    const id = props.id;
    const newTitle = editTitle === "" ? props.title : editTitle;
    await axios.put(`http://localhost:4000/todos/${id}`, {
      title: newTitle,
      isComplete: checkboxState,
    });
    setEditState(false);
    window.location.reload(false);
  };

  const updateCheckbox = async () => {
    const id = props.id;
    const response = await axios.put(`http://localhost:4000/todos/${id}`, {
      title: props.title,
      isComplete: !checkboxState,
    });
    setCheckboxState(!checkboxState);
    setDetectProgressUpdate(!detectProgressUpdate);
  };

  useEffect(() => {}, [checkboxState, editState]);

  return (
    <div className="todocard">
      <div className="todocard-text">
        <div
          className={checkboxState ? "clicked" : "checkbox"}
          onClick={updateCheckbox}
        >
          {checkboxState && <BsCheck2 />}
        </div>
        {editState ? (
          <input
            className={
              checkboxState
                ? "todo-text complete todo-text-input"
                : "todo-text todo-text-input"
            }
            placeholder={props.title}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        ) : (
          <p
            className={checkboxState ? "todo-text complete" : "todo-text"}
            onClick={editHandler}
          >
            {props.title}
          </p>
        )}
      </div>
      <div className="todocard-button-container">
        {editState && (
          <button onClick={editSubmit} className="edit-button">
            Save
          </button>
        )}
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

export default TodoCard;
