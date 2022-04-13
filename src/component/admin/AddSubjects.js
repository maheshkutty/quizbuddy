import React, { useMemo, useState, useEffect } from "react";
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
import qbuddy from "../../api/qbuddy";

function AddSubjects(props) {
  const [show, setShow] = useState(false);
  const [qclass, setQclass] = useState(1);
  const [qsub, setQsub] = useState("");

  const data = useMemo(() => props.qsub.data, [props.qsub.data]);
  const columns = useMemo(
    () => [
      { Header: "Sr no.", accessor: "srno" },
      // { Header: "Class ID", accessor: "Cid" },
      { Header: "Class", accessor: "Class" },
      { Header: "Subjects", accessor: "Subject" },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  useEffect(() => {
    function createDataTable() {
      if (props.qsub.data.length === 0) {
        props.getSubjectsAction(1);
      }
      if (props.qclass.data.length === 0) {
        props.getClassesAction();
      }
    }
    createDataTable();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelQclass = (event) => {
    setQclass(event.target.value);
  };

  const handelQSub = (event) => {
    setQsub(event.target.value);
  };

  const createSubject = async () => {
    try {
      let req = {
        class_id: parseInt(qclass),
        subject: qsub,
      };
      let response = await qbuddy.post("/admin/create_subject", req);
      response = response.data;
      if (response.status === "success") {
        props.getSubjectsAction();
        handleClose();
        setQsub("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SideMenu>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subjects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col">
            <FormControl fullWidth>
              <InputLabel id="class">Classess</InputLabel>
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
            <TextField
              variant="outlined"
              fullWidth
              value={qsub}
              id="subjects"
              label="Subjects"
              onChange={handelQSub}
            />
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
            onClick={createSubject}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col m-2" style={{ color: "#7b809a" }}>
        <h2 style={{ color: "#344767" }}>Subjects</h2>
        <Button variant="contained" onClick={handleShow}>
          Add Subjects
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
  };
};

export default connect(mapStateToProps, {
  getSubjectsAction,
  getClassesAction,
})(AddSubjects);
