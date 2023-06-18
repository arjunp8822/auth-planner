import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <div className="logo">
          <h1>Logo</h1>
        </div>
      </Link>
      <ul className="menu">
        <Link to="/register">
          <li>Register</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
