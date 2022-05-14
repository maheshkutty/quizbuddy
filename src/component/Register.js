import React, { useEffect, useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";

import { registerAction } from "../actions/index";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required(),
  email: yup.string().email("Enter Valid Email").required(),
  password: yup.string().required(),
});

const Register = (props) => {
  let
   navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const [registerLoad, setRegisterLoad] = useState(false);

  useEffect(() => {
    if (props.signUpMsg.successMsg)
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    setRegisterLoad(false);
  }, [props.signUpMsg]);

  const onSignUp = (data) => {
    console.log(data);
    setRegisterLoad(true);
    props.registerAction(data);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-2">
        <div className="col-6">
        {props.signUpMsg.errMsg != null ? (
            <Alert severity="error">{props.signUpMsg.errMsg}</Alert>
          ) : null}
          <form onSubmit={handleSubmit(onSignUp)}>
            <h1 className="text-center mb-4">Student Registartion</h1>
            <div className="mt-2">
              <TextField
                fullWidth
                error={errors.name?.type == "required" ? true : false}
                variant="outlined"
                label="Name"
                id="name"
                {...register("name")}
                helperText={errors.name?.message}
              />
            </div>
            <div className="mt-2">
              <TextField
                fullWidth
                variant="outlined"
                label="Address"
                rows={2}
                multiline
                id="address"
                error={errors.address?.type === "required" ? true : false}
                {...register("address")}
                helperText={errors.address?.message}
              />
            </div>
            <div className="mt-2">
              <TextField
                fullWidth
                variant="outlined"
                label="Phone"
                id="phone"
                error={errors.phone?.type === "required" ? true : false}
                {...register("phone")}
                helperText={errors.phone?.message}
              />
            </div>
            <div className="mt-2">
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                id="email"
                error={
                  errors.email?.type === "required" ||
                  errors.email?.type === "email"
                    ? true
                    : false
                }
                {...register("email")}
                helperText={errors.email?.message}
              />
            </div>
            <div className="mt-2">
              <TextField
                fullWidth
                type={"password"}
                variant="outlined"
                label="Password"
                id="password"
                error={errors.password?.type === "required" ? true : false}
                {...register("password")}
                helperText={errors.password?.message}
              />
            </div>
            <div className="mt-2">
              <LoadingButton
                type="submit"
                loading={registerLoad}
                variant="contained"
                sx={{ width: "100%", background: "#ea5455" }}
              >
                Submit
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { signUpMsg: state.signUpMsg };
};

export default connect(mapStateToProps, { registerAction })(Register);
