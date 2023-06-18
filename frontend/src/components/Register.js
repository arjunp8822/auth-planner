import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./css/Login.css";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setpasswordVerify] = useState("");
  const [errorState, setErrorState] = useState(null);
  const { setLoggedUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const registerData = {
        username: username,
        password: password,
        passwordVerify: passwordVerify,
      };
      const result = await axios.post(
        "http://localhost:4000/auth/register",
        registerData
      );
      setLoggedUser(result.data);
      navigate("/");
    } catch (e) {
      setErrorState(e.response.data.errorMessage);
    }
  };

  return (
    <section id="login">
      <div className="container login-container">
        <div className="login-box">
          <h1>Create a new account</h1>
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
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setpasswordVerify(e.target.value)}
              value={passwordVerify}
            />
            <div className="login-error">{errorState}</div>
            <button type="submit">Register</button>
          </form>
          <div className="register-container">
            <span>Already have an account?</span>
            <Link to="/login" className="sign-up">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
