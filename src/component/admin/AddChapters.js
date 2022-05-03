import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useTable } from "react-table";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import SideMenu from "./SideMenu";
import "../../css/table.css";
import { getSubjectsAction } from "../../actions/SubjectsAction";
import { getClassesAction } from "../../actions/ClassesAction";
import { getChaptersAction } from "../../actions/ChaptersAction";
import qbuddy from "../../api/qbuddy";

const schema = yup.object({
  qclass: yup.string().required("Select class !"),
  qSub: yup.string().required("Select subject !"),
  qChapter: yup.string().required("Chapter name required !"),
});

function AddChapters(props) {
  const [show, setShow] = useState(false);
  const [chapterList, setChapterList] = useState([]);

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
      qSub: "",
      qChapter: "",
    },
    resolver: yupResolver(schema),
  });

  const createDataTable = useCallback(() => {
    if (props.qsub.data.length === 0) {
      props.getSubjectsAction();
    }
    if (props.qclass.data.length === 0) {
      props.getClassesAction();
    }
    if (props.qclass.data.length === 0) {
      props.getChaptersAction();
    }
  }, []);

  useEffect(() => {
    createDataTable();
  }, [createDataTable]);

  useEffect(() => {
    let newChapterList = [];
    props.qchapters.data.forEach((ele) => {
      ele.chapters.forEach((item) => {
        newChapterList.push({
          srno: ele.srno,
          class: ele.Class,
          subject: ele.Subject,
          chId: item.id,
          chapter: item.name,
        });
      });
    });
    setChapterList(newChapterList);
  }, [props.qchapters.data]);

  const data = useMemo(() => chapterList, [chapterList]);
  const columns = useMemo(
    () => [
      { Header: "Sr no.", accessor: "srno" },
      { Header: "Class", accessor: "class" },
      { Header: "Subjects", accessor: "subject" },
      { Header: "Chapters", accessor: "chapter" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [qsubList, setQsubList] = useState([]);

  const handelQclass = (event) => {
    let tempData = props.qsub.data.filter(
      (item) => item.Cid == event.target.value
    );
    setQsubList([...tempData]);
  };

  const createChapter = async ({ qSub, qChapter }) => {
    try {
      let req = {
        sub_id: qSub,
        chapter: qChapter,
      };
      console.log(req);
      let response = await qbuddy.post("/admin/create_chapter", req);
      response = response.data;
      console.log(response);
      handleClose();
      reset();
      props.getChaptersAction();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SideMenu>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Chapters</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(createChapter)}>
          <Modal.Body>
            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="classlabel">Classess</InputLabel>
                <Select
                  id="class"
                  labelId="classlabel"
                  label="Classess"
                  error={errors.qclass?.type == "required" ? true : false}
                  {...register("qclass", {
                    onBlur: handelQclass,
                  })}
                  sx={{ marginBottom: 1 }}
                >
                  {props.qclass.data.map((item) => (
                    <MenuItem key={item.Cid} value={item.Cid}>
                      {item.Class}
                    </MenuItem>
                  ))}
                </Select>
                {errors.qclass?.message ? (
                  <FormHelperText error>{errors.qclass.message}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="subject">Subjects</InputLabel>
                <Select
                  id="subject"
                  labelId="subjectlabel"
                  label="Subjects"
                  error={errors.qSub?.type == "required" ? true : false}
                  {...register("qSub")}
                  sx={{ marginBottom: 1 }}
                >
                  {qsubList.map((item) => (
                    <MenuItem key={item.Sid} value={item.Sid}>
                      {item.Subject}
                    </MenuItem>
                  ))}
                </Select>
                {errors.qSub?.message ? (
                  <FormHelperText error>{errors.qSub.message}</FormHelperText>
                ) : null}
              </FormControl>
              <TextField
                {...register("qChapter")}
                variant="outlined"
                fullWidth
                id="chapter"
                label="Chapter"
                error={errors.qChapter?.type === "required" ? true : false}
                helperText={errors.qChapter?.message}
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
    qchapters: state.qchapters,
  };
};

export default connect(mapStateToProps, {
  getSubjectsAction,
  getClassesAction,
  getChaptersAction,
})(AddChapters);
