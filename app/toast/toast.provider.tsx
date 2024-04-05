import { ToastContainer } from "react-toastify";

const Provider = () => {
  return (
    <ToastContainer theme="colored" position="bottom-left" autoClose={false} />
  );
};

export const getToastProvider = () => Provider;
