import React, { useMemo, useState } from "react";
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

import SideMenu from "./SideMenu";
import "../../css/table.css";

function AddSubjects() {
  const [show, setShow] = useState(false);
  const [qclass, setQclass] = useState();
  const data = useMemo(
    () => [
      { srno: "1", class: "11th", subject: "Maths" },
      { srno: "2", class: "12th", subject: "Chemistry" },
      { srno: "3", class: "12th", subject: "Maths" },
    ],
    []
  );
  const columns = useMemo(
    () => [
      { Header: "Sr no.", accessor: "srno" },
      { Header: "Class", accessor: "class" },
      { Header: "Subjects", accessor: "subject" },
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
                <MenuItem value="1">11th</MenuItem>
                <MenuItem value="2">12th</MenuItem>
              </Select>
            </FormControl>
            <TextField variant="outlined" fullWidth id="subjects" label="Subjects" />
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

export default AddSubjects;
