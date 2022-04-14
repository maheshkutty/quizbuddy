import React, { useRef } from "react";
import "../../css/addQuestion.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

const QuizTab = ({ noOfQuestion, setnoOfQuestion }) => {
  const inputFile = useRef(null);
  const fileSubmitHandel = (e, key) => {
    var reader = new FileReader();
    var fileTypes = ["jpg", "jpeg", "png"];
    let extension = e.target.files[0].name.split(".").pop().toLowerCase();
    let isSuccess = fileTypes.indexOf(extension) > -1;
    if (isSuccess && e.target.files[0].size < 500000) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        let noOfQuestiontemp = noOfQuestion;
        noOfQuestiontemp[key].fileImg = reader.result;
        setnoOfQuestion([...noOfQuestiontemp]);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    } else {
      console.log("Only images allowed with size less than 500kb");
    }
  };

  const fileSubmitAnsHandel = (e, key, ansIndex) => {
    var reader = new FileReader();
    var fileTypes = ["jpg", "jpeg", "png"];
    let extension = e.target.files[0].name.split(".").pop().toLowerCase();
    let isSuccess = fileTypes.indexOf(extension) > -1;
    if (isSuccess && e.target.files[0].size < 500000) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        let noOfQuestiontemp = noOfQuestion;
        noOfQuestiontemp[key].options[ansIndex].fileImg = reader.result;
        setnoOfQuestion([...noOfQuestiontemp]);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    } else {
      console.log("Only images allowed with size less than 500kb");
    }
  };

  const addAnswers = (i, ansIndex, val) => {
    let noOfQuestionT = noOfQuestion;
    let opLength = noOfQuestionT[i].options.length;
    if (opLength - 1 == ansIndex) {
      noOfQuestionT[i].options.push({
        type: "text",
        value: "",
        fileImg: "",
        id: opLength + 1,
      });
      noOfQuestionT[i].options[ansIndex]["value"] = val.target.value;
    } else {
      noOfQuestionT[i].options[ansIndex]["value"] = val.target.value;
    }
    setnoOfQuestion([...noOfQuestionT]);
  };

  const deleteAnswer = (i, ansIndex) => {
    let noOfQuestionT = noOfQuestion;
    noOfQuestionT[i].options = noOfQuestionT[i].options.filter(
      (val, i) => i != ansIndex
    );
    setnoOfQuestion([...noOfQuestionT]);
  };

  const addQuestion = () => {
    let noOfQuestionT = noOfQuestion;
    noOfQuestionT.push({
      name: "",
      fileImg: "",
      options: [
        {
          type: "text",
          value: "",
          fileImg: "",
        },
        {
          type: "text",
          value: "",
          fileImg: "",
        },
      ],
    });
    setnoOfQuestion([...noOfQuestion]);
  };

  const deleteQuestion = (i) => {
    if (noOfQuestion.length > 1) {
      let noOfQuestionT = noOfQuestion;
      noOfQuestionT = noOfQuestionT.filter((item, itemI) => itemI != i);
      setnoOfQuestion([...noOfQuestionT]);
    }
  };

  const askPicture = () => {
    inputFile.current.click();
  };

  const handleLevel = (e, i) => {
    let noOfQuestionT = noOfQuestion;
    noOfQuestionT[i].diff_lvl = e.target.value;
    setnoOfQuestion([...noOfQuestionT]);
  };

  const buildAnswerDiv = () => {
    return noOfQuestion.map((item, i) => {
      return (
        <>
          <div key={i} className="listqcontainer">
            <div className="d-flex p-2 pb-4 justify-content-between">
              <p>Multiple Choice Question : {i + 1}</p>
              <FontAwesomeIcon
                icon="fa-trash"
                fontSize="30px"
                onClick={() => deleteQuestion(i)}
              />
            </div>
            <div className="col">
              <input
                type="file"
                id="file"
                onChange={(e) => {
                  fileSubmitHandel(e, i);
                }}
                ref={inputFile}
                style={{ display: "none" }}
              />
              {item.fileImg == "" ? null : (
                <div className="questionContiner">
                  <img src={item.fileImg} className="qImg" />
                  <FontAwesomeIcon icon="fa-trash" className="trashIcons" />
                </div>
              )}
              <div className="col">
                <div className="row">
                  <div className="col-10">
                    <TextField
                      fullWidth
                      label="Question"
                      value={item.name}
                      onChange={(e) => {
                        let t = noOfQuestion;
                        noOfQuestion[i].name = e.target.value;
                        setnoOfQuestion([...t]);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FontAwesomeIcon
                              onClick={askPicture}
                              icon="fa-image"
                              fontSize="30px"
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ marginBottom: 2 }}
                    />
                  </div>
                  <div className="col">
                    <FormControl fullWidth>
                      <InputLabel id="level">Level</InputLabel>
                      <Select
                        id="level"
                        labelId="levellabel"
                        label="Level"
                        value={item.diff_lvl}
                        onChange={(e) => handleLevel(e, i)}
                        sx={{ marginBottom: 1 }}
                      >
                        <MenuItem value="1">Low</MenuItem>
                        <MenuItem value="2">Medium</MenuItem>
                        <MenuItem value="3">High</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row flex-wrap justify-content-around">
                {item.options.map((item, ansIndex) => (
                  <div key={ansIndex} className="col-6 p-1">
                    <input
                      type="file"
                      id={`file_ans_${i}_${ansIndex}`}
                      onChange={(e) => {
                        fileSubmitAnsHandel(e, i, ansIndex);
                      }}
                      style={{ display: "none" }}
                    />
                    {item.fileImg == "" ? null : (
                      <div className="answerContiner col">
                        <img src={item.fileImg} className="qImgAns" />
                        <FontAwesomeIcon
                          icon="fa-trash"
                          className="trashIcons"
                        />
                      </div>
                    )}
                    <TextField
                      label="Answers"
                      fullWidth
                      value={noOfQuestion[i].options[ansIndex].value}
                      onChange={(e) => addAnswers(i, ansIndex, e)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FontAwesomeIcon
                              icon="fa-image"
                              fontSize="30px"
                              onClick={() =>
                                document
                                  .getElementById(`file_ans_${i}_${ansIndex}`)
                                  .click()
                              }
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="start">
                            <FontAwesomeIcon
                              icon="fa-trash"
                              fontSize="25px"
                              opacity="0.8"
                              onClick={() => deleteAnswer(i, ansIndex)}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    });
  };
  return (
    <div className="qinput">
      {buildAnswerDiv()}
      <Button variant="contained" fullWidth onClick={addQuestion}>
        Add Questions
      </Button>
    </div>
  );
};

export default QuizTab;
