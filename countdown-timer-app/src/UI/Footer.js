import React from 'react';
import './footer.css';


function Footer() {
    return (
        <footer style={footerStyles}>
            <h1 style={headerStyle}>Let's Connect!</h1>
            <a href="https://github.com/Harrison-Holt" className="icon-link" aria-label="Visit Harrison's GitHub profile" title="Visit Harrison's GitHub profile">
                <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/harrison-holt-18a703202" className="icon-link" aria-label="Visit Harrison's LinkedIn profile" title="Visit Harrison's LinkedIn profile">
                <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:hholt2901@gmail.com" className="icon-link email-icon" aria-label="Send an email to Harrison" title="Send an email to Harrison">
                <i className="fa fa-envelope"></i>
            </a>
        </footer>
    );
}
export default Footer;



