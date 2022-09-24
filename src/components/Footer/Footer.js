import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';

const Footer = () => {
  return(
    <Container>
      <Row style={{alignItems: "center"}}>
        <Col>
          <p>הציונות 45, אשדוד ת.ד 14173</p>
        </Col>
        <Col>
          <p>טלפון: 054-7914826  052-6116510</p>
        </Col>
        <Col>
          <p>פקס: 03-5787191</p>
        </Col>
        <Col>
          <p>אימייל FLYELECTRIC2015@GMAIL.COM</p>
        </Col>
      </Row>
    </Container>
  )
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
