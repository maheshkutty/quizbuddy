import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";

import SideMenu from "./SideMenu";
import "../../css/table.css";
import { getSubjectsAction } from "../../actions/SubjectsAction";
import { getClassesAction } from "../../actions/ClassesAction";

function AddChapters() {
  const [show, setShow] = useState(false);
  const [qclass, setQclass] = useState("");
  const [qSub, setqSub] = useState("");

  // useEffect(() => {
  //   if()
  // }, [])

  const data = useMemo(
    () => [
      { srno: "1", class: "11th", subject: "Maths", chapters:"Lines" },
      { srno: "2", class: "12th", subject: "Chemistry", chapters:"Oragnic Chemistry" },
      { srno: "3", class: "12th", subject: "Maths", chapters:"Calculus" },
    ],
    []
  );
  const columns = useMemo(
    () => [
      { Header: "Sr no.", accessor: "srno" },
      { Header: "Class", accessor: "class" },
      { Header: "Subjects", accessor: "subject" },
      { Header: "Chapters", accessor: "chapters" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelQclass = (event) => {
    setQclass(event.target.value);
  };

  const handelqSub = (event) => {
    setqSub(event.target.value);
  };

  return (
    <SideMenu>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Chapters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col">
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
              <TextField variant="outlined" fullWidth id="chapter" label="Chapter" />
            </FormControl>
          </div>
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
      <div className="col m-2" style={{ color: "#7b809a" }}>
        <h2 style={{ color: "#344767" }}>Chapters</h2>
        <Button variant="contained" onClick={handleShow}>
          Add
        </Button>
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
      </div>
    </SideMenu>
  );
}

const mapStateToProps = (state) => {
  return {
    qsub: state.qsub,
    qclass: state.qclass,
    qchapters: state.qchapters
  };
};

export default AddChapters;
