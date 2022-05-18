import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App";
import Register from "./component/Register";
import Login from "./component/Login";
import reducers from "./reducers";
import Header from "./component/Header";
import "./index.css";
import QuizClass from "./component/QuizClass";
import RequireAuth from "./component/RequireAuth";
import SideMenu from "./component/admin/SideMenu";
import AddClass from "./component/admin/AddClass";
import AddSubjects from "./component/admin/AddSubjects";
import AddChapters from "./component/admin/AddChapters";
import AddQuestions from "./component/admin/AddQuestions";
import QuestionTable from "./component/admin/QuestionTable";
import Dashboard from "./component/Dashboard";
import QuestionStatus from "./component/admin/QuestionStatus";
import ProblemList from "./component/ProblemList";
import AttemptQuiz from "./component/AttemptQuiz";
import Profile from "./component/Profile";
import AttemptProblem from "./component/AttemptProblem";

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        />
        <Route
          path="/register"
          element={
            <Header>
              <Register />
            </Header>
          }
        />
        <Route
          path="/login"
          element={
            <Header>
              <Login />
            </Header>
          }
        />
        <Route
          path="/class"
          element={
            <RequireAuth>
              <QuizClass />
            </RequireAuth>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/problems" element={<ProblemList />} />
        <Route path="/attemptquiz" element={<AttemptQuiz />} />
        <Route path="/attemptproblem" element={<AttemptProblem />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/home" element={<SideMenu />} />
        <Route path="/admin/classess" element={<AddClass />} />
        <Route path="/admin/subjects" element={<AddSubjects />} />
        <Route path="/admin/chapters" element={<AddChapters />} />
        <Route path="/admin/questions" element={<QuestionTable />} />
        <Route path="/admin/addquestions" element={<AddQuestions />} />
        <Route path="/admin/qstatus" element={<QuestionStatus />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
