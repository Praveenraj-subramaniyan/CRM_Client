import React, { useState, useEffect } from "react";
import Dashboard from "../Components/Dashboard";
import { useNavigate } from "react-router-dom";
import { DashboardAPI } from "../Api/api";
import "./CSS/Home.css";
import Header from "../Components/Header";
function Home() {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DashboardAPI();
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

  if (isLoading) {
    return (
      <div className="isLoadingHome">
        <div className="spinner-border  text-primary"></div>
      </div>
    );
  }
  return (
    <div>
      <Header active="Dashboard" isAdmin={true} isManager={true} />
      <Dashboard
        TotalUser={itemList.totalUserCount}
        TotalLeads={itemList.totalLeadCount}
        TotalServices={itemList.totalServicesCount}
      />
    </div>
  );
}

export default Home;
