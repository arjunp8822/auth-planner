import "./App.css";
import Form from "./Form";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
