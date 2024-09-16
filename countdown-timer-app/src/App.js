import React from 'react'; 
import Header from './UI/Header'; 
import Footer from './UI/Footer'; 
import Counter from './Page/Counter'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

function App() {
  return (
    <Container fluid>
      <Header />
        <Counter />
      <Footer />
    </Container>
  );
}

export default App;
