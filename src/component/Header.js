import React, { useState, useEffect } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import "../css/Header.css";

function Header({ children }) {
  const [activeNav, setActiveNav] = useState("/login");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveNav(location.pathname);
  }, []);

  // const onLogin = () => {
  //   navigate("/login");
  // };

  // const onRegister = () => {
  //   navigate("/register");
  // };

  const handleSelect = (eventKey) => {
    navigate(eventKey);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg main">
        <div className="container-fluid">
          <a className="navbar-brand brandstyle">QuizBuddy</a>
          <div className="navbar-nav">
            <Nav onSelect={handleSelect}>
              <Nav.Link
                eventKey="/login"
                className={
                  activeNav == "/login" ? "headermenu active" : "headermenu"
                }
              >
                Home
              </Nav.Link>
              <Nav.Link
                eventKey="/login"
                className={
                  activeNav == "/login" ? "headermenu active" : "headermenu"
                }
              >
                About Us
              </Nav.Link>
              <Nav.Link
                eventKey="/register"
                className={
                  activeNav == "/register" ? "headermenu active" : "headermenu"
                }
              >
                Register
              </Nav.Link>
              <Nav.Link
                eventKey="/login"
                className={
                  activeNav == "/login" ? "headermenu active" : "headermenu"
                }
              >
                Login
              </Nav.Link>
            </Nav>
          </div>
          {/* <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
            <Nav>
              <a className="nav-link headermenu" aria-current="page">
                Home
              </a>
              </Nav>
              <a className="nav-link headermenu">About Us</a>
              <div>
                <Button
                  type="submit"
                  sx={{ marginLeft: 1, background: "#2D4059" }}
                  onClick={() => onRegister()}
                  variant="contained"
                >
                  Register
                </Button>
                <Button
                  type="submit"
                  sx={{
                    marginLeft: 1,
                    background: "#ffffff",
                    color: "#ea5455",
                  }}
                  onClick={() => onLogin()}
                  variant="contained"
                >
                  Login
                </Button>
                <Button
                  type="submit"
                  sx={{
                    marginLeft: 1,
                    background: "#ffffff",
                    color: "#ea5455",
                  }}
                  onClick={() => navigate("/admin/home")}
                  variant="contained"
                >
                  Admin
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      </nav>
      {children}
    </div>
  );
}

export default Header;
