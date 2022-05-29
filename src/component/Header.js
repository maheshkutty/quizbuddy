import React, { useState, useEffect } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { Container, Navbar } from "react-bootstrap";

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
                eventKey="/home"
                id={
                  activeNav == "/home" ? "active" : "headermenu"
                }
              >
                Home
              </Nav.Link>
              <Nav.Link
                eventKey="/aboutus"
                id={
                  activeNav == "/aboutus" ? "active" : "headermenu"
                }
              >
                About Us
              </Nav.Link>
              <Nav.Link
                eventKey="/register"
                id={
                  activeNav == "/register" ? "active" : "headermenu"
                }
              >
                Register
              </Nav.Link>
              <Nav.Link
                eventKey="/login"
                id={
                  activeNav == "/login" ? "active" : "headermenu"
                }
              >
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </>
  );
}

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg main">
//         <div className="container-fluid">
//           <a className="navbar-brand brandstyle">QuizBuddy</a>
//           <div className="navbar-nav">
//             <Nav onSelect={handleSelect}>
//               <Nav.Link
//                 eventKey="/home"
//                 className={
//                   activeNav == "/home" ? "headermenu active" : "headermenu"
//                 }
//               >
//                 Home
//               </Nav.Link>
//               <Nav.Link
//                 eventKey="/aboutus"
//                 className={
//                   activeNav == "/aboutus" ? "headermenu active" : "headermenu"
//                 }
//               >
//                 About Us
//               </Nav.Link>
//               <Nav.Link
//                 eventKey="/register"
//                 className={
//                   activeNav == "/register" ? "headermenu active" : "headermenu"
//                 }
//               >
//                 Register
//               </Nav.Link>
//               <Nav.Link
//                 eventKey="/login"
//                 className={
//                   activeNav == "/login" ? "headermenu active" : "headermenu"
//                 }
//               >
//                 Login
//               </Nav.Link>
//             </Nav>
//           </div>
//         </div>
//       </nav>
//       {children}
//     </div>
//   );
// }

export default Header;
