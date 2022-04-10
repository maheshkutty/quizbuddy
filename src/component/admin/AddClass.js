import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { Button, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";

import SideMenu from "./SideMenu";
import "../../css/table.css";
import { getClassesAction } from "../../actions/ClassesAction";
import qbuddy from "../../api/qbuddy";

function AddClass(props) {
  const [show, setShow] = useState(false);
  const [qclassForm, setQclassForm] = useState("");
  useEffect(() => {
    if (props.qclass.data.length == 0) {
      props.getClassesAction();
    }
  }, []);

  const data = useMemo(() => props.qclass.data, [props.qclass.data]);
  const columns = useMemo(
    () => [
      { Header: "Sr no.", accessor: "srno" },
      { Header: "Class", accessor: "Class" },
      {
        Header: "Action ",
        Cell: ({cell}) => {
          return <Button onClick={() => deleteClass(cell.row.original.Cid)}>Delete</Button>;
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelChange = (event) => {
    setQclassForm(event.target.value);
  };

  const createClass = async () => {
    try {
      let req = {
        name: qclassForm,
      };
      let response = await qbuddy.post("/admin/create_class", req);
      response = response.data;
      if (response.status == "success") {
        props.getClassesAction();
        handleClose();
        setQclassForm("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteClass = async (id) => {
    let response = await qbuddy.delete(`/admin/delete_class/${id}`);
      response = response.data;
      console.log(response);
      if (response.status == "success") {
        props.getClassesAction();
        handleClose();
      }
  }

  return (
    <SideMenu>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col">
            <TextField
              variant="outlined"
              id="class"
              value={qclassForm}
              onChange={handelChange}
              label="Class"
              fullWidth
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
            onClick={createClass}
          >
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

const mapStateToProps = (state) => {
  return {
    qclass: state.qclass,
  };
};

export default connect(mapStateToProps, { getClassesAction })(AddClass);
