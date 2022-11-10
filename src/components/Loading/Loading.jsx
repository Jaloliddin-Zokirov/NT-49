import React from "react";
import { createPortal } from "react-dom";
import loading from "../image/loading.gif";
import style from "./Loading.module.scss";

const Loading = ({ isOpen }) => {
  if (isOpen) {
    return createPortal(
      <div className={style.LoadingBox}>
        <img src={loading} width={256} height={256} alt="loading gif" />
      </div>,
      document.body
    );
  } else {
    return null;
  }
};

export default Loading;
