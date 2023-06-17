import React from "react";
import "./css/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <ul className="menu">
        <li>Register</li>
        <li>Login</li>
      </ul>
    </nav>
  );
};

export default Navbar;
