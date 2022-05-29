import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Container, Navbar } from "react-bootstrap";
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
    console.log(eventKey);
    navigate(eventKey);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="main">
        <Container>
          <Navbar.Brand id="brandstyle" href="#">
            QuizBuddy
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav onSelect={handleSelect}>
              <Nav.Link
                eventKey="/problems"
                id={activeNav == "/problems" ? "active" : "headermenu"}
              >
                Problems
              </Nav.Link>
              <Nav.Link
                eventKey="/dashboard"
                id={activeNav == "/dashboard" ? "active" : "headermenu"}
              >
                Quizzes
              </Nav.Link>
              <Nav.Link
                eventKey="/profile"
                id={activeNav == "/profile" ? "active" : "headermenu"}
              >
                Profile
              </Nav.Link>
              <Nav.Link
                eventKey="/result"
                id={activeNav == "/result" ? "active" : "headermenu"}
              >
                Result
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </>
  );
};

export default HeaderHome;
