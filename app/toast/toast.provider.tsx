import { ToastContainer } from "react-toastify";

const Provider = () => {
  return <ToastContainer theme="colored" position="bottom-left" />;
};

export const getToastProvider = () => Provider;
