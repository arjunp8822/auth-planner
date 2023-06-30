import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Navbar = () => {
  const { loggedUser, setLoggedUser, getLoggedIn, setLoggedIn } =
    useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await axios.get("http://localhost:4000/logout");
    setLoggedUser(undefined);
    setLoggedIn(undefined);
    await getLoggedIn();
    navigate("/");
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <nav>
      <Link to="/">
        <div className="logo">
          <h1>Logo</h1>
        </div>
      </Link>
      <ul className="menu">
        {loggedUser === undefined && (
          <>
            <Link to="/register">
              <li>Register</li>
            </Link>
            <Link to="/login">
              <li>Login</li>
            </Link>
          </>
        )}
        {loggedUser && (
          <>
            <li>{loggedUser}</li>
            <li onClick={logoutHandler}>Log Out</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
