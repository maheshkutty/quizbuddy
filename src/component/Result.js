import React from "react";
import HeaderHome from "./HeaderHome";

function Result({ score, total }) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">
          <img
            src="result.jpg"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="row text-center justify-content-bewteen">
        <div className="col" style={{ marginBlock: 0 }}>
          <p style={{ marginBlock: 0, fontSize: "1.2em" }}>Score</p>
          <p
            style={{
              color: "#5e93ff",
              fontSize: "2em",
              fontWeight: "bold",
              marginBlock: 0,
            }}
          >
            {score}
          </p>
          <p style={{ marginBlock: 0 }}>Out of {total}</p>
        </div>
      </div>
    </div>
  );
}

export default Result;
