import React from "react";
import "./BasicView.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import Form from "react-bootstrap/Form";
import MainForm from "../MainForm/MainForm";
import FirstTable from "../FirstTable/FirstTable";
import Sum from "../Sum/Sum";
import Footer from "../Footer/Footer";
import Button from "react-bootstrap/esm/Button";

const BasicView = () => {
  return (
    <Container
      dir="rtl"
      fluid="md"
      style={{ marginTop: "10px", marginBottom: "20px" }}
    >
      <Row>
        <Col sm={8}>
          <h2>פלאיי אלקטריק בע״מ</h2>
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
          <Row>
            <MainForm />
          </Row>
          <Row>
            <Form.Group as={Row} className="mb-3" controlId="invoiceNumber">
              <Form.Label column sm={2}>
                הצעת מחיר
              </Form.Label>
              <Col>
                <Form.Control type="text" placeholder="" />
              </Col>
              <Button as={Col} variant="success" style={{maxWidth: "10%"}}>
                Export
              </Button>
            </Form.Group>
          </Row>
          <Row>
            <FirstTable />
          </Row>
          <Row>
            <Col dir="rtl">
              <p style={{ display: "grid", textAlign: "right" }}>
                המחירים אינם כוללים מע"מ.
                <br />
                <b>מחיר סופי נקבע על פי כמויות לאחר ביצוע בפעול.</b>
                <br />
                ההצעה מתייחסת לביצוע העבודה ברצף ללא הפסקות או הפרעות.
                <br />
                תוקף ההצעה 30 ימים.
                <br />
                <b>המחיר לתשלום :שוטף 30+ יום.</b>
                <br />
                <b>אשמח לעמוד לרשותך לכל שאלה או בקשה.</b>
                <br />
                <b>איליה גלר</b>
              </p>
            </Col>
            <Col style={{ alignSelf: "center" }}>
              <Sum />
            </Col>
          </Row>
          <Row>
            <Footer />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

BasicView.propTypes = {};

BasicView.defaultProps = {};

export default BasicView;
