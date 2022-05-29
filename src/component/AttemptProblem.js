import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, ThemeProvider } from "@mui/material";
import qbuddy from "../api/qbuddy";
import HeaderHome from "./HeaderHome";
import "../css/questionList.css";
import QuizTheme from "../theme/appTheme";
import Loader from "./utils/Loader";

function AttemptProblem(props) {
  let { state } = useLocation();
  let [problemData, setProblemData] = useState(null);

  useEffect(() => {
    async function callProblemDetails() {
      let qid = state.qid;
      let response = await qbuddy.post(`/student/question?id=${qid}`);
      response = response.data;
      console.log(response.res[0]);
      setProblemData(response.res[0]);
    }
    callProblemDetails();
  }, []);

  const selectAns = (a, b) => {
    const qtempdata = problemData;
    qtempdata.Options = qtempdata.Options.map((item) => {
      return { ...item, isAns: false };
    });
    qtempdata.Options[b].isAns = true;
    setProblemData({ ...qtempdata });
  };

  const showOptions = (options, j) => {
    return options.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            border: 1,
            p: 2,
            mt: 2,
            borderColor: "#D1D1D1",
            borderRadius: 1,
            cursor: "pointer",
          }}
          className={item.isAns ? "selectedAns" : null}
          onClick={() => selectAns(j, index)}
        >
          <span
            className={item.isAns ? "qComponent selectedAnsSpan" : "qComponent"}
            style={{ marginRight: "10px" }}
          >
            {String.fromCharCode(index + 65)}
          </span>
          <span>{item.option}</span>
        </Box>
      );
    });
  };

  if (problemData == null) {
    return (
      <HeaderHome>
        <Loader color="#ec407a" />
      </HeaderHome>
    );
  }

  return (
    <HeaderHome>
      {state == null ? (
        <div class="d-flex justify-content-center align-items-center mt-5">
          <h2>Error while loading page</h2>
        </div>
      ) : (
        <div className="container">
          {problemData != null ? (
            <>
              <Box
                key="1"
                sx={{
                  border: 1,
                  p: 0,
                  borderColor: "#D1D1D1",
                  borderRadius: 1,
                  m: 2,
                }}
              >
                <Box sx={{ borderBottom: 1, p: 1.5, borderColor: "#D1D1D1" }}>
                  <h3>Questions 1</h3>
                </Box>
                <Box sx={{ p: 1.5 }}>
                  <p>{problemData.question}</p>
                  {showOptions(problemData.Options, 1)}
                </Box>
                <Box sx={{ p: 1.5 }}>
                  <ThemeProvider theme={QuizTheme}>
                    <Button variant="contained" color="dpink" fullWidth>
                      Submit
                    </Button>
                  </ThemeProvider>
                </Box>
              </Box>
            </>
          ) : null}
        </div>
      )}
    </HeaderHome>
  );
}

export default AttemptProblem;
