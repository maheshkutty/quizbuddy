import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function DragAndDropFile() {
  const [fileImg, setFileImg] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setFileImg(binaryStr);
        console.log(binaryStr);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div>
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}
      {fileImg != null ? (
        <img
          src={fileImg}
          style={{ height: "15em", width: "25em", objectFit: "contain" }}
        />
      ) : null}
    </div>
  );
}

export default DragAndDropFile;
