import React, { Children, Component } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "../css/Header.css";

function Header({ children }) {
  let navigate = useNavigate();

  const onLogin = () => {
    navigate("/login");
  };

  const onRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark main">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            QuizBuddy
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
              <a className="nav-link" href="#">
                About Us
              </a>
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
              </div>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default Header;
