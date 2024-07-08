// src/components/PrivacyPolicyPopup.js

import React from "react";
import "./PrivacyPolicyPopup.css";

const PrivacyPolicyPopup = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Privacy Policy</h2>
        <p>
          Welcome to [Gym Name]’s management portal. Your privacy is important
          to us. This privacy policy explains how we handle and protect your
          personal information.
        </p>
        <h3>Information Collection</h3>
        <p>
          We collect personal information that you provide to us when
          registering for our services, such as your name, email address, and
          payment information.
        </p>
        <h3>Use of Information</h3>
        <p>
          We use the information collected to provide and improve our services,
          process transactions, and communicate with you about your membership
          and our offerings.
        </p>
        <h3>Data Security</h3>
        <p>
          We implement a variety of security measures to maintain the safety of
          your personal information. However, no method of transmission over the
          Internet, or method of electronic storage, is 100% secure.
        </p>
        <h3>Third-Party Disclosure</h3>
        <p>
          We do not sell, trade, or otherwise transfer to outside parties your
          personally identifiable information unless we provide users with
          advance notice. This does not include website hosting partners and
          other parties who assist us in operating our website, conducting our
          business, or serving our users, so long as those parties agree to keep
          this information confidential.
        </p>
        <h3>Changes to This Privacy Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on our portal. Your
          continued use of the portal after such changes constitutes your
          acceptance of the new policy.
        </p>
        <button onClick={onClose}>Accept</button>
      </div>
    </div>
  );
};

export default PrivacyPolicyPopup;

// // src/components/PrivacyPolicyPopup.js

// import React from "react";
// import "./PrivacyPolicyPopup.css";

// const PrivacyPolicyPopup = ({ show, onClose }) => {
//   if (!show) {
//     return null;
//   }

//   return (
//     <div className="popup">
//       <div className="popup-content">
//         <span className="close-button" onClick={onClose}>
//           &times;
//         </span>
//         <h2>Privacy Policy</h2>
//         <p>
//           Welcome to [Gym Name]’s management portal. Your privacy is important
//           to us. This privacy policy explains how we handle and protect your
//           personal information.
//         </p>
//         <h3>Information Collection</h3>
//         <p>
//           We collect personal information that you provide to us when
//           registering for our services, such as your name, email address, and
//           payment information.
//         </p>
//         <h3>Use of Information</h3>
//         <p>
//           We use the information collected to provide and improve our services,
//           process transactions, and communicate with you about your membership
//           and our offerings.
//         </p>
//         <h3>Data Security</h3>
//         <p>
//           We implement a variety of security measures to maintain the safety of
//           your personal information. However, no method of transmission over the
//           Internet, or method of electronic storage, is 100% secure.
//         </p>
//         <h3>Third-Party Disclosure</h3>
//         <p>
//           We do not sell, trade, or otherwise transfer to outside parties your
//           personally identifiable information unless we provide users with
//           advance notice. This does not include website hosting partners and
//           other parties who assist us in operating our website, conducting our
//           business, or serving our users, so long as those parties agree to keep
//           this information confidential.
//         </p>
//         <h3>Changes to This Privacy Policy</h3>
//         <p>
//           We may update our Privacy Policy from time to time. We will notify you
//           of any changes by posting the new Privacy Policy on our portal. Your
//           continued use of the portal after such changes constitutes your
//           acceptance of the new policy.
//         </p>
//         <button onClick={onClose}>Accept</button>
//       </div>
//     </div>
//   );
// };

// export default PrivacyPolicyPopup;
