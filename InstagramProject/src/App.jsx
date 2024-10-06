import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login"; 
import { Register } from "./pages/Register";


function App() {
 
  return (
    <>

      <Routes>
        <Route path="/*" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
