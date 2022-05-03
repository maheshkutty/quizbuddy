import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import QuizCard from "./QuizCard";

import "../css/dashboard.css";
import { connect } from "react-redux";
import { getClassesAction } from "../actions/ClassesAction";
import { getSubjectsAction } from "../actions/SubjectsAction";
import QuizTheme from "../theme/appTheme";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Dashboard(props) {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    if (props.qsub.data.length === 0) {
      props.getSubjectsAction();
    }
    if (props.qclass.data.length === 0) {
      props.getClassesAction();
    }
  }, []);

  useEffect(() => {
    let classListTemp = props.qclass.data;
    classListTemp = classListTemp.map((item) => {
      return { ...item, open: false, checked: false };
    });
    console.log(classListTemp);
    setClassList(classListTemp);
  }, [props.qclass.data]);

  const handleClass = (event) => {
    const {
      target: { value },
    } = event;
    setClasses(typeof value === "string" ? value.split(",") : value);
    let classCidToName = {};
    props.qclass.data.forEach((element) => {
      classCidToName[element.Cid] = element.Class;
    });
    let tempData = [];
    tempData = props.qsub.data.reduce((prev, curr) => {
      if (value.indexOf(curr.Cid) >= 0) {
        let newSubject = { ...curr };
        newSubject.Subject = classCidToName[curr.Cid] + " " + curr.Subject;
        prev.push(newSubject);
      }
      return prev;
    }, []);
    setSubjectList([...tempData]);
  };

  const handleSubject = (event) => {
    const {
      target: { value },
    } = event;
    setSubjects(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChapter = (event) => {
    const {
      target: { value },
    } = event;
    setSubjects(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClassClick = (i) => {
    let temp = classList;
    temp[i].open = !temp[i].open;
    setClassList([...temp]);
  };

  function checkAnswer(i) {
    let temp = classList;
    temp[i].checked = !temp[i].checked;
    setClassList([...temp]);
  }

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col">
          <List
            sx={{
              width: "100%",
              maxWidth: 200,
              bgcolor: "background.paper",
              color: "#999",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                sx={{ fontSize: 20 }}
                disableGutters="true"
              >
                Filter By
              </ListSubheader>
            }
          >
            <ListSubheader
              disableGutters="true"
              component="div"
              sx={{ lineHeight: 2 }}
            >
              Class
            </ListSubheader>
            {classList.map((item, i) => (
              <>
                <ListItemButton
                  component="a"
                  onClick={() => handleClassClick(i)}
                  sx={{ p: 0 }}
                >
                  <Checkbox
                    value={item.Cid}
                    size="small"
                    checked={item.checked}
                    onChange={() => checkAnswer(i)}
                  />
                  <ListItemText
                    primary={item.Class}
                    sx={{ my: 0 }}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                      letterSpacing: 0,
                    }}
                  />
                  {item.open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={item.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ p: 0, pl: 2 }}>
                      <Checkbox value="0" size="small" />
                      <ListItemText
                        primary="All"
                        sx={{ my: 0 }}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                          letterSpacing: 0,
                        }}
                      />
                    </ListItemButton>
                    {props.qsub.data.reduce((prev, curr) => {
                      if (item.Cid == curr.Cid) {
                        let newSub = (
                          <ListItemButton sx={{ p: 0, pl: 2 }}>
                            <Checkbox value={curr.Sid} size="small" />
                            <ListItemText
                              primary={curr.Subject}
                              sx={{ my: 0 }}
                              primaryTypographyProps={{
                                fontSize: 14,
                                fontWeight: "medium",
                                letterSpacing: 0,
                              }}
                            />
                          </ListItemButton>
                        );
                        prev.push(newSub);
                      }
                      return prev;
                    }, [])}
                  </List>
                </Collapse>
              </>
            ))}
          </List>
          <ThemeProvider theme={QuizTheme}>
            <Button
              color="neutral"
              fullWidth="true"
              variant="contained"
              size="small"
            >
              Apply
            </Button>
          </ThemeProvider>
        </div>
        <div className="col-10">{props.children}</div>
      </div>
    </div>
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
})(Dashboard);