import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import "./CSS/AddUser.css";
import { AddUserAPI, CheckUserCredentialsAPI } from "../Api/api";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setisAdmin] = useState([]);
  const [isManager, setisManager] = useState([]);
  const [isEditPermission, setisEditPermission] = useState([]);
  const [userDetails, setuserDetails] = useState({
    name: "",
    email: "",
    role: "",
    isEdit: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CheckUserCredentialsAPI();
        if (data === "login") {
          alert("Session Expired");
          navigate("/");
        } else {
          setIsLoading(false);
          setisAdmin(data.isAdmin);
          setisManager(data.isManager);
          setisEditPermission(data.isEditPermission);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const handleDataChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;
    if (name === "isEdit") {
      setuserDetails((prevState) => ({
        ...prevState,
        [name]: value ? true : false,
      }));
    } else {
      setuserDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  async function HadleSubmit(event) {
    try {
      const data = await AddUserAPI(userDetails);
      console.log(data)
      if (data === "login") {
        alert("Session Expired");
        navigate("/");
      } else if (data === "Already registered") {
        alert(data);
      } else {
        setItemList(data);
        console.log(itemList);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (isLoading) {
    return (
      <div className="isLoadingHome">
        <div className="spinner-border  text-primary"></div>
      </div>
    );
  }
  return (
    <div>
      <Header active="AddUser" isAdmin={true} isManager={true} />
      <div className="container" onSubmit={HadleSubmit}>
        <form className="AddUserform text-center">
          <h4>Add User</h4>
          <input
            type="email"
            placeholder="Email"
            className="AddUserforminput mt-3"
            name="email"
            value={userDetails.email}
            onChange={handleDataChange}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Name"
            className="AddUserforminput"
            name="name"
            value={userDetails.name}
            onChange={handleDataChange}
            required
          />
          <br />
          <div className="row mt-3">
            <div className="col-6">
              <select
                name="role"
                value={userDetails.role}
                onChange={handleDataChange}
                required
              >
                <option value="">Select Role</option>
                <option value="admin" disabled={!isAdmin}>
                  Admin
                </option>
                <option value="manager" disabled={!isAdmin}>
                  Manager
                </option>
                <option value="employee" disabled={!isManager}>
                  Employee
                </option>
              </select>
            </div>
            <div className="col-6">
              <label>
                <input
                  type="checkbox"
                  disabled={userDetails.role !== "employee"}
                  className="me-1"
                  checked={userDetails.isEdit}
                  onChange={handleDataChange}
                  name="isEdit"
                />
                Edit permission
              </label>
            </div>
          </div>
          <button
            className="btn btn-primary AddUserforminput mt-3"
            type="submit"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
