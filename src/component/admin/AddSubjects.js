import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useTable } from "react-table";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  ThemeProvider,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SideMenu from "./SideMenu";
import "../../css/table.css";
import { getSubjectsAction } from "../../actions/SubjectsAction";
import { getClassesAction } from "../../actions/ClassesAction";
import qbuddy from "../../api/qbuddy";
import QuizTheme from "../../theme/appTheme";

const schema = yup.object({
  qclass: yup.string().required("Select class !"),
  qsub: yup.string().required("Subjects is required !"),
});

function AddSubjects(props) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      qclass: "",
      qsub: "",
    },
    resolver: yupResolver(schema),
  });

  const [show, setShow] = useState(false);

  const data = useMemo(() => props.qsub.data, [props.qsub.data]);
  const columns = useMemo(
    () => [
      { Header: "Sr no.", accessor: "srno" },
      // { Header: "Class ID", accessor: "Cid" },
      { Header: "Class", accessor: "Class" },
      { Header: "Subjects", accessor: "Subject" },
      {
        Header: "Action ",
        Cell: ({ cell }) => {
          return (
            <FontAwesomeIcon
              icon="fa-trash"
              fontSize="25px"
              style={{ cursor: "pointer" }}
              onClick={() => {
                deleteSubject(cell.row.original.Sid);
              }}
            />
          );
        },
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const createDataTable = useCallback(() => {
    if (props.qsub.data.length === 0) {
      props.getSubjectsAction();
    }
    if (props.qclass.data.length === 0) {
      props.getClassesAction();
    }
  }, []);

  useEffect(() => {
    createDataTable();
  }, [createDataTable]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createSubject = async ({ qclass, qsub }) => {
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
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubject = async (id) => {
    let response = await qbuddy.delete(`/admin/delete_subject/${id}`);
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
          <Modal.Title>Add Subjects</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(createSubject)}>
          <Modal.Body>
            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="class">Classess</InputLabel>
                <Select
                  id="class"
                  labelId="classlabel"
                  label="Classess"
                  {...register("qclass")}
                  error={errors.qclass?.type == "required" ? true : false}
                  sx={{ marginBottom: 1 }}
                >
                  {props.qclass.data.map((item) => (
                    <MenuItem value={item.Cid.toString()}>
                      {item.Class}
                    </MenuItem>
                  ))}
                </Select>
                {errors.qclass?.message ? (
                  <FormHelperText error>{errors.qclass.message}</FormHelperText>
                ) : null}
              </FormControl>
              <TextField
                variant="outlined"
                fullWidth
                {...register("qsub")}
                id="subjects"
                label="Subjects"
                error={errors.qsub?.type === "required" ? true : false}
                helperText={errors.qsub?.message}
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
        <h2 style={{ color: "#344767" }}>Subjects</h2>
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
    qsub: state.qsub,
    qclass: state.qclass,
  };
};

export default connect(mapStateToProps, {
  getSubjectsAction,
  getClassesAction,
})(AddSubjects);
