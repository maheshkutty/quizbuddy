import React from "react";
import { Box } from "@mui/material";
import "../css/questionList.css";

const options = ["Harbhajan Singh", "Lasith Malinga", "Amit Mishra"];

function QuestionDetails() {
  const showOptions = () => {
    return options.map((item, index) => {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: 1,
            p: 2,
            mt:2,
            borderColor: "#D1D1D1",
            borderRadius: 1,
          }}
        >
          <span className="qComponent" style={{ marginRight: "10px" }}>
            {String.fromCharCode(index + 65)}
          </span>
          <span>{item}</span>
        </Box>
      );
    });
  };

  return (
    <Box sx={{ border: 1, p: 0, borderColor: "#D1D1D1", borderRadius: 1, m:2}}>
      <Box sx={{ borderBottom: 1, p: 1.5, borderColor: "#D1D1D1" }}>
        <h3>Questions 1</h3>
      </Box>
      <Box sx={{ p: 1.5 }}>
        <p>
          Chennai Super Kings, Dwayne Bravo leave behind whom to become the
          highest wicket-taker in IPL history?
        </p>
        {showOptions()}
      </Box>
    </Box>
  );
}

export default QuestionDetails;
