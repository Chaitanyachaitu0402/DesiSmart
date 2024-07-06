import React from 'react';
import './Notification.css'; // Ensure you have styles for the notification

const Notification = ({ message, onClose }) => {
    return (
        <div className="notification">
            <div className="notification-content">
                <p>{message}</p>
                <button className="close-btn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Notification;
