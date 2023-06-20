import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import {
  ServicesAPI,
  CreateServicesAPI,
  EditServicesAPI,
  StatusServicesAPI,
} from "../Api/api";
import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [create, setcreate] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    title: "",
    description: "",
  });
  const [edit, setedit] = useState({
    id: "",
    company: "",
    name: "",
    email: "",
    phone: "",
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ServicesAPI();
        if (data === "login") {
          alert("Session Expired");
          navigate("/");
        } else {
          setItemList(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [navigate]);

  function createServices(event) {
    event.preventDefault();
    const data = CreateServicesAPI(create);
    if (data === "login") {
      alert("Session Expired");
      navigate("/");
    } else {
      alert("Service request created successfully");
      window.location.reload();
    }
  }
  function HandleCreateData(event) {
    const name = event.target.name;
    const value = event.target.value;
    setcreate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function HandleEditData(event) {
    const name = event.target.name;
    const value = event.target.value;
    setedit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function SetEditServices(id) {
    itemList.map((data) => {
      if (data._id === id) {
        setedit({
          id: id,
          company: data.company,
          name: data.name,
          email: data.email,
          phone: data.phone,
          title: data.title,
          description: data.description,
        });
      }
    });
  }

  function EditServices(event) {
    event.preventDefault();
    const data = EditServicesAPI(edit);
    if (data === "login") {
      alert("Session Expired");
      navigate("/");
    } else {
      alert("Edited successfully");
      window.location.reload();
    }
  }

  function handleStatusChange(id, status) {
    setItemList((prevFilteritemList) =>
      prevFilteritemList.map((data) => {
        if (data._id === id && data.status !== status) {
          const value = StatusServicesAPI(id, status);
          if (value === "login") {
            alert("Session Expired");
            navigate("/");
          }
          return {
            ...data,
            status: status,
          };
        } else {
          return data;
        }
      })
    );
   
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
      <Header active="Services" isAdmin={true} isManager={true} />
      <div className="container">
        <br />
        <button
          className="btn btn-primary CreateLeadbtn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#createService"
        >
          Create Service
        </button>
        <div className="offcanvas offcanvas-start" id="createService">
          <div className="offcanvas-header">
            <h1 className="offcanvas-title">Create Service</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body">
            <form
              className="border border-0 border-transparent"
              onSubmit={createServices}
            >
              <input
                type="text"
                placeholder="Company Name"
                name="company"
                value={create.company}
                onChange={HandleCreateData}
                required
              />
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={create.name}
                onChange={HandleCreateData}
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={create.email}
                onChange={HandleCreateData}
                required
              />
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={create.phone}
                onChange={HandleCreateData}
                required
              />
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={create.title}
                onChange={HandleCreateData}
                required
              />
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={create.description}
                onChange={HandleCreateData}
                required
              />
              <br />
              <button
                className="btn btn-primary mt-2"
                type="submit"
                data-bs-dismiss="offcanvas"
              >
                Create
              </button>
            </form>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="row">
          {itemList[0] &&
            itemList.map((data) => {
              return (
                <div className="col-12 mb-3">
                  <div class="card text-secondary">
                    <div class="card-body">
                      <div className="row">
                        <h4 className="card-title col-7 col-md-9 col-lg-10">
                          {data.company}
                        </h4>
                        <div className="btn-group col-2 col-lg-1">
                          <button
                            type="button"
                            className="btn btn-transparent text-secondary dropdown-toggle"
                            data-bs-toggle="dropdown"
                          >
                            {data.status}
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() =>
                                  handleStatusChange(data._id, "Created")
                                }
                              >
                                Created
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() =>
                                  handleStatusChange(data._id, "Open")
                                }
                              >
                                Open
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() =>
                                  handleStatusChange(
                                    data._id,
                                    "QuaConfirmedlified"
                                  )
                                }
                              >
                                Confirmed
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() =>
                                  handleStatusChange(data._id, "Released")
                                }
                              >
                                Released
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() =>
                                  handleStatusChange(data._id, "Cancelled")
                                }
                              >
                                Cancelled
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() =>
                                  handleStatusChange(data._id, "Completed")
                                }
                              >
                                Completed
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="card-text">
                        <b>{data.title}</b>
                      </p>
                      <p className="card-text">{data.description}</p>
                      <p className="card-text">
                        {data.name},{data.email},{data.phone}
                      </p>
                      <div
                        className="offcanvas offcanvas-start"
                        id="editService"
                      >
                        <div className="offcanvas-header">
                          <h1 className="offcanvas-title">Edit service</h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                          ></button>
                        </div>
                        <div className="offcanvas-body">
                          <form
                            className="border border-0 border-transparent"
                            onSubmit={EditServices}
                          >
                            <input
                              type="text"
                              placeholder="Company Name"
                              name="company"
                              value={edit.company}
                              onChange={HandleEditData}
                              required
                            />
                            <input
                              type="text"
                              placeholder="Name"
                              name="name"
                              value={edit.name}
                              onChange={HandleEditData}
                              required
                            />
                            <input
                              type="email"
                              placeholder="Email"
                              name="email"
                              value={edit.email}
                              onChange={HandleEditData}
                              required
                            />
                            <input
                              type="text"
                              placeholder="Phone"
                              name="phone"
                              value={edit.phone}
                              onChange={HandleEditData}
                              required
                            />
                            <input
                              type="text"
                              placeholder="Title"
                              name="title"
                              value={edit.title}
                              onChange={HandleEditData}
                              required
                            />
                            <input
                              type="text"
                              placeholder="Description"
                              name="description"
                              value={edit.description}
                              onChange={HandleEditData}
                              required
                            />
                            <br />
                            <button
                              className="btn btn-primary mt-2"
                              type="submit"
                              data-bs-dismiss="offcanvas"
                            >
                              Edit service
                            </button>
                          </form>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#editService"
                        onClick={() => SetEditServices(data._id)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Services;
