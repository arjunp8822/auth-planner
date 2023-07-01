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
  const [userCategories, setUserCategories] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [editCategory, setEditCategory] = useState(false);
  const [detectProgressUpdate, setDetectProgressUpdate] = useState(false);

  const getLoggedIn = async () => {
    const result = await axios.get("http://localhost:4000/loggedin");
    const userInfo = await axios.get("http://localhost:4000/test");
    setLoggedUser(result.data.user);
    setLoggedIn(true);
    if (userInfo.data[0]) {
      setUserCategories(userInfo.data[0].categories);
      setUserTodos(userInfo.data[0].todos);
    } else {
      setUserCategories([]);
      setUserTodos([]);
    }
    setLoading(false);
  };

  const updateProgress = async () => {
    const userInfo = await axios.get("http://localhost:4000/test");
    if (userInfo.data[0]) {
      userInfo.data[0].categories.forEach((cat) => {
        const complete = cat.todos.filter(
          (todo) => todo.isComplete === true
        ).length;
        const total = cat.todos.length;
        const categoryData = {
          title: cat.title,
          complete: Math.floor((complete / total) * 100),
        };
      });
    }
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  useEffect(() => {
    updateProgress();
  }, [detectProgressUpdate]);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <UserContext.Provider
            className="App"
            value={{
              loggedUser,
              setLoggedUser,
              loggedIn,
              getLoggedIn,
              setLoggedIn,
              authLoading,
              setAuthLoading,
              userCategories,
              userTodos,
              setUserCategories,
              setUserTodos,
              editCategory,
              setEditCategory,
              detectProgressUpdate,
              setDetectProgressUpdate,
            }}
          >
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/newtask" element={<CreateTodo />} />
              <Route path="/newcategory" element={<CreateCategory />} />
              <Route path="/todos/:category_id" element={<Todo />} />
            </Routes>
          </UserContext.Provider>
        </>
      )}
    </>
  );
}

export default App;
