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
import HomePage from "./component/HomePage";
import Aboutus from "./component/Aboutus";
import AdminLogin from "./component/admin/AdminLogin";
import AllResult from "./component/AllResult";
import QuizResult from "./component/QuizResult";

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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/class"
          element={
            <RequireAuth>
              <QuizClass />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/problems"
          element={
            <RequireAuth>
              <ProblemList />
            </RequireAuth>
          }
        />
        <Route path="/attemptquiz" element={<AttemptQuiz />}>
          <Route path=":qid" element={<AttemptQuiz />} />
        </Route>
        <Route path="/quizresult" element={<QuizResult />}>
          <Route path=":aid" element={<QuizResult />} />
        </Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route
          path="/attemptproblem"
          element={
            <RequireAuth>
              <AttemptProblem />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
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
