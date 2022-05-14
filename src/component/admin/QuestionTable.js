import React, { useState, useCallback, useEffect, useMemo } from "react";
import SideMenu from "./SideMenu";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
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
import { useTable, usePagination } from "react-table";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required(),
  email: yup.string().email("Enter Valid Email").required(),
  password: yup.string().required(),
});

function QuestionTable(props) {
  const [qclass, setQclass] = useState("");
  const [qSub, setqSub] = useState(1);
  const [qChapter, setqChapter] = useState("");

  const [qChaptersList, setQChaptersList] = useState([]);
  const [qsubList, setQsubList] = useState([]);
  const navigate = useNavigate();

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

  const data = useMemo(() => props.qclass.data, [props.qclass.data]);
  const columns = useMemo(
    () => [
      { Header: "Sr no.", accessor: "srno" },
      {
        Header: "Name",
        Cell: ({ cell }) => {
          console.log(cell.row.original);
          return (
            <div>
              <Link to="/admin/qstatus" state={{...cell.row.original, name: "What is partical"}}>
                What is partical
              </Link>
            </div>
          );
        },
      },
      { Header: "Class", accessor: "Class" },
      { Header: "Subject", accessor: "Subject" },
      { Header: "Diffculty", accessor: "Diffculty" },
      {
        Header: "Action ",
        Cell: ({ cell }) => {
          return (
            <FontAwesomeIcon
              icon="fa-trash"
              fontSize="25px"
              style={{ cursor: "pointer" }}
              onClick={() => {}}
            />
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable({ columns, data }, usePagination);

  const getChaptersList = async (sid) => {
    if (sid != "") {
      let res = await qbuddy.get(`/admin/subject/${sid}/chapters`);
      res = res.data.res;
      setQChaptersList([...res]);
    }
  };

  return (
    <SideMenu>
      <div className="col m-2">
        <div className="d-flex">
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="Classes">Classes</InputLabel>
            <Select
              label="Classes"
              fullWidth
              placeholder="Select Class"
              value={qclass}
              onChange={handelQclass}
              sx={{ width: 200, background: "white" }}
            >
              {props.qclass.data.map((item) => (
                <MenuItem key={item.Cid} value={item.Cid}>
                  {item.Class}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="subject">Subjects</InputLabel>
            <Select
              id="subject"
              labelId="subjectlabel"
              label="Subjects"
              value={qSub}
              onChange={handelqSub}
              sx={{ width: 200 }}
            >
              {qsubList.map((item) => (
                <MenuItem key={item.Sid} value={item.Sid}>
                  {item.Subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="chapters">Chapters</InputLabel>
            <Select
              id="chapters"
              labelId="chapterslabel"
              label="Chapters"
              value={qChapter}
              onChange={handelqChapter}
              sx={{ width: 200 }}
            >
              {qChaptersList.map((item) => (
                <MenuItem key={item.CHid} value={item.CHid}>
                  {item.Chapter}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="chapters">Diffculty</InputLabel>
            <Select
              id="chapters"
              labelId="chapterslabel"
              label="Diffculty"
              sx={{ width: 200 }}
            >
              <MenuItem key="1" value="1">
                Easy
              </MenuItem>
              <MenuItem key="2" value="2">
                Medium
              </MenuItem>
              <MenuItem key="3" value="3">
                Hard
              </MenuItem>
            </Select>
          </FormControl>
          <div className="d-flex justify-content-end align-items-center">
            <Button
              variant="contained"
              onClick={() => {
                navigate("/admin/addquestions");
              }}
            >
              Add Question
            </Button>
          </div>
        </div>
        <table {...getTableProps()} className="tableStyle">
          <thead className="tableHeaderStyle">
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="tableBodyRow"
              >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="tableHeaderStyle">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="tableBodyRow">
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="tableBodyColumn">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex flex-row-reverse pt-2">
          <Button
            variant="outlined"
            onClick={() => nextPage()}
            disabled={!canNextPage}
            sx={{ marginLeft: 2 }}
          >
            Next Page
          </Button>
          <Button
            variant="outlined"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            sx={{ marginLeft: 2 }}
          >
            Previous Page
          </Button>
        </div>
        <div className="d-flex flex-row-reverse p-2">
          <em>
            Page {pageIndex + 1} of {pageOptions.length}
          </em>
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
})(QuestionTable);
