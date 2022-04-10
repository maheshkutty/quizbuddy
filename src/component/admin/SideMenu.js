import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import "./sidemenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";

function SideMenu(props) {
  const [activeNav, setActiveNav] = useState("/admin/home");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveNav(location.pathname);
  },[])

  const handleSelect = (eventKey) => {
    navigate(eventKey);
  };

  return (
    <div className="d-flex" style={{ background: "#f0f2f5" }}>
      <div className="col-2 wrapper justify-content-center">
        <p className="logotext" href="#">
          Admin
        </p>
        <Nav
          defaultActiveKey="/home"
          className="flex-column"
          onSelect={handleSelect}
        >
          <Nav.Link
            eventKey="/admin/home"
            className={activeNav == "/admin/home" ? "linkStyleActive" : null}
          >
            <FontAwesomeIcon icon="fa-house" className="iconStyle" />
            Home
          </Nav.Link>
          <Nav.Link
            eventKey="/admin/classess"
            className={
              activeNav == "/admin/classess" ? "linkStyleActive" : null
            }
          >
            <FontAwesomeIcon icon="fa-graduation-cap" className="iconStyle" />
            Classes
          </Nav.Link>
          <Nav.Link
            eventKey="/admin/subjects"
            className={
              activeNav == "/admin/subjects" ? "linkStyleActive" : null
            }
          >
            <FontAwesomeIcon icon="fa-book" className="iconStyle" />
            Subjects
          </Nav.Link>
          <Nav.Link
            eventKey="/admin/chapters"
            className={
              activeNav == "/admin/chapters" ? "linkStyleActive" : null
            }
          >
            <FontAwesomeIcon icon="fa-file" className="iconStyle" />
            Chapters
          </Nav.Link>
          <Nav.Link
            eventKey="/admin/questions"
            className={
              activeNav == "/admin/questions" ? "linkStyleActive" : null
            }
          >
            <FontAwesomeIcon
              icon="fa-clipboard-question"
              className="iconStyle"
            />
            Questions
          </Nav.Link>
        </Nav>
      </div>
      {props.children}
    </div>
  );
}

export default SideMenu;
