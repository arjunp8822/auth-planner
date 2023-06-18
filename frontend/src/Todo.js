import React from "react";
import TodoHeader from "./components/TodoHeader";
import TodoCard from "./components/TodoCard";
import { BsPlusSquareFill } from "react-icons/bs";

const Todo = () => {
  return (
    <section id="todo">
      <TodoHeader />
      <div className="todo-content">
        <h3>Urgent</h3>
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <div className="add-todo">
          <BsPlusSquareFill />
          <p>Add new task</p>
        </div>
        <h3>Medium</h3>
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <div className="add-todo">
          <BsPlusSquareFill />
          <p>Add new task</p>
        </div>
        <h3>Low</h3>
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <div className="add-todo">
          <BsPlusSquareFill />
          <p>Add new task</p>
        </div>
      </div>
    </section>
  );
};

export default Todo;
