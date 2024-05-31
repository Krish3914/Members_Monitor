// src/components/TermsPopup.js

import React from "react";
import "./TermsPopup.css";

const TermsPopup = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Terms and Conditions</h2>
        <p>
          Welcome to our gym management website. Please read these terms and
          conditions carefully...
        </p>
        <p>
          Welcome to Gym management portal. These terms and conditions outline
          the rules and regulations for the use of Members’s Monitor portal,
          accessible at membersmonitor.com.
        </p>
        <h3>Acceptance of Terms</h3>
        <p>
          By accessing and using this portal, you accept and agree to be bound
          by the terms and conditions of this agreement. If you do not agree
          with any part of these terms, you must not use our portal.
        </p>
        <h3>Eligibility</h3>
        <p>
          To use our portal, you must be a registered member of Members
          Monitor and comply with all applicable laws and regulations.
        </p>
        <h3>Account Registration</h3>
        <p>
          You must provide accurate and complete information during the
          registration process and keep your account information updated. You
          are responsible for maintaining the confidentiality of your account
          credentials and for all activities that occur under your account.
        </p>
        {/* Add more detailed terms and conditions here */}
        <button onClick={onClose}>Accept</button>
      </div>
    </div>
  );
};

export default TermsPopup;
