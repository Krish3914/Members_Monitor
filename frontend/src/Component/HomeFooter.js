import React, { useState, useEffect } from "react";
import TermsPopup from "./TermsPopup";
import PrivacyPolicyPopup from "./PrivacyPolicyPopup";

const HomeFooter = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);
    const handleOpenPopup = () => {
      setShowPopup(true);
    };
    const handleClosePopup = () => {
      setShowPopup(false);
    };
    const handleOpenPrivacyPopup = () => {
      setShowPrivacyPopup(true);
    };

    const handleClosePrivacyPopup = () => {
      setShowPrivacyPopup(false);
    };
  return (
    <footer class="footer-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <div class="contact-option">
              <span>Phone</span>
              <p> +1 (548) 333-2060</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="contact-option">
              <span>Address</span>
              <p>51 Cardill Cres Waterloo, Kitchener, ON N2L 3Y7, Canada</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="contact-option">
              <span>Email</span>
              <p>info@membersmonitor.com</p>
            </div>
          </div>
        </div>
        <div class="subscribe-option set-bg" data-setbg="img/footer-signup.jpg">
          <div class="so-text">
            <h4>Subscribe To Our Mailing List</h4>
            <p>Sign up to receive the latest information </p>
          </div>
          <form action="#" class="subscribe-form">
            <input type="text" placeholder="Enter Your Mail" />
            <button type="submit">
              <i class="fa fa-send"></i>
            </button>
          </form>
        </div>
        <div class="copyright-text">
          <ul>
            <li>
              <button onClick={handleOpenPopup}>Terms and Conditions</button>
              <TermsPopup show={showPopup} onClose={handleClosePopup} />
            </li>
          </ul>
          <ul>
            <li id="gapp">
             <button className="privacy-link" onClick={handleOpenPrivacyPopup}>Privacy Policy</button>
              <PrivacyPolicyPopup
                show={showPrivacyPopup}
                onClose={handleClosePrivacyPopup}
              />
            </li>
          </ul>
          <div class="footer-social">
            <a href="#">
              <i class="fa fa-facebook"></i>
            </a>
            <a href="#">
              <i class="fa fa-twitter"></i>
            </a>
            <a href="#">
              <i class="fa fa-instagram"></i>
            </a>
            <a href="#">
              <i class="fa fa-dribbble"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { HomeFooter };


            //   <a href="#">Terms & Condition</a>
            
              // <a href="#">Privacy Policy</a>

              
            //   <p>
            //     <span className="privacy-link" onClick={handleOpenPrivacyPopup}>
            //       Privacy Policy
            //     </span>
            //   </p>
