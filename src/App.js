import './App.css';
import Login from "./Pages/Login";
import ForgetPassword from "./Pages/ForgetPassword"
import Home from "./Pages/Home"
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/forgetpassword" element={<ForgetPassword/>}/>
    <Route path="/home" element={<Home/>}/>
    {/* <Route path="/register" element={<RegisterPage/>}/>
      */}
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
