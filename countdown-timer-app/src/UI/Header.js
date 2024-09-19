import React from 'react'; 
import { Row, Col } from 'react-bootstrap'; 
import './header.css'; 

function Header() {
    return (
        <Row as="header">
            <Col className="d-flex flex-row justify-content-between align-items-center p-3">
            <h1 className="ms-3">Event Countdown Timer</h1>
            <a href="https://harrisonholt.dev/" className="btn btn-secondary">portfolio homepage</a>
            </Col>
        </Row>
    ); 
}
export default Header; 

