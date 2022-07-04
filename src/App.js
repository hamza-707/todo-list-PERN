import Login from "./components/Login";
import Registeration from "./components/Registeration";
import TodoList from "./components/TodoList";
import Navbar from "./components/UI/Navbar";
import Report from "./components/Report";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registeration />} />
        <Route
          path="/home/:user_id"
          element={
            <>
              <Navbar />
              <TodoList />
            </>
          }
        />
        <Route
          path="/report/:user_id"
          element={
            <>
              <Navbar />
              <Report />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
