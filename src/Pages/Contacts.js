import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LeadAPI, CreateLeadAPI, EditLeadAPI, StatusLeadAPI } from "../Api/api";
import Header from "../Components/Header";

function Contacts() {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [create, setcreate] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
  });
  const [edit, setedit] = useState({
    id: "",
    company: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await LeadAPI();
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
  }, []);

  function createLead(event) {
    event.preventDefault();
    const data = CreateLeadAPI(create);
    if (data === "login") {
      alert("Session Expired");
      navigate("/");
    } else {
      alert("Lead created successfully");
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
  function SetEditLead(id) {
    itemList.map((data) => {
      if (data._id === id) {
        setedit({
          id: id,
          company: data.company,
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      }
    });
  }

  function EditLead(event) {
    event.preventDefault();
    const data = EditLeadAPI(edit);
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
        if (data._id === id) {
          return {
            ...data,
            status: status,
          };
        } else {
          return data;
        }
      })
    );
    const data = StatusLeadAPI(id, status);
    if (data === "login") {
      alert("Session Expired");
      navigate("/");
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
      <Header active="Contacts" isAdmin={true} isManager={true} />
    </div>
  );
}

export default Contacts;
