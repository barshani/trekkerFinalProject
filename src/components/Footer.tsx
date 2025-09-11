import React from 'react';
import './Footer.css'; // Import the new CSS file

function Footer() {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-content">
          <p className="copyright text-center text-md-start">
            &copy; {new Date().getFullYear()} Trekker. All rights reserved.
          </p>
          <div className="social-links text-center text-md-end">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;