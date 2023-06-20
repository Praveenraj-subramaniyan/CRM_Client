import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Header.css";

function Header(data) {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to={`/home`}
                className={`${
                  data.active === "Dashboard" ? "active" : ""
                } nav-link`}
                href="#Dashboard"
                onClick={() => navigate("/")}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/lead`}
                className={`${data.active === "Lead" ? "active" : ""} nav-link`}
              >
                Lead
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/services`}
                className={`${
                  data.active === "Services" ? "active" : ""
                } nav-link`}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/adduser`}
                className={`${
                  data.active === "Adduser" ? "active" : ""
                } nav-link ${data.isAdmin || data.isManager ? "" : "disabled"}`}
              >
                Add User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
