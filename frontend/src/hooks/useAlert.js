import { useState } from "react";


const useAlert = () => {

    const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });

    const showSuccess = (message) => setAlert({ show: true, type: 'success', message });
    const showError = (message) => setAlert({ show: true, type: 'error', message });
    const hideAlert = () => setAlert({ show: false, type: 'success', message: '' });

    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(hideAlert, 5000);
            return () => clearTimeout(timer);
        }
    }, [alert.show]);

    return { alert, showSuccess, showError, hideAlert };
};

// In component
//const { alert, showSuccess, showError } = useAlert();




