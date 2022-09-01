import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import QuestionDetails from "./QuestionDetails";
import QuestionsList from "./QuestionList";
import TimeCounter from "./TimeCounter";
import { getQuizProblemsAction } from "../actions/QuizAction";
import Loader from "./utils/Loader";
import Toast from "./utils/Toast";
import qbuddy from "../api/qbuddy";

function AttemptQuiz(props) {
  const [questionDetailsData, setQuestionDetailsData] = useState([]);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [toastState, setToastState] = useState(false);
  const navigate = useNavigate();
  let params = useParams();
  useEffect(() => {
    let payload = {
      sid: props.userSession.sid == "" ? 0 : props.userSession.sid,
      quiz_id: params.qid,
    };
    props.getQuizProblemsAction(payload);
  }, []);

  useEffect(() => {
    console.log(props.quizData);
    if (props.quizData.questions != null) {
      let data = props.quizData.questions;
      console.log(data);
      data = data.map((item) => {
        item.show = false;
        item.time = 0;
        return item;
      });
      data[0].show = true;
      setQuestionDetailsData([...data]);
    }
  }, [props.quizData.questions]);

  const getTrueAns = (options) => {
    let aid = [];
    for (let option of options) {
      if (option.isAns) aid.push(option.Oid);
    }
    return aid;
  };

  const submitQuiz = async () => {
    try {
      setSubmitLoader(true);
      let payload = {
        st_id: props.userSession.sid == "" ? 0 : props.userSession.sid,
        quizid: params.qid,
        questions: [],
      };
      questionDetailsData.forEach((item) => {
        payload.questions.push({
          qid: item.qid,
          aid: getTrueAns(item.Options),
          time: item.time,
          diff_lvl: item.dificulty_lvl,
          q_type: "MCQ",
        });
      });
      let response = await qbuddy.post("/student/submitquiz", payload);
      response = response.data;
      if (response.status == "success") {
        setToastState(true);
        navigate(`/quizresult/${response.res}`);
      }
      setSubmitLoader(false);
    } catch (err) {
      console.log(err);
      setSubmitLoader(false);
    }
  };

  if (questionDetailsData.length == 0) {
    return <Loader color="#ec407a" />;
  }

  return (
    <div className="container">
      <div className="row">
        <Toast open={toastState} setOpen={setToastState}>
          Quiz Submitted successfully
        </Toast>
        <div className="col">
          <Box
            sx={{
              paddingInline: 2,
              mt: 2,
            }}
          >
            {questionDetailsData.length == 0 ? null : (
              <TimeCounter mins={props.quizData.quizList.timeInMins} submitQuiz={submitQuiz} />
            )}
          </Box>
          <div className="col">
            {questionDetailsData.length == 0 ? null : (
              <QuestionDetails
                setQuestionDetailsData={setQuestionDetailsData}
                questionDetailsData={questionDetailsData}
              />
            )}
          </div>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingInline: 2,
            }}
          >
            <Button variant="contained">Prev</Button>
            <Button variant="contained">Next</Button>
          </Box> */}
        </div>
        <div className="col-4 sticky-top">
          {questionDetailsData.length == 0 ? null : (
            <QuestionsList
              submitQuiz={submitQuiz}
              submitLoader={submitLoader}
              setQuestionDetailsData={setQuestionDetailsData}
              questionDetailsData={questionDetailsData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quizData: state.quizData,
    userSession: state.userSession,
    qsub: state.qsub,
    qclass: state.qclass,
  };
};

export default connect(mapStateToProps, { getQuizProblemsAction })(AttemptQuiz);
