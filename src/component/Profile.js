import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderHome from "./HeaderHome";
import "../css/profile.css";

function Profile() {
  return (
    <HeaderHome>
      <div className="container">
        <div className="row">
          <div className="col profileContainer">
            <div className="d-flex align-items-center ">
              <FontAwesomeIcon icon="fa-circle-user" className="iconsStyle" />
              <h1>Mahesh Kutty</h1>
            </div>
            <div className="sectionstyle">
              <div className="row">
                <div className="col headertext">About Me</div>
              </div>
              <div className="row">
                <div className="col mt-3 normaltext">Email</div>
                <div className="col mt-3 normaltext">Mobile no</div>
              </div>
              <div className="row">
                <div className="col mt-3 normaltext">Address</div>
                <div className="col mt-3 normaltext">Performance Level</div>
              </div>
            </div>
            <div className="sectionstyle">
              <div className="row">
                <div className="col headertext">Attempted Quiz</div>
              </div>
            </div>
            <div className="sectionstyle">
              <div className="row">
                <div className="col headertext">Performace</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderHome>
  );
}

export default Profile;
