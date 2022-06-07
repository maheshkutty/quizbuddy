import React, { useEffect, useState } from "react";
import HeaderHome from "./HeaderHome";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import qbuddy from "../api/qbuddy";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import "../css/questionList.css";
import Result from "./Result";
import Loader from "./utils/Loader";

const data = {
  status: "success",
  msg: "Successfuly read Submitted Quizzes",
  res: [
    {
      Aid: 3,
      St_id: 4,
      Quiz_id: 5,
      score: 0,
      n_corr_low: 0,
      n_wron_low: 3,
      n_unat_low: 3,
      n_corr_mod: 0,
      n_wron_mod: 0,
      n_unat_mod: 10,
      n_corr_hig: 0,
      n_wron_hig: 0,
      n_unat_hig: 4,
      date_time: "2022-06-07T09:59:37",
      questions: [
        {
          qid: 164,
          time_taken: 0,
          status: "Wrong",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 164,
                In_id: 1,
                CHid: 3,
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
            ],
          },
          ans: 629,
        },
        {
          qid: 139,
          time_taken: 65,
          status: "Wrong",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 139,
                In_id: 1,
                CHid: 2,
                question:
                  "The total number of subsets of a finite set A has 56 more elements than the total number of subsets of another finite set B. What is the number of elements in the set A?",
                type: "MCQ",
                dificulty_lvl: "1",
                contains_img: 0,
                Options: [
                  { Oid: 533, option: "5", type: 0 },
                  { Oid: 534, option: "6", type: 0 },
                  { Oid: 535, option: "7", type: 0 },
                  { Oid: 536, option: "8", type: 0 },
                ],
              },
            ],
          },
          ans: 534,
        },
        {
          qid: 140,
          time_taken: 4,
          status: "Wrong",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 140,
                In_id: 1,
                CHid: 2,
                question: "The set A = {x: I 2x + 3 I< 7}isequal to the set",
                type: "MCQ",
                dificulty_lvl: "1",
                contains_img: 0,
                Options: [
                  { Oid: 537, option: "D = {x :0< x+5<7}", type: 0 },
                  { Oid: 538, option: "B = {x :- 3<x<7}", type: 0 },
                  { Oid: 539, option: "E = {x:-7<x<7}", type: 0 },
                  { Oid: 540, option: "C={x:-13<2x<4}", type: 0 },
                ],
              },
            ],
          },
          ans: 537,
        },
        {
          qid: 153,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 153,
                In_id: 1,
                CHid: 2,
                question:
                  "If f(x) is an odd periodic function with period 2, then f(4) is equal to",
                type: "MCQ",
                dificulty_lvl: "1",
                contains_img: 0,
                Options: [
                  { Oid: 589, option: "-4", type: 0 },
                  { Oid: 590, option: "4", type: 0 },
                  { Oid: 591, option: "2", type: 0 },
                ],
              },
            ],
          },
          ans: null,
        },
        {
          qid: 144,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 144,
                In_id: 1,
                CHid: 2,
                question:
                  "There are 100 students in a class. In the examination, 50 of them failed in Mathematics, 45 failed in Physics, 40 failed in Biology and 32 failed in exactly two of the three subjects. Only one student passed in all the subjects. Then, the number of students failing in all the three subjects",
                type: "MCQ",
                dificulty_lvl: "1",
                contains_img: 0,
                Options: [
                  { Oid: 553, option: "is 12", type: 0 },
                  { Oid: 554, option: "is 4", type: 0 },
                  { Oid: 555, option: "is 2", type: 0 },
                  { Oid: 556, option: "Cannot be determined", type: 0 },
                ],
              },
            ],
          },
          ans: 555,
        },
        {
          qid: 150,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 150,
                In_id: 1,
                CHid: 2,
                question:
                  "The function f(x) = x^2 + bx + c, where b and care real constants, describes",
                type: "MCQ",
                dificulty_lvl: "1",
                contains_img: 0,
                Options: [
                  { Oid: 577, option: "one-one mapping", type: 0 },
                  { Oid: 578, option: "onto mapping", type: 0 },
                  { Oid: 579, option: "not one-one but onto mapping", type: 0 },
                  {
                    Oid: 580,
                    option: "neither one-one nor onto mapping",
                    type: 0,
                  },
                ],
              },
            ],
          },
          ans: 580,
        },
        {
          qid: 152,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 152,
                In_id: 1,
                CHid: 2,
                question: "For real x, if f(x) = x^3 + 5x + 1, then",
                type: "MCQ",
                dificulty_lvl: "2",
                contains_img: 0,
                Options: [
                  { Oid: 585, option: "f is one-one but not onto R", type: 0 },
                  { Oid: 586, option: "f is onto R but not one-one", type: 0 },
                  { Oid: 587, option: "f is one-one and onto R", type: 0 },
                  {
                    Oid: 588,
                    option: "f is neither one-one nor onto R",
                    type: 0,
                  },
                ],
              },
            ],
          },
          ans: 587,
        },
        {
          qid: 160,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 160,
                In_id: 1,
                CHid: 3,
                question:
                  "If i = sq.root(-1) and n is a positive integer, then i^n + i^(n+1) + i^(n+2) + i^(n+3) is equal to",
                type: "MCQ",
                dificulty_lvl: "2",
                contains_img: 0,
                Options: [
                  { Oid: 613, option: "1", type: 0 },
                  { Oid: 614, option: "i", type: 0 },
                  { Oid: 615, option: "i^n", type: 0 },
                ],
              },
            ],
          },
          ans: null,
        },
        {
          qid: 138,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 138,
                In_id: 1,
                CHid: 2,
                question:
                  "If X = {4n -3n- l :n eN} and Y = {9(n- l):ne N}, where N is the set of natural numbers, then X u Y is equal to",
                type: "MCQ",
                dificulty_lvl: "2",
                contains_img: 0,
                Options: [
                  { Oid: 529, option: "N", type: 0 },
                  { Oid: 530, option: "Y-X", type: 0 },
                  { Oid: 531, option: "X", type: 0 },
                  { Oid: 532, option: "Y", type: 0 },
                ],
              },
            ],
          },
          ans: 532,
        },
        {
          qid: 142,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 142,
                In_id: 1,
                CHid: 2,
                question:
                  "There is a group of265 persons who like either singing or dancing or painting. In this group, 200 like singing, 110 like dancing and 55 like painting. If 60 persons like both singing and dancing, 30 like both singing and painting and 10 like all three activities, then the number of persons who like only dancing and painting is ",
                type: "MCQ",
                dificulty_lvl: "2",
                contains_img: 0,
                Options: [
                  { Oid: 545, option: "10", type: 0 },
                  { Oid: 546, option: "20", type: 0 },
                  { Oid: 547, option: "30", type: 0 },
                  { Oid: 548, option: "40", type: 0 },
                ],
              },
            ],
          },
          ans: 545,
        },
        {
          qid: 155,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 155,
                In_id: 1,
                CHid: 2,
                question:
                  "If a function f satisfies f {f(x)} = x + 1 for all real values of x and f(0) = 1/2 ,then f(1)is equal to",
                type: "MCQ",
                dificulty_lvl: "2",
                contains_img: 0,
                Options: [
                  { Oid: 596, option: "1/2", type: 0 },
                  { Oid: 597, option: "1", type: 0 },
                  { Oid: 598, option: "3/2", type: 0 },
                  { Oid: 599, option: "2", type: 0 },
                ],
              },
            ],
          },
          ans: 598,
        },
        {
          qid: 147,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 147,
                In_id: 1,
                CHid: 2,
                question:
                  "If R is a relation on the set N, defined by {(x,y):2x - y = l0},then R is",
                type: "MCQ",
                dificulty_lvl: "2",
                contains_img: 0,
                Options: [
                  { Oid: 565, option: "reflexive", type: 0 },
                  { Oid: 566, option: "symmetric", type: 0 },
                  { Oid: 567, option: "transitive", type: 0 },
                  { Oid: 568, option: "None of these", type: 0 },
                ],
              },
            ],
          },
          ans: 568,
        },
        {
          qid: 157,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 157,
                In_id: 1,
                CHid: 3,
                question:
                  "If z is a complex number such that the imagina1y part of z is non-zero and a = z^2 + z + 1 is real. Then, a cannot take the value",
                type: "MCQ",
                dificulty_lvl: "2",
                contains_img: 0,
                Options: [
                  { Oid: 601, option: "-1", type: 0 },
                  { Oid: 602, option: "1/3", type: 0 },
                  { Oid: 603, option: "1/2", type: 0 },
                  { Oid: 604, option: "3/4", type: 0 },
                ],
              },
            ],
          },
          ans: 604,
        },
        {
          qid: 151,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 151,
                In_id: 1,
                CHid: 2,
                question:
                  " If A = {l, 3, 5, 7} and B = {l, 2, 3, 4, 5, 6, 7, 8}, then the number of one-one function from A into B is",
                type: "MCQ",
                dificulty_lvl: "2",
                contains_img: 0,
                Options: [
                  { Oid: 581, option: "1340", type: 0 },
                  { Oid: 582, option: "1680", type: 0 },
                  { Oid: 583, option: "1430", type: 0 },
                  { Oid: 584, option: "1880", type: 0 },
                ],
              },
            ],
          },
          ans: 582,
        },
        {
          qid: 158,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 158,
                In_id: 1,
                CHid: 3,
                question:
                  "lf 2x = 3 + 5i, then the value of 2x^3 + 2x^2 - 7x + 72 is",
                type: "MCQ",
                dificulty_lvl: "2",
                contains_img: 0,
                Options: [
                  { Oid: 605, option: "4", type: 0 },
                  { Oid: 606, option: "-4", type: 0 },
                  { Oid: 607, option: "8", type: 0 },
                  { Oid: 608, option: "-8", type: 0 },
                ],
              },
            ],
          },
          ans: 605,
        },
        {
          qid: 167,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 167,
                In_id: 1,
                CHid: 3,
                question:
                  "The number of non-zero integral solutions of the equation |1-i|^x = 2^x  is",
                type: "MCQ",
                dificulty_lvl: "2",
                contains_img: 0,
                Options: [
                  { Oid: 640, option: "infinite", type: 0 },
                  { Oid: 641, option: "1", type: 0 },
                  { Oid: 642, option: "2", type: 0 },
                  { Oid: 643, option: "None of the above", type: 0 },
                ],
              },
            ],
          },
          ans: 643,
        },
        {
          qid: 162,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 162,
                In_id: 1,
                CHid: 3,
                question:
                  "The modulus of the complex number z such that |z+3-i| = 1 and arg(z) = Pi is equal to",
                type: "MCQ",
                dificulty_lvl: "3",
                contains_img: 0,
                Options: [
                  { Oid: 620, option: "1", type: 0 },
                  { Oid: 621, option: "2", type: 0 },
                  { Oid: 622, option: "3", type: 0 },
                  { Oid: 623, option: "4", type: 0 },
                ],
              },
            ],
          },
          ans: 622,
        },
        {
          qid: 159,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 159,
                In_id: 1,
                CHid: 3,
                question: "lf (x + iy)^1/3 = 2 + 3i, then 3x + 2y is equal to",
                type: "MCQ",
                dificulty_lvl: "3",
                contains_img: 0,
                Options: [
                  { Oid: 609, option: "-20", type: 0 },
                  { Oid: 610, option: "-60", type: 0 },
                  { Oid: 611, option: "-120", type: 0 },
                  { Oid: 612, option: "60", type: 0 },
                ],
              },
            ],
          },
          ans: 611,
        },
        {
          qid: 154,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 154,
                In_id: 1,
                CHid: 2,
                question: "If f(x) = 2x^6 + 3x^4 + 4x^2 , then f^-1(x) is",
                type: "MCQ",
                dificulty_lvl: "3",
                contains_img: 0,
                Options: [
                  { Oid: 592, option: "even function", type: 0 },
                  { Oid: 593, option: "an odd function", type: 0 },
                  { Oid: 594, option: "neither even nor odd", type: 0 },
                  { Oid: 595, option: "None of these", type: 0 },
                ],
              },
            ],
          },
          ans: 593,
        },
        {
          qid: 165,
          time_taken: 0,
          status: "Unattempted",
          deatils: {
            status: "success",
            msg: "Successfuly Read",
            res: [
              {
                qid: 165,
                In_id: 1,
                CHid: 3,
                question:
                  "A and B are two points on the argand plane such that the segment AB is bisected at the point (0, 0). If the point A, which is in the third quadrant has principal amplitude theta, then the principal amplitude of the point B is",
                type: "MCQ",
                dificulty_lvl: "3",
                contains_img: 0,
                Options: [
                  { Oid: 632, option: "negative theta", type: 0 },
                  { Oid: 633, option: "pi - theta", type: 0 },
                  { Oid: 634, option: "theta - pi", type: 0 },
                  { Oid: 635, option: "pi + theta", type: 0 },
                ],
              },
            ],
          },
          ans: 635,
        },
      ],
    },
  ],
};

function QuizResult() {
  const params = useParams();
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    console.log(resultData);
    async function callShowResult() {
      console.log(params);
      let response = await qbuddy.post(
        `/student/showresult/?aid=${params.aid}`
      );
      response = response.data;
      console.log(response);
      if (response.status == "success") setResultData(response.res[0]);
    }
    callShowResult();
  }, []);

  const showOptions = (Options, j, ans) => {
    console.log();
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
        >
          <span
            className={
              ans == item.Oid ? "qComponent correctAnswer" : "qComponent"
            }
            style={{ marginRight: "10px" }}
          >
            {String.fromCharCode(index + 65)}
          </span>
          <span>{item.option}</span>
        </Box>
      );
    });
  };

  const showAnswer = () => {
    if (resultData != null) {
      console.log("hellow");
      return resultData.questions.map((q, i) => {
        return (
          <Grid item md={12}>
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
                <div className="row">
                  <div className="col-5">
                    <h3>Questions {i + 1}</h3>
                  </div>
                </div>
              </Box>
              <Box sx={{ p: 1.5 }}>
                <p>{q.deatils.res[0].question}</p>
                {showOptions(q.deatils.res[0].Options, i, q.ans)}
              </Box>
            </Box>
          </Grid>
        );
      });
    }
    return null;
  };

  if (resultData == null) {
    return (
      <HeaderHome>
        <Loader color="#ec407a" />
      </HeaderHome>
    );
  }

  return (
    <HeaderHome>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <Grid container>{showAnswer()}</Grid>
          </div>
          <div className="col mt-2">
            {resultData != null ? (
              <Card sx={{ minWidth: 180 }}>
                <CardContent>
                  <Result score={resultData.score} total={100} />
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </HeaderHome>
  );
}

export default QuizResult;
