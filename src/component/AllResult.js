import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import "../css/questionList.css";
import HeaderHome from "./HeaderHome";

function AllResult({ sid, qid }) {
  const [questionDetailsData, setQuestionDetailsData] = useState([
    {
      qid: 164,
      In_id: 1,
      CHid: 3,
      show: true,
      question: "If z is a complex number such that z = - z, then",
      type: "MCQ",
      dificulty_lvl: "1",
      contains_img: 0,
      Options: [
        { Oid: 628, option: "z is purely real", type: 0 },
        { Oid: 629, option: "z is purely imaginary", type: 0 },
        { Oid: 630, option: "z is any complex number", type: 0 },
        {
          Oid: 631,
          option: "real part of z is same as its imaginary part",
          type: 0,
        },
      ],
    },
    {
      qid: 164,
      In_id: 1,
      CHid: 3,
      show: true,
      question: "If z is a complex number such that z = - z, then",
      type: "MCQ",
      dificulty_lvl: "1",
      contains_img: 0,
      Options: [
        { Oid: 628, option: "z is purely real", type: 0 },
        { Oid: 629, option: "z is purely imaginary", type: 0 },
        { Oid: 630, option: "z is any complex number", type: 0 },
        {
          Oid: 631,
          option: "real part of z is same as its imaginary part",
          type: 0,
        },
      ],
    },
  ]);

  const showOptions = (Options, j) => {
    return Options.map((item, index) => {
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

  return (
    <HeaderHome>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <p>Your Submission</p>
            {questionDetailsData.map((curr, i) => (
              <>
                <Box
                  key={i}
                  sx={{
                    border: 1,
                    p: 0,
                    borderColor: "#D1D1D1",
                    borderRadius: 1,
                    m: 2,
                  }}
                >
                  <Box sx={{ borderBottom: 1, p: 1.5, borderColor: "#D1D1D1" }}>
                    <h3>Questions {i + 1}</h3>
                  </Box>
                  <Box sx={{ p: 1.5 }}>
                    <p>{curr.question}</p>
                    {showOptions(curr.Options, i)}
                  </Box>
                </Box>
              </>
            ))}
          </div>
        </div>
      </div>
    </HeaderHome>
  );
}

export default AllResult;
