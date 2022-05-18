import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import qbuddy from "../api/qbuddy";

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
    let sidData = await qbuddy.post(`/student/login?email=${email}`);
    sidData = sidData.data;
    console.log(sidData);
    console.log(sidData.res[0].St_id);
    if (sidData.status == "success") {
      storeMsg.sid = sidData.res[0].St_id;
    }
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

export const SucessMsgAction = (payload) => {
  return {
    type: "change_msg",
    action: payload,
  };
};

export const registerAction = (profiledata) => async (dispatch, getStates) => {
  const { name, address, phone, email, password } = profiledata;
  let storeMsg = {
    successMsg: null,
    errMsg: null,
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

export const getProfileAction = (payload) => async (dispatch, getStates) => {
  try {
    let response = {
      email: "",
      name: "",
      phone: "",
      points: "",
      score: "",
      perLvl: "",
    };
    console.log(payload);
    let userData = await qbuddy.post(`/student/login?email=${payload.email}`);
    userData = userData.data;
    console.log(userData);
    if (userData.status == "success") {
      userData = userData.res[0];
      response.email = userData.email;
      response.name = userData.Name;
      response.phone = userData.phone;
      response.points = userData.points;
      response.score = userData.Score;
      response.perLvl = userData.Performance_lvl;
      dispatch({ type: "profile", payload: response });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: "err_msg", payload: "Error while processing your req" });
  }
};
