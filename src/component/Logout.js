import React from "react";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { logoutAction } from "../actions/index";
import QuizTheme from "../theme/appTheme";


function Logout({ logoutAction }) {
  let navigate = useNavigate();
  const onLogOut = () => {
    logoutAction();
    navigate("/login");
  };

  return (
    <div>
      <ThemeProvider theme={QuizTheme}>
        <Button variant="contained" color="neutral" onClick={onLogOut}>
          Logout
        </Button>
      </ThemeProvider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userSession: state.userSession,
  };
};

export default connect(mapStateToProps, { logoutAction })(Logout);
