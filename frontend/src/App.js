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
import CreateTodo from "./components/CreateTodo";
import CreateCategory from "./components/CreateCategory";
axios.defaults.withCredentials = true;

function App() {
  const [loggedUser, setLoggedUser] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [userData, setUserData] = useState({});

  const getLoggedIn = async () => {
    const result = await axios.get("http://localhost:4000/loggedin");
    const userInfo = await axios.get("http://localhost:4000/test");
    setLoggedUser(result.data.user);
    setUserData(userInfo.data[0]);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <UserContext.Provider
      className="App"
      value={{
        loggedUser,
        setLoggedUser,
        loggedIn,
        getLoggedIn,
        userData,
        setUserData,
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newtask" element={<CreateTodo />} />
        <Route path="/newcategory" element={<CreateCategory />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
