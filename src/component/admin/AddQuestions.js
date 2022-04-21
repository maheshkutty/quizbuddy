import React, { useState, useCallback, useEffect } from "react";
import SideMenu from "./SideMenu";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import "../../css/addQuestion.css";
import { getClassesAction } from "../../actions/ClassesAction";
import { getSubjectsAction } from "../../actions/SubjectsAction";
import qbuddy from "../../api/qbuddy";
import QuizTab from "./QuizTab";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  qclass: yup.string().required("Select class !"),
  qSub: yup.string().required("Select subject !"),
  qChapter: yup.string().required("Select chapter !"),
});

function AddQuestions(props) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      qclass: "",
      qSub: "",
      qChapter: "",
    },
    resolver: yupResolver(schema),
  });

  const [show, setShow] = useState(false);

  const [noOfQuestion, setnoOfQuestion] = useState([
    {
      name: "",
      fileImg: "",
      diff_lvl: 0,
      options: [
        {
          id: "1",
          type: "text",
          value: "",
          fileImg: "",
          isAns: false,
        },
        {
          id: "2",
          type: "text",
          value: "",
          fileImg: "",
          isAns: false,
        },
      ],
    },
  ]);

  const [qChaptersList, setQChaptersList] = useState([]);
  const [qsubList, setQsubList] = useState([]);

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
    let tempData = props.qsub.data.filter(
      (item) => item.Cid == event.target.value
    );
    setQChaptersList([]);
    setQsubList([...tempData]);
  };

  const handelqSub = (event) => {
    setQChaptersList([]);
    getChaptersList(event.target.value);
  };

  const getChaptersList = async (sid) => {
    console.log(sid);
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

  const saveQuiz = ({ qclass, qSub, qChapter }) => {
    let questionPayload = {};
    console.log(qclass);
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
          ans_id: q.options.reduce((prev, curr) => {
            if (curr.isAns) prev.push(curr.id);
            return prev;
          }, []),
          options: q.options.filter((option) => option.value != ""),
        }));
      console.log(questionPayload);
    }
  };

  return (
    <SideMenu>
      <div className="col m-2">
        <form onSubmit={handleSubmit(saveQuiz)}>
          <div className="d-flex flex-wrap">
            <div className="col-6 p-2">
              <FormControl fullWidth>
                <InputLabel id="classlabel">Classess</InputLabel>
                <Select
                  id="class"
                  labelId="classlabel"
                  label="Classess"
                  error={errors.qclass?.type == "required" ? true : false}
                  {...register("qclass", {
                    onBlur: handelQclass,
                  })}
                  sx={{ marginBottom: 1 }}
                >
                  {props.qclass.data.map((item) => (
                    <MenuItem value={item.Cid.toString()}>
                      {item.Class}
                    </MenuItem>
                  ))}
                </Select>
                {errors.qclass?.message ? (
                  <FormHelperText error>{errors.qclass.message}</FormHelperText>
                ) : null}
              </FormControl>
            </div>
            <div className="col-6 p-2">
              <FormControl fullWidth>
                <InputLabel id="subject">Subjects</InputLabel>
                <Select
                  id="subject"
                  labelId="subjectlabel"
                  label="Subjects"
                  error={errors.qSub?.type == "required" ? true : false}
                  {...register("qSub", {
                    onBlur: handelqSub,
                  })}
                  sx={{ marginBottom: 1 }}
                >
                  {qsubList.map((item) => (
                    <MenuItem value={item.Sid.toString()}>
                      {item.Subject}
                    </MenuItem>
                  ))}
                </Select>
                {errors.qSub?.message ? (
                  <FormHelperText error>{errors.qSub.message}</FormHelperText>
                ) : null}
              </FormControl>
            </div>
            <div className="col-6 p-2">
              <FormControl fullWidth>
                <InputLabel id="chapters">Chapters</InputLabel>
                <Select
                  id="chapters"
                  labelId="chapterslabel"
                  label="Chapters"
                  error={errors.qChapter?.type == "required" ? true : false}
                  {...register("qChapter")}
                  sx={{ marginBottom: 1 }}
                >
                  {qChaptersList.map((item) => (
                    <MenuItem value={item.CHid.toString()}>
                      {item.Chapter}
                    </MenuItem>
                  ))}
                </Select>
                {errors.qChapter?.message ? (
                  <FormHelperText error>
                    {errors.qChapter.message}
                  </FormHelperText>
                ) : null}
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
                <Button type="submit" variant="outlined">
                  Save Quiz
                </Button>
              </div>
            </div>
          </div>
        </form>
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
