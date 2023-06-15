import "./App.css";
import Form from "./Form";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import { useState } from "react";
axios.defaults.withCredentials = true;

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  return (
    <UserContext.Provider className="App" value={{ loggedUser, setLoggedUser }}>
      <Form />
    </UserContext.Provider>
  );
}

export default App;
