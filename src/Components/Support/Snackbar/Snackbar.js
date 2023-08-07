import React, { useState, useEffect } from 'react';
import './Snackbar.css'; // You can define snackbar styles in this CSS file

function Snackbar({ message, onClose }) {
  const [showSnackbar, setShowSnackbar] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    onClose();
  };

  return (
    <div className={`snackbar ${showSnackbar ? 'show' : ''}`}>
      <div className="snackbar-message">{message}</div>
      <button className="snackbar-close" onClick={handleCloseSnackbar}>
        Close
      </button>
    </div>
  );
}

export default Snackbar;
