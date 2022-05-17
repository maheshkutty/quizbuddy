import React from "react";
import "./App.css";
import QuizCard from "../src/component/QuizCard";
import QuestionsList from "./component/QuestionList";
import QuestionDetails from "./component/QuestionDetails";
import TimeCounter from "./component/TimeCounter";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faHouse,
  faGraduationCap,
  faBook,
  faClipboardQuestion,
  faFile,
  faImage,
  faTrash,
  faUpload,
  faPlus,
  faEllipsisVertical,
  faCircleUser
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCheckSquare,
  faCoffee,
  faHouse,
  faGraduationCap,
  faBook,
  faClipboardQuestion,
  faFile,
  faImage,
  faTrash,
  faUpload,
  faPlus,
  faEllipsisVertical,
  faCircleUser
);

function App() {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <h1>Quiz Buddy</h1>
        <div className="col">
          <QuizCard />
        </div>
        <div className="col">
          <QuestionsList />
        </div>
        <div className="col">
          <TimeCounter />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <QuestionDetails />
        </div>
      </div>
    </div>
  );
}

export default App;
