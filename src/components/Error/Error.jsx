import React from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import errorImage from "../image/error-img.svg";
import arrowRight from "../image/arrow-error.svg";
import style from "./Error.module.scss";
import Header from "../Header/Header";

const Error = ({ isOpen }) => {
  if (isOpen) {
    return createPortal(
      <>
        <Header />
        <div className={style.errorSide}>
          <div className={style.container}>
            <div className={style.box}>
              <img
                className={style.errorImg}
                src={errorImage}
                width={500}
                height={193}
                alt="404 image"
              />
              <h2>Page not found - 404</h2>
              <p>
                <span>This page not found (deleted or never exists).</span>
                <span>
                  Try a phrase in search box or back to home and start again.
                </span>
              </p>
              <Link to={"/"}>
                TAKE ME HOME!
                <img
                  src={arrowRight}
                  width={6}
                  height={10}
                  alt="arrow right img"
                />
              </Link>
            </div>
          </div>
        </div>
      </>,
      document.getElementById("root")
    );
  } else {
    return null;
  }
};

export default Error;
