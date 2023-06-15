import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
    };
    const response = await axios.post("http://localhost:4000/login", userData);
    console.log(response.data.message);
  };

  return (
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
  );
};

export default Form;
