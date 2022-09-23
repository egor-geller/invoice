import React from "react";
import "./BasicView.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import Form from "react-bootstrap/Form";
import MainForm from "../MainForm/MainForm";
import FirstTable from "../FirstTable/FirstTable";

const BasicView = () => (
    <Container dir="rtl" fluid="md">
      <Row>
        <Col sm={8}>
          <h2>Fly Electric LTD.</h2>
          <p>ח.פ. 515337251</p>
        </Col>
        <Col sm={4}>
          <Figure>
            <Figure.Image
              width={100}
              height={100}
              alt="FlyTag logo"
              src="images/FlyTagLogo.jpeg"
            />
          </Figure>
        </Col>
      </Row>
      <Row>
        <Col>
            <Row md="auto">
              <MainForm />
            </Row>
            <Container>
              <Form.Group as={Row} className="mb-3" controlId="invoiceNumber">
                <Form.Label column sm={2}>
                  הצעת מחיר
                </Form.Label>
                <Col>
                  <Form.Control type="text" placeholder="" />
                </Col>
              </Form.Group>
            </Container>
            <Row>
              <FirstTable />
            </Row>
        </Col>
      </Row>
    </Container>
);

BasicView.propTypes = {};

BasicView.defaultProps = {};

export default BasicView;
