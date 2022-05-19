import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import "../css/questionList.css";
import { useLocation } from "react-router-dom";

function QuestionDetails({questionDetailsData, setQuestionDetailsData}) {
  useEffect(() => {
    if (questionDetailsData != undefined) {
      // console.log(questionDetailsData);
      // let data = questionDetailsData;
      // console.log(data);
      // data = data.map((item) => {
      //   item.show = false;
      //   return item;
      // });
      // data[0].show = true;
      // setQuestionDetailsData([...data]);
    }
  }, []);

  // const [questionDetailsData, setQuestionDetailsData] = useState([
  //   {
  //     qid: 164,
  //     In_id: 1,
  //     CHid: 3,
  //     show: true,
  //     question: "If z is a complex number such that z = - z, then",
  //     type: "MCQ",
  //     dificulty_lvl: "1",
  //     contains_img: 0,
  //     Options: [
  //       { Oid: 628, option: "z is purely real", type: 0 },
  //       { Oid: 629, option: "z is purely imaginary", type: 0 },
  //       { Oid: 630, option: "z is any complex number", type: 0 },
  //       {
  //         Oid: 631,
  //         option: "real part of z is same as its imaginary part",
  //         type: 0,
  //       },
  //     ],
  //   },
  // ]);

  // const [questionDetailsData, setQuestionDetailsData] = useState([
  //   {
  //     qid: "1",
  //     question: "What is into function ?",
  //     q_type: "MCQ",
  //     diff_lvl: "mid",
  //     ans_id: [4],
  //     show: true,
  //     time: 0,
  //     Options: [
  //       {
  //         id: "1",
  //         type: "text",
  //         value: "one to one",
  //         fileImg: "",
  //         isAns: false,
  //       },
  //       {
  //         id: "2",
  //         type: "text",
  //         value: "one to many",
  //         fileImg: "",
  //         isAns: false,
  //       },
  //       {
  //         type: "text",
  //         value: "many to many",
  //         fileImg: "",
  //         id: 3,
  //         isAns: false,
  //       },
  //       {
  //         type: "text",
  //         value: "many to one",
  //         fileImg: "",
  //         id: 4,
  //         isAns: false,
  //       },
  //     ],
  //   },
  //   {
  //     qid: "1",
  //     question: "Who am i ?",
  //     q_type: "MCQ",
  //     diff_lvl: "mid",
  //     ans_id: [4],
  //     show: false,
  //     time: 0,
  //     Options: [
  //       {
  //         id: "1",
  //         type: "text",
  //         value: "one to one",
  //         fileImg: "",
  //         isAns: false,
  //       },
  //       {
  //         id: "2",
  //         type: "text",
  //         value: "one to many",
  //         fileImg: "",
  //         isAns: false,
  //       },
  //       {
  //         type: "text",
  //         value: "many to many",
  //         fileImg: "",
  //         id: 3,
  //         isAns: false,
  //       },
  //       {
  //         type: "text",
  //         value: "many to one",
  //         fileImg: "",
  //         id: 4,
  //         isAns: false,
  //       },
  //     ],
  //   },
  // ]);

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
    qtempdata[a].Options = qtempdata[a].Options.map((item) => {
      return { ...item, isAns: false };
    });
    qtempdata[a].Options[b].isAns = true;
    setQuestionDetailsData([...qtempdata]);
  };

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
                  {showOptions(curr.Options, i)}
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
