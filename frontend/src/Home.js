import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import PrioritySlider from "./components/PrioritySlider";

const Home = () => {
  // const [username, setUsername] = useState(null);
  // const [password, setPassword] = useState(null);
  // const { loggedUser, setLoggedUser } = useContext(UserContext);

  // const [category, setCategory] = useState(null);

  // const [todoTitle, setTodoTitle] = useState(null);
  // const [todoStatus, setTodoStatus] = useState(null);
  // const [todoCategory, setTodoCategory] = useState(null);

  // useEffect(() => {
  //   const getTodos = async () => {
  //     const response = await axios.get("http://localhost:4000/todos");
  //     console.log(response.data.message);
  //   };
  //   getTodos();
  // }, []);

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const userData = {
  //       username: username,
  //       password: password,
  //     };
  //     const response = await axios.post(
  //       "http://localhost:4000/login",
  //       userData
  //     );
  //     setLoggedUser(response.data.user);
  //   } catch (e) {
  //     console.log(e.response.data.message);
  //   }
  // };

  // const logoutHandler = async (e) => {
  //   e.preventDefault();
  //   const response = await axios.get("http://localhost:4000/logout");
  //   console.log(response.data.message);
  // };

  // const CategorySubmitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const categoryData = {
  //       title: category,
  //       user: loggedUser,
  //     };
  //     const catoryResponse = await axios.post(
  //       "http://localhost:4000/categories/create",
  //       categoryData
  //     );
  //   } catch (e) {
  //     console.log(e.response.data.message);
  //   }
  // };

  // const TodoSubmitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const TodoData = {
  //       title: todoTitle,
  //       status: todoStatus,
  //       category: todoCategory,
  //       user: loggedUser,
  //     };
  //     const catoryResponse = await axios.post(
  //       "http://localhost:4000/todos/create",
  //       TodoData
  //     );
  //   } catch (e) {
  //     console.log(e.response.data.message);
  //   }
  // };

  return (
    <>
      <Navbar />
      <Welcome />
      <PrioritySlider />
      {/* <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <button onClick={logoutHandler}>Log Out</button>
      {loggedUser && <div>{loggedUser}</div>}

      <form onSubmit={CategorySubmitHandler}>
        <input
          type="text"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <button>Submit</button>
      </form>

      <form onSubmit={TodoSubmitHandler}>
        <input
          type="text"
          placeholder="Todo"
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status"
          onChange={(e) => setTodoStatus(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          onChange={(e) => setTodoCategory(e.target.value)}
        />
        <button>Submit</button>
      </form> */}
    </>
  );
};

export default Home;
