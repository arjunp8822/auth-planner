import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./context/UserContext";

const Form = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  useEffect(() => {
    const getTodos = async () => {
      const response = await axios.get("http://localhost:4000/todos");
      console.log(response.data.message);
    };
    getTodos();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username: username,
        password: password,
      };
      const response = await axios.post(
        "http://localhost:4000/login",
        userData
      );
      setLoggedUser(response.data.user);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:4000/logout");
    console.log(response.data.message);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
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
    </>
  );
};

export default Form;
