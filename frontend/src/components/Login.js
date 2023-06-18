import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./css/Login.css";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState(null);
  const navigate = useNavigate();
  const { getLoggedIn, setLoggedUser } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        username: username,
        password: password,
      };
      const result = await axios.post(
        "http://localhost:4000/auth/login",
        loginData
      );
      setLoggedUser(result.data);
      await getLoggedIn();
      navigate("/");
    } catch (e) {
      setErrorState(e.response.data.errorMessage);
    }
  };

  const demoButton = (e) => {
    e.preventDefault();
    setUsername("Test");
    setPassword("Test12345");
  };

  return (
    <section id="login">
      <div className="container login-container">
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={submitHandler}>
            <input
              type="string"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="login-error">{errorState}</div>
            <button type="button" onClick={demoButton}>
              Use Demo Account
            </button>
            <button type="submit">Login</button>
          </form>
          <div className="register-container">
            <span>Don't have an account?</span>
            <Link to="/register" className="sign-up">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
