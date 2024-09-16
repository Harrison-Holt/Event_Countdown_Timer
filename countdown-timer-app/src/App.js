import React from 'react'; 
import Header from './UI/Header'; 
import Footer from './UI/Footer'; 
import Counter from './Page/Counter'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'; 

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
      <Header />
        </Col>
      </Row>
      <Row>
        <Col>
        <Counter />
        </Col>
      </Row>
      <Row>
        <Col>
      <Footer />
      </Col>
      </Row>
      </Container>  
    );
}

export default App;
