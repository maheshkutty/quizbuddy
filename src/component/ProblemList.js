import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Modal } from "react-bootstrap";

import "../css/addQuestion.css";
import { getClassesAction } from "../actions/ClassesAction";
import { getSubjectsAction } from "../actions/SubjectsAction";
import { problemAction } from "../actions/ProblemsAction";
import qbuddy from "../api/qbuddy";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTable, usePagination } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import HeaderHome from "./HeaderHome";
import Result from "./Result";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required(),
  email: yup.string().email("Enter Valid Email").required(),
  password: yup.string().required(),
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ea5455",
    color: theme.palette.common.white,
    fontSize: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ProblemList(props) {
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
    if (props.problems.data.length == 0) {
      let payload = {
        cid: 0,
        sid: 0,
        CHid: 0,
        dificulty_lvl: "0",
      };
      props.problemAction(payload);
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
    let payload = {
      cid: event.target.value,
      sid: 0,
      CHid: 0,
      dificulty_lvl: "0",
    };
    props.problemAction(payload);
  };

  const handelqSub = (event) => {
    setqSub(event.target.value);
    getChaptersList(event.target.value);
    let payload = {
      cid: qclass == "" ? 0 : qclass,
      sid: event.target.value == "" ? 0 : event.target.value,
      CHid: 0,
      dificulty_lvl: "0",
    };
    props.problemAction(payload);
  };

  const handelqChapter = (event) => {
    setqChapter(event.target.value);
    let payload = {
      cid: qclass == "" ? 0 : qclass,
      sid: event.target.value == "" ? 0 : event.target.value,
      CHid: event.target.value == "" ? 0 : event.target.value,
      dificulty_lvl: "0",
    };
    props.problemAction(payload);
  };

  const data = useMemo(() => props.problems.data, [props.problems.data]);
  const columns = useMemo(
    () => [
      { Header: "Sr no.", accessor: "srno" },
      {
        Header: "Name",
        Cell: ({ cell }) => {
          //console.log(cell);
          return (
            <div>
              <Link
                to="/attemptproblem"
                state={{
                  qid: cell.row.original.qid,
                }}
              >
                {cell.row.original.question}
              </Link>
            </div>
          );
        },
      },
      { Header: "Class", accessor: "Class" },
      { Header: "Subject", accessor: "Subject" },
      { Header: "Diffculty", accessor: "dificulty_lvl" },
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
    <HeaderHome>
      <div className="container">
        <div className="col m-2">
          <Box component={Paper} sx={{ mb: 1, p: 2 }}>
            <Typography>Filter by</Typography>
            <div className="col">
              <FormControl sx={{ m: 1 }} size="small">
                <InputLabel id="Classes">Classes</InputLabel>
                <Select
                  label="Classes"
                  fullWidth
                  placeholder="Select Class"
                  value={qclass}
                  onChange={handelQclass}
                  sx={{ width: 200, background: "white" }}
                >
                  <MenuItem key="0" value="0">
                    All
                  </MenuItem>
                  {props.qclass.data.map((item) => (
                    <MenuItem key={item.Cid} value={item.Cid}>
                      {item.Class}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }} size="small">
                <InputLabel id="subject">Subjects</InputLabel>
                <Select
                  id="subject"
                  labelId="subjectlabel"
                  label="Subjects"
                  value={qSub}
                  onChange={handelqSub}
                  sx={{ width: 200 }}
                >
                  <MenuItem key="0" value="0">
                    All
                  </MenuItem>
                  {qsubList.map((item) => (
                    <MenuItem key={item.Sid} value={item.Sid}>
                      {item.Subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }} size="small">
                <InputLabel id="chapters">Chapters</InputLabel>
                <Select
                  id="chapters"
                  labelId="chapterslabel"
                  label="Chapters"
                  value={qChapter}
                  onChange={handelqChapter}
                  sx={{ width: 200 }}
                >
                  <MenuItem key="0" value="0">
                    All
                  </MenuItem>
                  {qChaptersList.map((item) => (
                    <MenuItem key={item.CHid} value={item.CHid}>
                      {item.Chapter}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }} size="small">
                <InputLabel id="chapters">Diffculty</InputLabel>
                <Select
                  id="chapters"
                  labelId="chapterslabel"
                  label="Diffculty"
                  sx={{ width: 200 }}
                >
                  <MenuItem key="0" value="0">
                    All
                  </MenuItem>
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
            </div>
          </Box>
          <TableContainer component={Paper}>
            <Table {...getTableProps()}>
              <TableHead>
                {headerGroups.map((headerGroup) => (
                  <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <StyledTableCell
                        {...column.getHeaderProps()}
                        className="tableHeaderStyle"
                      >
                        {column.render("Header")}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <StyledTableRow {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <StyledTableCell {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
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
      </div>
    </HeaderHome>
  );
}

const mapStateToProps = (state) => {
  return {
    userSession: state.userSession,
    qsub: state.qsub,
    qclass: state.qclass,
    problems: state.problems,
  };
};

export default connect(mapStateToProps, {
  getClassesAction,
  getSubjectsAction,
  problemAction,
})(ProblemList);
