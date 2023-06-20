import React, { useState } from "react";
import { NewPasswordApi } from "../Api/api";
import { useNavigate } from "react-router-dom";
import "./CSS/NewPassword.css"
import lock from "../images/lock.PNG";

function NewPassword() {
  const navigate = useNavigate();
  const [itemList, SetitemList] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isVisible, setisVisible] = useState({
    status: "false",
    message: "Invalid OTP",
  });

  async function HandleSubmit(event) {
    event.preventDefault();
    if (itemList.newPassword === itemList.confirmPassword) {
      const response = await NewPasswordApi(
        itemList.otp,
        itemList.newPassword,
        itemList.confirmPassword
      );
      if (response === true) {
        alert("Password changed successfully");
        navigate("/");
      } else if (response === "resetPassword") {
        alert("Server busy try again");
        navigate("/resetPassword");
      } else {
        setisVisible((prevState) => ({
          ...prevState,
          status: true,
        }));
      }
    } else {
      setisVisible({
        status: true,
        message: "Password mismatch",
      });
    }
  }

  function HandleOnChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    SetitemList((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const isOtpValid = itemList.otp.length >= 6;

  return (
    <div>
      <div className="row forgetpassheaderDiv">
        <h2 className="ms-5">CRM Management System</h2>
      </div>
      <div className="container newpasswordDiv">
        <img alt="Logo" className="lock  mt-2" src={lock} />
        <br />
        <h4>Reset Password</h4>
        <br />
        <br />
        <form
          action=""
          onSubmit={HandleSubmit}
          className="border border-0 border-transparent"
        >
          <input
            type="text"
            name="otp"
            placeholder="OTP"
            pattern="^\d{6}$"
            title="Only six digit allowed"
            value={itemList.otp}
            onChange={HandleOnChange}
            className="newpassinput OTP py-1 px-2"
            required
            maxLength={6}
          />
          <br />
          <br />
          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            value={itemList.newPassword}
            onChange={HandleOnChange}
            className="newpassinput py-1 px-2"
            required
            maxLength={15}
            disabled={!isOtpValid}
          />
          <br />
          <br />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={itemList.confirmPassword}
            onChange={HandleOnChange}
            className="newpassinput py-1 px-2"
            required
            maxLength={15}
            disabled={!isOtpValid}
          />
          <br />
          <label
            className={
              isVisible.status === true ? "visually-true" : "visually-hidden"
            }
          >
            {isVisible.message}
          </label>
          <br />
          <br />
          <button
            type="submit"
            className="newpasswordbtn mb-5"
            disabled={!isOtpValid}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;
