import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

import HeaderHome from "./HeaderHome";
import "../css/profile.css";
import { getProfileAction } from "../actions/index";

function Profile(props) {
  useEffect(() => {
    // console.log(props.userSession);
    // console.log(props.profileData);
    // props.getProfileAction({ email: props.userSession.email });
    if (props.profileData.email == "") {
      props.getProfileAction({ email: props.userSession.email });
    }
  }, []);

  return (
    <HeaderHome>
      <div className="container">
        <div className="row">
          <div className="col profileContainer">
            <div className="d-flex align-items-center ">
              <FontAwesomeIcon icon="fa-circle-user" className="iconsStyle" />
              <h1>{props.profileData.name}</h1>
            </div>
            <div className="sectionstyle">
              <div className="row">
                <div className="col headertext">About Me</div>
              </div>
              <div className="row">
                <div className="col mt-3 normaltext">
                  Email: {props.profileData.email}
                </div>
                <div className="col mt-3 normaltext">
                  Mobile no: {props.profileData.phone}
                </div>
              </div>
              <div className="row">
                <div className="col mt-3 normaltext">
                  Score: {props.profileData.score}
                </div>
                <div className="col mt-3 normaltext">
                  Performance Level: {props.profileData.perLvl}
                </div>
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

const mapStateToProps = (state) => {
  return {
    profileData: state.profileData,
    userSession: state.userSession,
  };
};

export default connect(mapStateToProps, { getProfileAction })(Profile);