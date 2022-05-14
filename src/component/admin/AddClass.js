import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { Button, TextField, ThemeProvider } from "@mui/material";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Toast from "../utils/Toast";

import SideMenu from "./SideMenu";
import "../../css/table.css";
import { getClassesAction } from "../../actions/ClassesAction";
import qbuddy from "../../api/qbuddy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuizTheme from "../../theme/appTheme";

const schema = yup.object({
  qclassForm: yup.string().required("Class name required !"),
});

function AddClass(props) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      qclassForm: "",
    },
    resolver: yupResolver(schema),
  });

  const [show, setShow] = useState(false);
  const [toastState, setToastState] = useState(false);

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
        Cell: ({ cell }) => {
          return (
            <FontAwesomeIcon
              icon="fa-trash"
              fontSize="25px"
              style={{ cursor: "pointer" }}
              onClick={() => deleteClass(cell.row.original.Cid)}
            />
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createClass = async ({ qclassForm }) => {
    try {
      let req = {
        name: qclassForm,
      };
      let response = await qbuddy.post("/admin/create_class", req);
      response = response.data;
      if (response.status == "success") {
        props.getClassesAction();
        handleClose();
        reset();
        setToastState(true);
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
  };

  return (
    <SideMenu>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Class</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(createClass)}>
          <Modal.Body>
            <div className="col">
              <TextField
                variant="outlined"
                id="class"
                {...register("qclassForm")}
                label="Class"
                fullWidth
                error={errors.qclassForm?.type === "required" ? true : false}
                helperText={errors.qclassForm?.message}
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
              type="submit"
            >
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <div className="col m-2" style={{ color: "#7b809a" }}>
        <Toast open={toastState} setOpen={setToastState}>
          Class Successfully Added
        </Toast>
        <h2 style={{ color: "#344767" }}>Classess</h2>
        <div className="d-flex flex-row-reverse">
          <ThemeProvider theme={QuizTheme}>
            <Button variant="contained" color="dpink" onClick={handleShow}>
              Add
            </Button>
          </ThemeProvider>
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
