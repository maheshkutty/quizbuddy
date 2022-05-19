import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";

import QuestionDetails from "./QuestionDetails";
import QuestionsList from "./QuestionList";
import TimeCounter from "./TimeCounter";
import { getQuizProblemsAction } from "../actions/QuizAction";

function AttemptQuiz(props) {
  const [questionDetailsData, setQuestionDetailsData] = useState([]);
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
        return item;
      });
      data[0].show = true;
      setQuestionDetailsData([...data]);
    }
  }, [props.quizData.questions]);

  const submitQuiz = () => {
    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Box
            sx={{
              paddingInline: 2,
              mt: 2,
            }}
          >
            {questionDetailsData.length == 0 ? null : (
              <TimeCounter mins={props.quizData.quizList.timeInMins} />
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
