import { useState, useEffect } from "react";

const useMyAlert = () => {
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showSuccess = (message: string) =>
    setAlert({ show: true, type: "success", message: message });
  const showError = (message: string) =>
    setAlert({ show: true, type: "error", message: message });
  const hideAlert = () => setAlert({ show: false, type: "", message: "" });

  useEffect(() => {
    if (alert.show) {
      const myalert = setTimeout(hideAlert, 5000);
      return () => clearTimeout(myalert);
    }
  }, [alert.show]);

  return { alert, showSuccess, showError, hideAlert };
};

export default useMyAlert;
