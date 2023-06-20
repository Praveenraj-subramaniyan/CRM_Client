import "./App.css";
import Login from "./Pages/Login";
import ForgetPassword from "./Pages/ForgetPassword";
import Home from "./Pages/Home";
import Lead from "./Pages/Lead";
import Services from "./Pages/Services";
import AddUser from "./Pages/AddUser";
import Contacts from "./Pages/Contacts";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lead" element={<Lead />} />
          <Route path="/services" element={<Services />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
