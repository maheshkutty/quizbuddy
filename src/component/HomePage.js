import React from "react";
import Header from "./Header";
import "../css/homepage.css";

function HomePage() {
  return (
    <Header>
      <div className="container mt-5">
        <div
          className="row justify-content-center"
          style={{
            background:
              "linear-gradient(0deg,rgba(10,208,244,.12) 7.19%,hsla(0,0%,100%,0) 104.33%)",
          }}
        >
          <div className="col m-5">
            <p style={{ fontSize: 20, marginBlock: 0 }}>One Destination for </p>
            <p style={{ fontSize: 25, fontWeight: "bold", marginBlock: 0 }}>
              Complete Exam Preparation
            </p>
            <ul _ngcontent-serverapp-c22="" className="list">
              <li _ngcontent-serverapp-c22="" translate="">
                Learn
              </li>
              <li _ngcontent-serverapp-c22="" translate="">
                Practice
              </li>
              <li _ngcontent-serverapp-c22="" translate="">
                Improve
              </li>
              <li _ngcontent-serverapp-c22="" translate="">
                Succeed
              </li>
            </ul>
          </div>
          <div className="col">
            <img src="home.png" />
          </div>
        </div>
        <div className="row justify-content-center">
          <h3 class="text-center" style={{ marginBlock: "1em" }}>
            Why Choose QuizBuddy Exam Prep?
          </h3>
          <div class="col" style={{ marginInline: "5em" }}>
            <div class="row justify-content-center">
              <div class="col text-center">
                <img
                  src="https://grdp.co/cdn-cgi/image/quality=100,width=200,f=auto/https://gs-post-images.grdp.co/2021/8/group-6-2x-img1629283053211-98.png-rs-high-webp.png"
                  class="mb-3"
                  style={{ width: "12em" }}
                  alt="Online Classroom Program"
                />
                <div>
                  <p>Online JEE Main and NEET Quizzes</p>
                  <p>by Top Faculty</p>
                </div>
              </div>
              <div class="col text-center">
                <img
                  src="https://grdp.co/cdn-cgi/image/quality=100,width=200,f=auto/https://gs-post-images.grdp.co/2021/8/illustrations-live-courses-2x-img1629272458441-51.png-rs-high-webp.png"
                  class="mb-3 "
                  alt="Comprehensive Study Material"
                />
                <div>
                  <p class="mv0 primary f6 f3-l fw7-l fw5 tc">
                    Comprehensive Problems
                  </p>
                  <p class="mv0 f5 fw7 tc dn db-l">for All Exams</p>
                </div>
              </div>
              <div class="col text-center">
                <img
                  src="https://grdp.co/cdn-cgi/image/quality=100,width=200,f=auto/https://gs-post-images.grdp.co/2021/8/group-19-woman-mask-2-2x-img1629283123665-66.png-rs-high-webp.png"
                  class="mb-3"
                  alt="Latest Pattern Test Series"
                />
                <p class="mv0 primary f6 f3-l fw7-l fw5 tc">
                  Latest Pattern Test Series
                </p>
                <p class="mv0 f5 fw7 tc dn db-l">with Detailed Analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default HomePage;
