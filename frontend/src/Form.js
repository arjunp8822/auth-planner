import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const getTodos = async () => {
      const response = await axios.get("http://localhost:4000/todos");
      console.log(response.data.message);
    };
    getTodos();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
    };
    const response = await axios.post("http://localhost:4000/login", userData);
    console.log(response.data.message);
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
    </>
  );
};

export default Form;
