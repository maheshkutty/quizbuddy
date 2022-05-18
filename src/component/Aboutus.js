import React from "react";
import Header from "./Header";

function Aboutus() {
  return (
    <Header>
      <div class="d-flex align-items-center justify-content-center bg-primary pt3 ph4 relative">
        <img
          class="self-center left-2 absolute bottom-0 dn flex-l"
          alt="header left icon"
          src="https://gs-post-images.grdp.co/2019/1/vector-1-img1547184565364-57.png-rs-high-webp.png"
        />
        <img
          src="https://grdp.co/cdn-cgi/image/quality=100,width=464,f=auto/https://gs-post-images.grdp.co/2021/8/group-2-copy-2-2x-img1629961096399-73.png-rs-high-webp.png"
          data-src="https://grdp.co/cdn-cgi/image/quality=100,width=464,f=auto/https://gs-post-images.grdp.co/2021/8/group-2-copy-2-2x-img1629961096399-73.png-rs-high-webp.png"
          class=" lazyloaded"
          alt="header center icon"
        />
        <img
          class="self-center absolute right-2 bottom-0 dn flex-l"
          alt="header right icon"
          src="https://gs-post-images.grdp.co/2019/1/vector-2-img1547185202186-16.png-rs-high-webp.png"
        />
      </div>
      <div class="d-flex justify-content-center">
        <div className="col">
          <h3 class="head text-center m-3">About Us</h3>
          <p class="d-flex m-3">
            QuizzBuddy Exam Prep is the most comprehensive
            preparation app for all exams. We aim to provide our aspirants with
            end-to-end preparation so that they can achieve their goals. To help
            our students prepare efficiently for various exams, we offer online
            classroom programs conducted by India’s top faculty, comprehensive
            study material that’s exclusively designed by our subject-matter
            experts &amp; latest pattern test series with in-depth performance
            analysis so that they can recognize their true potential &amp;
            establish a successful career. With our loyal registered aspirants
            we’re aiming to become India’s #1 trusted brand for exam preparation
            enabling the highest number of students to succeed.
          </p>
        </div>
      </div>
    </Header>
  );
}

export default Aboutus;
