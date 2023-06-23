import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Login.css";
import Cookies from "js-cookie";
import { LoginAPI } from "../Api/api";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    emailid: "spr887011@gmail.com",
    password: "1234",
  });
  const [isVisible, setIsVisible] = useState({
    status: "visually-hidden",
    message: "null",
  });
  function HandleResponse(response) {
    setIsLoading(false);
    if (response === true) {
      const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      Cookies.set("crm_login", JSON.stringify(data), {
        expires: expiryDate,
        sameSite: "None",
        secure: true,
      });
      navigate("/home");
    } else {
      setIsVisible({
        status: "visually-true",
        message: "Invalid username and password",
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    HandleResponse(await LoginAPI(data));
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
        <Link to="/resetPassword" className="link">
          Reset password?
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
      {isLoading && (
        <div className="isLoadingLogin">
          <div className="spinner-border  text-primary"></div>
        </div>
      )}
    </div>
  );
}

export default Login;
