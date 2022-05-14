import React from "react";
import { Button, Box } from "@mui/material";

import QuestionDetails from "./QuestionDetails";
import QuestionsList from "./QuestionList";
import TimeCounter from "./TimeCounter";

function AttemptQuiz() {
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
            <TimeCounter />
          </Box>
          <div className="col">
            <QuestionDetails />
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
          <QuestionsList />
        </div>
      </div>
    </div>
  );
}

export default AttemptQuiz;
