import React, { useContext, useEffect, useState } from "react";
import TodoHeader from "./components/TodoHeader";
import TodoCard from "./components/TodoCard";
import { BsPlusSquareFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./context/UserContext";

const Todo = () => {
  const { category_id } = useParams();
  const [categoryData, setCategoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [urgentInput, setUrgentInput] = useState("");
  const [mediumInput, setMediumInput] = useState("");
  const [lowInput, setLowInput] = useState("");
  const { loggedUser } = useContext(UserContext);

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

  const createUrgentSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      title: urgentInput,
      status: e.target.value,
      category: categoryData.title,
      user: loggedUser,
    };
    await axios.post(`http://localhost:4000/todos/create`, data);
    setUrgentInput("");
    window.location.reload(false);
  };

  const createMediumSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      title: mediumInput,
      status: e.target.value,
      category: categoryData.title,
      user: loggedUser,
    };
    await axios.post(`http://localhost:4000/todos/create`, data);
    setMediumInput("");
    window.location.reload(false);
  };

  const createLowSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      title: lowInput,
      status: e.target.value,
      category: categoryData.title,
      user: loggedUser,
    };
    await axios.post(`http://localhost:4000/todos/create`, data);
    setLowInput("");
    window.location.reload(false);
  };

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
                <TodoCard
                  title={todo.title}
                  id={todo._id}
                  isComplete={todo.isComplete}
                />
              ))}
            <div>
              <form className="add-todo">
                <button onClick={createUrgentSubmitHandler} value="Urgent">
                  +
                </button>
                <input
                  placeholder="Add urgent task"
                  onChange={(e) => setUrgentInput(e.target.value)}
                  value={urgentInput}
                />
              </form>
            </div>
            <h3>Medium</h3>
            {categoryData.todos
              .filter((x) => x.status === "Medium")
              .map((todo) => (
                <TodoCard
                  title={todo.title}
                  id={todo._id}
                  isComplete={todo.isComplete}
                />
              ))}
            <form className="add-todo">
              <button onClick={createMediumSubmitHandler} value="Medium">
                +
              </button>
              <input
                placeholder="Add medium task"
                onChange={(e) => setMediumInput(e.target.value)}
                value={mediumInput}
              />
            </form>
            <h3>Low</h3>
            {categoryData.todos
              .filter((x) => x.status === "Low")
              .map((todo) => (
                <TodoCard
                  title={todo.title}
                  id={todo._id}
                  isComplete={todo.isComplete}
                />
              ))}
            <form className="add-todo">
              <button onClick={createLowSubmitHandler} value="Low">
                +
              </button>
              <input
                placeholder="Add low task"
                onChange={(e) => setLowInput(e.target.value)}
                value={lowInput}
              />
            </form>
          </div>
        </>
      )}
    </section>
  );
};

export default Todo;
