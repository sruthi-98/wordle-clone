import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ setShowToast, showToast, toastText }) => {
  useEffect(() => {
    if (showToast)
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
  }, [showToast]);

  return <div className="toast">{toastText}</div>;
};

export default Toast;
