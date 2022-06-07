import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function DragAndDropFile(props) {
  //const [fileImg, setFileImg] = useState(null);
  const styles = {
    drag: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      border: "2px dashed black",
      padding: "5em",
      textAlign: "center",
    },
    dragUploaded: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      border: "2px dashed #5cb85c",
      padding: "5em",
      textAlign: "center",
    },
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log(props);
    console.log(isDragAccept);
    //acceptedFiles.forEach((file) => {
      //console.log(fi)
      props.processData(acceptedFiles);
      // const reader = new FileReader();
      // reader.onabort = () => console.log("file reading was aborted");
      // reader.onerror = () => console.log("file reading has failed");
      // reader.onload = () => {
      //   // Do whatever you want with the file contents
      //   const binaryStr = reader.result;
      //   console.log(file.path);
      //   //setFileImg(binaryStr);
      //   console.log(binaryStr);
      //   props.processData(file);
      //   //processData(binaryStr);
      // };
      //reader.readAsArrayBuffer(file);
    //});
  }, []);

  
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    isDragAccept,
  } = useDropzone({ onDrop, accept: ".xlsx, .xls", maxFiles: 1 });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div style={styles.drag}>
          <p>Drop the files here ...</p>
        </div>
      ) : acceptedFiles[0] ? (
        <div style={styles.dragUploaded}>
          <p>File Uploaded</p>
          <p className="text-success">{acceptedFiles[0].path}</p>
        </div>
      ) : (
        <div style={styles.drag}>
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}
    </div>
  );
}

export default DragAndDropFile;
