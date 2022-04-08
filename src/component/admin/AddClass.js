import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import { Button, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";

import SideMenu from "./SideMenu";
import "../../css/table.css";

function AddClass() {
  const [show, setShow] = useState(false);
  const data = useMemo(
    () => [
      { srno: "1", class: "11th" },
      { srno: "2", class: "12th" },
    ],
    []
  );
  const columns = useMemo(
    () => [
      { Header: "Sr no.", accessor: "srno" },
      { Header: "Class", accessor: "class" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <SideMenu>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col">
            <TextField variant="outlined" id="class" label="Class" fullWidth />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" className="m-1" color="error" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outlined" className="m-1" color="success" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col m-2" style={{ color: "#7b809a" }}>
        <h2 style={{ color: "#344767" }}>Classess</h2>
        <Button variant="contained" onClick={handleShow}>
          Add Class
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

export default AddClass;
