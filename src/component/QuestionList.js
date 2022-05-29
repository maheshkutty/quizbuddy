import React from "react";
import { Box, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import QuizTheme from "../theme/appTheme";
import "../css/questionList.css";

function QuestionsList({ setQuestionDetailsData, questionDetailsData, submitQuiz }) {
  const navigateToQ = (i) => {
    let data = questionDetailsData;
    data = data.map((item) => {
      item.show = false;
      return item;
    });
    data[i].show = true;
    setQuestionDetailsData(data);
  };

  return (
    <Box
      sx={{ border: 1, p: 0, borderColor: "#D1D1D1", borderRadius: 1, mt: 2 }}
      className="sticky-top"
    >
      <Box sx={{ borderBottom: 1, p: 1.5, borderColor: "#D1D1D1" }}>
        <h3>Questions Analysis</h3>
      </Box>
      <Box sx={{ p: 1.5 }}>
        <div className="row m-1">
          {questionDetailsData.map((item, i) => {
            if (!item.show)
              return (
                <span onClick={() => navigateToQ(i)} className="qComponent">
                  {item.srno}
                </span>
              );
            else
              return (
                <span
                  onClick={() => navigateToQ(i)}
                  className="qComponent qattempeted"
                >
                  {item.srno}
                </span>
              );
          })}
        </div>
      </Box>
      <Box>
        <ThemeProvider theme={QuizTheme}>
          <Button
            fullWidth="true"
            size="large"
            variant="contained"
            onClick={submitQuiz}
            sx={{
              backgroundImage:
                "linear-gradient(to right, #ea5455, #c1426c, #8c3e73, #563966, #2b2e4a)",
            }}
          >
            Submit Quiz
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
}

export default QuestionsList;
