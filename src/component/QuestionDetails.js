import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import "../css/questionList.css";

function QuestionDetails({ history }) {
  const [questionDetailsData, setQuestionDetailsData] = useState([
    {
      qid: "1",
      question: "What is into function ?",
      q_type: "MCQ",
      diff_lvl: "mid",
      ans_id: [4],
      show: true,
      time: 0,
      options: [
        {
          id: "1",
          type: "text",
          value: "one to one",
          fileImg: "",
          isAns: false,
        },
        {
          id: "2",
          type: "text",
          value: "one to many",
          fileImg: "",
          isAns: false,
        },
        {
          type: "text",
          value: "many to many",
          fileImg: "",
          id: 3,
          isAns: false,
        },
        {
          type: "text",
          value: "many to one",
          fileImg: "",
          id: 4,
          isAns: false,
        },
      ],
    },
    {
      qid: "1",
      question: "Who am i ?",
      q_type: "MCQ",
      diff_lvl: "mid",
      ans_id: [4],
      show: false,
      time: 0,
      options: [
        {
          id: "1",
          type: "text",
          value: "one to one",
          fileImg: "",
          isAns: false,
        },
        {
          id: "2",
          type: "text",
          value: "one to many",
          fileImg: "",
          isAns: false,
        },
        {
          type: "text",
          value: "many to many",
          fileImg: "",
          id: 3,
          isAns: false,
        },
        {
          type: "text",
          value: "many to one",
          fileImg: "",
          id: 4,
          isAns: false,
        },
      ],
    },
  ]);

  const [intervalId, setIntervalId] = useState(-1);

  useEffect(() => {
    const id = setIntervalId(
      setInterval(() => {
        setQuestionDetailsData((prev) =>
          prev.map((item, j) => {
            if (j == 0) return { ...item, time: item.time + 1 };
            else return { ...item };
          })
        );
      }, 1000)
    );
    return () => {
      clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    clearTimeout(intervalId);
  }, []);

  // useEffect(() => {
  //   window.history.pushState(null, document.title, window.location.href);
  //   window.addEventListener('popstate', function (event){
  //       window.history.pushState(null, document.title,  window.location.href);
  //   });
  // }, []);

  const nextShow = (i) => {
    const qtempdata = questionDetailsData;
    if (i + 1 < questionDetailsData.length) {
      clearInterval(intervalId);
      qtempdata[i].show = false;
      qtempdata[i + 1].show = true;
      setIntervalId(
        setInterval(() => {
          setQuestionDetailsData((prev) =>
            prev.map((item, j) => {
              if (j == i + 1) return { ...item, time: item.time + 1 };
              else return { ...item };
            })
          );
        }, 1000)
      );
    }
    setQuestionDetailsData([...qtempdata]);
  };

  const prevShow = (i) => {
    const qtempdata = questionDetailsData;
    if (i - 1 >= 0) {
      clearInterval(intervalId);
      qtempdata[i].show = false;
      qtempdata[i - 1].show = true;
      setIntervalId(
        setInterval(() => {
          setQuestionDetailsData((prev) =>
            prev.map((item, j) => {
              if (j == i - 1) return { ...item, time: item.time + 1 };
              else return { ...item };
            })
          );
        }, 1000)
      );
    }
    setQuestionDetailsData([...qtempdata]);
  };

  const selectAns = (a, b) => {
    const qtempdata = questionDetailsData;
    qtempdata[a].options = qtempdata[a].options.map((item) => {
      return { ...item, isAns: false };
    });
    qtempdata[a].options[b].isAns = true;
    setQuestionDetailsData([...qtempdata]);
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
          <span>{item.value}</span>
        </Box>
      );
    });
  };

  return (
    <>
      {questionDetailsData.reduce((prev, curr, i) => {
        if (curr.show == true) {
          let qdata = (
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
                  {showOptions(curr.options, i)}
                </Box>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", m: 2 }}
              >
                <Button variant="contained" onClick={() => prevShow(i)}>
                  Prev
                </Button>
                <Button variant="contained" onClick={() => nextShow(i)}>
                  Next
                </Button>
              </Box>
            </>
          );
          prev.push(qdata);
        }
        return prev;
      }, [])}
    </>
  );
}

export default QuestionDetails;
