import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, ThemeProvider } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import qbuddy from "../api/qbuddy";
import HeaderHome from "./HeaderHome";
import "../css/questionList.css";
import QuizTheme from "../theme/appTheme";
import Loader from "./utils/Loader";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Result from "./Result";

function AttemptProblem({ userSession }) {
  let { state } = useLocation();
  let [problemData, setProblemData] = useState(null);
  const [show, setShow] = useState(false);
  const [resultData, setResultData] = useState({ score: 0, total: 10 });
  const [resultLoad, setResultLoad] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function callProblemDetails() {
      let qid = state.qid;
      let response = await qbuddy.post(`/student/question?id=${qid}`);
      response = response.data;
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

  const checkAns = () => {
    for (let item of problemData.Options) {
      if (item.isAns) return item.Oid;
    }
    return -1;
  };

  const showAns = async () => {
    let ansId = checkAns();
    if (ansId != -1) {
      setResultLoad(true);
      const payload = {
        qid: problemData.qid,
        aid: [checkAns()],
        time: 20,
        sid: userSession.sid,
      };
      let response = await qbuddy.post("/student/attemptquestion", payload);
      response = response.data;
      let result = {
        score: response.res.result == "true" ? 10 : 0,
        total: 10,
      };
      setResultData(result);
      handleShow();
      setResultLoad(false);
    }
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
      <Modal
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Result
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Result score={resultData.score} total={resultData.total} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            className="m-1"
            color="error"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="outlined"
            className="m-1"
            color="success"
            type="submit"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
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
                    <LoadingButton
                      variant="contained"
                      color="dpink"
                      loading={resultLoad}
                      onClick={showAns}
                      fullWidth
                    >
                      Submit
                    </LoadingButton>
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

const mapStateToProps = (state) => {
  return {
    userSession: state.userSession,
  };
};

export default connect(mapStateToProps)(AttemptProblem);
