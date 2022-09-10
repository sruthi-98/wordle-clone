import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ removeToast, toastMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      removeToast();
    }, 2000);
  }, []);

  return <div className="toast">{toastMessage}</div>;
};

export default Toast;
