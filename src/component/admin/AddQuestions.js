import React, { useState, useCallback, useEffect } from "react";
import SideMenu from "./SideMenu";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import "../../css/addQuestion.css";
import { getClassesAction } from "../../actions/ClassesAction";
import { getSubjectsAction } from "../../actions/SubjectsAction";
import qbuddy from "../../api/qbuddy";
import QuizTab from "./QuizTab";

function AddQuestions(props) {
  const [show, setShow] = useState(false);
  const [qclass, setQclass] = useState("");
  const [qSub, setqSub] = useState(1);
  const [qChapter, setqChapter] = useState("");
  const [qChaptersList, setQChaptersList] = useState([]);
  const [qsubList, setQsubList] = useState([]);
  const [noOfQuestion, setnoOfQuestion] = useState([
    {
      name: "",
      fileImg: "",
      options: [
        {
          id: "1",
          type: "text",
          value: "",
          fileImg: "",
        },
        {
          id: "2",
          type: "text",
          value: "",
          fileImg: "",
        },
      ],
    },
  ]);

  const createDataTable = useCallback(() => {
    if (props.qsub.data.length === 0) {
      props.getSubjectsAction(1);
    }
    if (props.qclass.data.length === 0) {
      props.getClassesAction();
    }
  }, []);

  useEffect(() => {
    createDataTable();
  }, [createDataTable]);

  const handelQclass = (event) => {
    setQclass(event.target.value);
    let tempData = props.qsub.data.filter(
      (item) => item.Cid == event.target.value
    );
    setqSub("");
    setqChapter("");
    setQChaptersList([]);
    setQsubList([...tempData]);
  };

  const handelqSub = (event) => {
    setqSub(event.target.value);
    getChaptersList(event.target.value);
  };

  const handelqChapter = (event) => {
    setqChapter(event.target.value);
  };

  const getChaptersList = async (sid) => {
    if (sid != "") {
      let res = await qbuddy.get(`/admin/subject/${sid}/chapters`);
      res = res.data.res;
      setQChaptersList([...res]);
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const checkQOption = (options) => {
    let result = true;
    if (options.length >= 2) {
      for (let i = 0; i < 2; i++) {
        if (options[i].value == "" && options[i].fileImg == "") {
          result = false;
          break;
        }
      }
    } else {
      result = false;
    }
    return result;
  };

  const saveQuiz = () => {
    let questionPayload = {};
    let isQuestionExist = noOfQuestion[0].name != "" ? true : false;
    let isOptionExist = checkQOption(noOfQuestion[0].options);
    if (isQuestionExist && isOptionExist) {
      questionPayload.classid = qclass;
      questionPayload.sub_id = qSub;
      questionPayload.chap_id = qChapter;
      questionPayload.questions = noOfQuestion
        .filter(
          (q) => (q.name != "" || q.fileImg != "") && checkQOption(q.options)
        )
        .map((q) => ({
          question: q.name,
          q_type: "multi",
          diff_lvl: "1",
          ans_id: [1],
          options: q.options.filter((option) => option.value != ""),
        }));
      console.log(questionPayload);
    }
  };

  return (
    <SideMenu>
      <div className="col m-2">
        <div className="d-flex flex-wrap">
          <div className="col-6 p-2">
            <FormControl fullWidth>
              <InputLabel id="classlabel">Classess</InputLabel>
              <Select
                id="class"
                labelId="classlabel"
                label="Classess"
                value={qclass}
                onChange={handelQclass}
                sx={{ marginBottom: 1 }}
              >
                {props.qclass.data.map((item) => (
                  <MenuItem value={item.Cid}>{item.Class}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-6 p-2">
            <FormControl fullWidth>
              <InputLabel id="subject">Subjects</InputLabel>
              <Select
                id="subject"
                labelId="subjectlabel"
                label="Subjects"
                value={qSub}
                onChange={handelqSub}
                sx={{ marginBottom: 1 }}
              >
                {qsubList.map((item) => (
                  <MenuItem value={item.Sid}>{item.Subject}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-6 p-2">
            <FormControl fullWidth>
              <InputLabel id="chapters">Chapters</InputLabel>
              <Select
                id="chapters"
                labelId="chapterslabel"
                label="Chapters"
                value={qChapter}
                onChange={handelqChapter}
                sx={{ marginBottom: 1 }}
              >
                {qChaptersList.map((item) => (
                  <MenuItem value={item.CHid}>{item.Chapter}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <QuizTab
          noOfQuestion={noOfQuestion}
          setnoOfQuestion={setnoOfQuestion}
        />
        <div className="d-flex mt-2 justify-content-between">
          <div className="col">
            <Button variant="outlined">Reset Quiz</Button>
          </div>
          <div className="col-3 d-flex justify-content-between">
            <div>
              <Button variant="outlined">Preview Quiz</Button>
            </div>
            <div>
              <Button variant="outlined" onClick={saveQuiz}>
                Save Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SideMenu>
  );
}

const mapStateToProps = (state) => {
  return {
    qsub: state.qsub,
    qclass: state.qclass,
  };
};

export default connect(mapStateToProps, {
  getClassesAction,
  getSubjectsAction,
})(AddQuestions);
