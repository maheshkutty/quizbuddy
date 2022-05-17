import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";

import "../css/Header.css";

const HeaderHome = ({ children }) => {
  const [activeNav, setActiveNav] = useState("/problems");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveNav(location.pathname);
  }, []);

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
                eventKey="/problems"
                className={
                  activeNav == "/problems" ? "headermenu active" : "headermenu"
                }
              >
                Problems
              </Nav.Link>
              <Nav.Link
                eventKey="/dashboard"
                className={
                  activeNav == "/dashboard" ? "headermenu active" : "headermenu"
                }
              >
                Quizzes
              </Nav.Link>
              <Nav.Link
                eventKey="/profile"
                className={
                  activeNav == "/profile" ? "headermenu active" : "headermenu"
                }
              >
                Profile
              </Nav.Link>
            </Nav>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default HeaderHome;
