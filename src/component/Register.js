import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Alert,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import qbuddy from "../api/qbuddy";
import Header from "./Header";

import { registerAction } from "../actions/index";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required(),
  email: yup.string().email("Enter Valid Email").required(),
  password: yup.string().min(8).required(),
});

const Register = (props) => {
  let navigate = useNavigate();
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
      performance_lvl: "1",
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

  const onSignUp = async (data) => {
    try {
      console.log(data);
      setRegisterLoad(true);
      let res = await qbuddy.post("/student/createStudent", data);
      res = res.data;
      if (res.status == "success") {
        props.registerAction(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Header>
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
                <FormControl fullWidth>
                  <InputLabel id="perlvl">Performance Level</InputLabel>
                  <Select
                    id="perlvl"
                    labelId="perlvl"
                    label="Performace Level"
                    error={errors.qclass?.type == "required" ? true : false}
                    {...register("performance_lvl")}
                    sx={{ marginBottom: 1 }}
                  >
                    <MenuItem key="1" value="1">
                      Easy
                    </MenuItem>
                    <MenuItem key="2" value="2">
                      Medium
                    </MenuItem>
                    <MenuItem key="3" value="3">
                      High
                    </MenuItem>
                  </Select>
                  {errors.performance_lvl?.message ? (
                    <FormHelperText error>
                      {errors.performance_lvl.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </div>
              <div>
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
    </Header>
  );
};

const mapStateToProps = (state) => {
  return { signUpMsg: state.signUpMsg };
};

export default connect(mapStateToProps, { registerAction })(Register);
