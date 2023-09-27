import React from 'react';
import { LoginPopButton } from './LoginRegPopButton';

const RegistrationStatus = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>{message}</p>
        < LoginPopButton/>
        <button onClick={onClose}>Close</button>
      </div>

    </div>
  );
};

export default RegistrationStatus;
