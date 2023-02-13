import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <p>
        Made with{" "}
        <span className="red">
          <i className="far fa-heart"></i>
        </span>{" "}
        by{" "}
        <a href="https://github.com/ayushr1" className="name-us">
          AyushR1
        </a>{" "}
        <div className="contribute-wrapper">
          <a
            href="https://github.com/ayushr1"
            className="contribute"
          >
            Contribute <i className="fab fa-github"></i>
          </a>
        </div>
      </p>
    </div>
  );
}

export default Footer;
