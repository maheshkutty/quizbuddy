import React, { useState, useRef } from "react";
import SideMenu from "./SideMenu";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@tinymce/tinymce-react";
import { Modal } from "react-bootstrap";
import DragAndDropFile from "../admin/DragDropFile";
import "../../css/addQuestion.css";

function AddQuestions() {
  const inputFile = useRef(null);
  const [show, setShow] = useState(false);
  const [qclass, setQclass] = useState("");
  const [qSub, setqSub] = useState("");
  const [qChapters, setqChapters] = useState("");
  const [fileImg, setFileImg] = useState("");
  const [noOfQuestion, setnoOfQuestion] = useState([
    {
      name: "",
      fileImg: "",
      options: [
        {
          type: "text",
          value: "",
        },
      ],
    },
  ]);

  const handelQclass = (event) => {
    setQclass(event.target.value);
  };

  const handelqSub = (event) => {
    setqSub(event.target.value);
  };

  const handelqChapters = (event) => {
    setqChapters(event.target.value);
  };
  const askPicture = () => {
    inputFile.current.click();
  };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const buildAnswerDiv = () => {};

  return (
    <SideMenu>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div></div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            className="m-1"
            color="error"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="outlined"
            className="m-1"
            color="success"
            onClick={handleClose}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col m-2">
        <h1>Hello World</h1>
        <Button varient="outlined" onClick={handleShow}>
          Show
        </Button>
        <div className="col">
          <input
            type="file"
            id="file"
            onChange={(e) => {
              var reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = function () {
                setFileImg(reader.result);
                console.log(reader.result);
              };
              reader.onerror = function (error) {
                console.log("Error: ", error);
              };
            }}
            ref={inputFile}
            style={{ display: "none" }}
          />
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
              <MenuItem value="1">11th</MenuItem>
              <MenuItem value="2">12th</MenuItem>
            </Select>
          </FormControl>
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
              <MenuItem value="1">Maths</MenuItem>
              <MenuItem value="2">Chemistry</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="chapters">Chapters</InputLabel>
            <Select
              id="chapters"
              labelId="chapterslabel"
              label="Chapters"
              value={qChapters}
              onChange={handelqChapters}
              sx={{ marginBottom: 1 }}
            >
              <MenuItem value="1">Calculus</MenuItem>
              <MenuItem value="2">Chemistry</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col">
          <div className="qinput">
            <div>
              {fileImg == "" ? null : (
                <div className="answerContiner">
                  <img src={fileImg} className="qImgAns" />
                  <FontAwesomeIcon icon="fa-trash" className="trashIcons" />
                </div>
              )}
              <TextField
                label="Question"
                fullWidth
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
              <div className="p-2">
                <TextField
                  label="Answers"
                  fullWidth
                  onClick={() => {
                    console.log("hello");
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon="fa-image" fontSize="30px" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <Button variant="outlined" fullWidth>
              Add Questions
            </Button>
          </div>
        </div>
      </div>
    </SideMenu>
  );
}

export default AddQuestions;
