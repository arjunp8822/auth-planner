import "./App.css";
import Home from "./Home";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Todo from "./Todo";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
axios.defaults.withCredentials = true;

function App() {
  const [loggedUser, setLoggedUser] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(undefined);

  const getLoggedIn = async () => {
    const result = await axios.get("http://localhost:4000/loggedin");
    setLoggedUser(result.data.user);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <UserContext.Provider
      className="App"
      value={{ loggedUser, setLoggedUser, loggedIn, getLoggedIn }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
