import React from "react";
import { Box, TextField, Button } from "@mui/material";

const Register = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-2">
        <div className="col-6">
        <h1 className="text-center mb-4">Student Registartion</h1>
          <div className="mt-2">
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              id="standred-basic"
            />
          </div>
          <div className="mt-2">
            <TextField
              fullWidth
              variant="outlined"
              label="Address"
              rows={2}
              multiline
              id="standred-basic"
            />
          </div>
          <div className="mt-2">
            <TextField
              fullWidth
              variant="outlined"
              label="Phone"
              id="standred-basic"
            />
          </div>
          <div className="mt-2">
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              id="standred-basic"
            />
          </div>
          <div className="mt-2">
            <TextField
              fullWidth
              type={"password"}
              variant="outlined"
              label="Password"
              id="standred-basic"
            />
          </div>
          <div className="mt-2">
            <Button variant="contained">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
