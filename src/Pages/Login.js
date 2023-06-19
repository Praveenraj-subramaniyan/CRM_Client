import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/Login.css";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    emailid: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState({
    status: "visually-hidden",
    message: "null",
  });
  function HandleResponse(response) {
    if (response === "True") {
      const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      Cookies.set("crm_login", JSON.stringify(data), {
        expires: expiryDate,
        sameSite: "None",
        secure: true,
      });
      navigate("/home")
      console.log(response);
    } else if (response === "Invalid") {
      setIsVisible({
        status: "visually-true",
        message: "Invalid username and password",
      });
    } else if (response === "False") {
      setIsVisible({
        status: "visually-true",
        message: "Invalid password",
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:3000/login";
    axios
      .post(url, data)
      .then((res) => {
        HandleResponse(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleData(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  return (
    <div className=" mx-3 mt-5">
      <h2 className="text-primary">CRM Management System</h2>
      <form id="loginForm" className="loginFormcls" onSubmit={handleSubmit}>
        <input
          type="email"
          name="emailid"
          className=""
          value={data.emailid}
          onChange={handleData}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          className=""
          value={data.password}
          onChange={handleData}
          placeholder="Password"
          required
        />
        <label htmlFor="emailid" className={isVisible.status}>
          {isVisible.message}
        </label>
        <Link to="/forgetpassword" className="link">
            Forgot password?
        </Link>
        <button
          type="submit"
          className="btn btn-primary btn-block btn-large  mt-2"
        >
          Login
        </button>
        {/* <p className="mt-3 text-center text-secondary">Or</p>
        <Link to="/register" className="registerbtn">
            Create new account
        </Link> */}
      </form>
    </div>
  );
}

export default Login;
