import React, { useEffect, useState } from "react";
import TodoHeader from "./components/TodoHeader";
import TodoCard from "./components/TodoCard";
import { BsPlusSquareFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";

const Todo = () => {
  const { category_id } = useParams();
  const [categoryData, setCategoryData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/categories/${category_id}`
      );
      const data = await response.data;
      setCategoryData(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="todo">
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <TodoHeader
            title={categoryData.title}
            tasks={categoryData.todos.length}
          />
          <div className="todo-content">
            <h3>Urgent</h3>
            {categoryData.todos
              .filter((x) => x.status === "Urgent")
              .map((todo) => (
                <TodoCard title={todo.title} />
              ))}
            <div className="add-todo">
              <BsPlusSquareFill />
              <p>Add new task</p>
            </div>
            <h3>Medium</h3>
            {categoryData.todos
              .filter((x) => x.status === "Medium")
              .map((todo) => (
                <TodoCard title={todo.title} />
              ))}
            <div className="add-todo">
              <BsPlusSquareFill />
              <p>Add new task</p>
            </div>
            <h3>Low</h3>
            {categoryData.todos
              .filter((x) => x.status === "Low")
              .map((todo) => (
                <TodoCard title={todo.title} />
              ))}
            <div className="add-todo">
              <BsPlusSquareFill />
              <p>Add new task</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Todo;
