import { combineReducers } from "redux";
import LoginReducers from "./LoginReducers";
import SignUpReducers from "./SignUpReducers";
import ClassesReducers from "./ClassesReducers";
import SubjectsReducers from "./SubjectsReducers";

export default combineReducers({
  replaceMe: () => null,
  userSession: LoginReducers,
  signUpMsg: SignUpReducers,
  qclass: ClassesReducers,
  qsub: SubjectsReducers
});
