import React, { useState, useEffect } from "react";
import SideMenu from "./SideMenu";
import { useLocation } from "react-router-dom";
import "../../css/qstatus.css";

function QuestionStatus() {
  let { state } = useLocation();

  return (
    <SideMenu>
      <div className="d-flex mt-2 m-5">
        <div>
          <h1>{state.name}</h1>
          <div style={{marginLeft:"0.5em"}}>
            <div className="col">
              <p className="list">Class</p>
              <p>{state.Class}</p>
            </div>
            <div className="col">
              <p className="list">Subject</p>
              <p>{state.Subject}</p>
            </div>
            <div className="col">
              <p className="list">Chapter </p>
              <p>{state.Chapter}</p>
            </div>
            <div className="col">
              <p className="list">Diffculty </p>
              <p>{state.dificulty_lvl}</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </SideMenu>
  );
}

export default QuestionStatus;
