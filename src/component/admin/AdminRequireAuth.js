import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRequireAuth({ children, auth }) {
  if (auth.uid === "") return <Navigate to="/admin/login" />;
  return children;
}

const mapStateToProps = (state) => {
  return { auth: state.userSession };
};

export default connect(mapStateToProps)(AdminRequireAuth);
