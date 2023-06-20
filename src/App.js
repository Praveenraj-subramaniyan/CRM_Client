import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Lead from "./Pages/Lead";
import Services from "./Pages/Services";
import AddUser from "./Pages/AddUser";
import ForgetPassword from "./Pages/ForgetPassword";
import NewPassword  from"./Pages/NewPassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lead" element={<Lead />} />
          <Route path="/services" element={<Services />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/resetPassword" element={<ForgetPassword />} />
          <Route path="/newPassword" element={<NewPassword />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
