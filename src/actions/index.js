import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

export const loginAction = (profileData) => async (dispatch, getStates) => {
  const { email, password } = profileData;
  let storeMsg = {
    uid: "",
    errMsg: null,
    accessToken: "",
    email: "",
  };
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    storeMsg.email = data.user.email;
    storeMsg.accessToken = data.user.accessToken;
    storeMsg.uid = data.user.uid;
  } catch (error) {
    storeMsg.errMsg = "Invalid email and password!";
  }
  dispatch({ type: "LOGIN_USER", payload: storeMsg });
};

export const NormalActions = (payload) => {
  return {
    type: "login",
    action: payload,
  };
};

export const registerAction = (profiledata) => async (dispatch, getStates) => {
  const { name, address, phone, email, password } = profiledata;
  let storeMsg = {
    successMsg: null,
    errMsg: null    
  };
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    console.log(data);
    storeMsg.successMsg = "User Successfully Registered";
  } catch (error) {
    console.log(error.message);
    storeMsg.errMsg = "Error while creating account";
  }
  dispatch({ type: "SIGNUP_USER", payload: storeMsg });
};