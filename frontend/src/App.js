import "./App.css";
import Home from "./Home";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import { useState } from "react";
axios.defaults.withCredentials = true;

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  return (
    <UserContext.Provider className="App" value={{ loggedUser, setLoggedUser }}>
      <Home />
    </UserContext.Provider>
  );
}

export default App;
