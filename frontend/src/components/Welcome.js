import React, { useContext } from "react";
import "./css/Welcome.css";
import { UserContext } from "../context/UserContext";

const Welcome = () => {
  const { loggedUser } = useContext(UserContext);
  return (
    <section id="welcome">
      {loggedUser && (
        <h1>
          Hey <span>{loggedUser}</span>, this is your to-do list.
        </h1>
      )}
      {!loggedUser && <h1>Please log in to see your tasks.</h1>}
    </section>
  );
};

export default Welcome;
