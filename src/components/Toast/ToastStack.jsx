import React from "react";
import Toast from "./Toast";

const ToastStack = ({ removeToast, toastMessages }) => (
  <div className="toast-stack">
    {toastMessages.map((toastMessage, index) => (
      <Toast
        key={index}
        removeToast={removeToast}
        toastMessage={toastMessage}
      />
    ))}
  </div>
);

export default ToastStack;
