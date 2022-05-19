import { combineReducers } from "redux";
import LoginReducers from "./LoginReducers";
import SignUpReducers from "./SignUpReducers";
import ClassesReducers from "./ClassesReducers";
import SubjectsReducers from "./SubjectsReducers";
import ChapterReducers from "./ChapterReducers";
import ProblemsReducers from "./ProblemsReducers";
import ProfileReducers from "./ProfileReducers";
import QuizReducers from "./QuizReducers";

export default combineReducers({
  replaceMe: () => null,
  userSession: LoginReducers,
  signUpMsg: SignUpReducers,
  qclass: ClassesReducers,
  qsub: SubjectsReducers,
  qchapters: ChapterReducers,
  problems: ProblemsReducers,
  profileData: ProfileReducers,
  quizData: QuizReducers,
});
