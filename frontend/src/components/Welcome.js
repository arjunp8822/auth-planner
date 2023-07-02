import React, { useContext } from "react";
import "./css/Welcome.css";
import { UserContext } from "../context/UserContext";

const Welcome = () => {
  const { loggedUser } = useContext(UserContext);
  return (
    <section id="welcome">
      {loggedUser && (
        <h3>
          Hey <span>{loggedUser}</span>, these are your tasks.
        </h3>
      )}
      {!loggedUser && <h1>Please log in to see your tasks.</h1>}
    </section>
  );
};

export default Welcome;
