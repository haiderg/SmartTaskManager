import { useState, useEffect } from "react";

const useCustomHook = () => {
  const [customAlert, setCustomAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (customAlert.show) {
      const showTime = setTimeout(hideMessage, 5000);
      clearTimeout(showTime);
    }
  }, [customAlert.show]);

  const showSuccessMessage = (message: string) =>
    setCustomAlert({ show: true, message: message, type: "success" });
  const showFailureMessage = (message: string) =>
    setCustomAlert({ show: true, message: message, type: "success" });
  const hideMessage = () =>
    setCustomAlert({ show: false, message: "", type: "success" });

  return { customAlert, showFailureMessage, showSuccessMessage, hideMessage };
};

export default useCustomHook;
