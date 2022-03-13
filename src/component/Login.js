import React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { TextField, Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-2">
        <div className="col-5">
          <h1 className="text-center mb-4">Student Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-2">
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                id="standred-basic"
                {...register("email", { required: true })}
              />
            </div>
            <div className="mt-2">
              <TextField
                fullWidth
                type={"password"}
                variant="outlined"
                label="Password"
                id="standred-basic"
                {...register("password", { required: true, minLength: 8 })}
              />
            </div>
            <div className="mt-2">
              <Button variant="contained">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// class Login extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//     };
//   }

//   createUser = () => {};

//   onSignIn = async () => {
//     try {
//       console.log("called");
//       const data = await signInWithEmailAndPassword(
//         auth,
//         this.state.email,
//         this.state.password
//       );
//       console.log(data.user);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   handleChange = (evt) => {
//     const value = evt.target.value;
//     console.log(this.state);
//     this.setState({
//       ...this.state,
//       [evt.target.name]: value,
//     });
//   };

//   render() {
//     return (
//       <div className="container">
//         <div className="row justify-content-center mt-2">
//           <div className="col-5">
//             <h1 className="text-center mb-4">Student Login</h1>
//             <div className="mt-2">
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 label="Email"
//                 id="standred-basic"
//               />
//             </div>
//             <div className="mt-2">
//               <TextField
//                 fullWidth
//                 type={"password"}
//                 variant="outlined"
//                 label="Password"
//                 id="standred-basic"
//               />
//             </div>
//             <div className="mt-2">
//               <Button variant="contained">Submit</Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default Login;
