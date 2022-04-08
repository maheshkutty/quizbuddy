import React, { useEffect } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { loginAction } from "../actions/index";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (props.userSession.uid != "") {
      navigate("/");
    }
  }, [props.userSession]);

  const onSubmit = (data) => {
    props.loginAction({ email: data.email, password: data.password });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-2">
        <div className="col-5">
          {props.userSession.errMsg != null ? (
            <Alert severity="error">{props.userSession.errMsg}</Alert>
          ) : null}
          <h1 className="text-center mb-4">Welcome Back</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-2">
              <TextField
                fullWidth
                error = {errors.email?.type === 'required' ? true : false}
                variant="outlined"
                label="Email"
                id="email"
                {...register("email", { required: "Email is required" })}
                helperText={errors.email?.message}
              />
            </div>
            <div className="mt-2">
              <TextField
                fullWidth
                error = {errors.password?.type === 'required' ? true : false}
                type={"password"}
                variant="outlined"
                label="Password"
                id="password"
                helperText={errors.password?.message}
                {...register("password", { required: "Password is required" })}
              />
            </div>
            <div className="mt-2">
              <Button type="submit" sx={{width: "100%", background:"#2D4059"}} variant="contained" >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userSession: state.userSession,
  };
};

export default connect(mapStateToProps, { loginAction })(Login);
