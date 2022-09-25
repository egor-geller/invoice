import React, { useState } from "react";
import "./BasicView.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import MainForm from "../MainForm/MainForm";
import FirstTable from "../FirstTable/FirstTable";
import Sum from "../Sum/Sum";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import Header from "../Header/Header";

const BasicView = () => {
  const [invoiceNumber, setInvoiceNumber] = useState();
  const printPage = () => {
    window.print();
  };

  window.onbeforeprint = () => {
    document.querySelectorAll(".noPrint").forEach((el) => {
      el.style.display = "none";
    });
    document.querySelectorAll(".toPrint").forEach((el) => {
      el.style.display = "inline-block";
    });
  };

  window.onafterprint = () => {
    document.querySelectorAll(".noPrint").forEach((el) => {
      el.style.display = "inline-block";
    });
    document.querySelectorAll(".toPrint").forEach((el) => {
      el.style.display = "none";
    });
  };

  const changeInvoiceNumber = (e) => {
    sessionStorage.setItem("invoicenumber", e.target.value);
    setInvoiceNumber(e.currentTarget.value);
  };

  return (
    <Table className="mt4 printToA4" dir="rtl" fluid="md" id="report">
      <thead>
        <tr>
          <td style={{border: "none"}}>
            <div className=""><Header /></div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{border: "none"}}>
            <Container className="content">
              <Row>
                <Col>
                  <Row>
                    <MainForm />
                  </Row>
                  <Row>
                    <Form.Group as={Row} className="" controlId="invoiceNumber">
                      <Form.Label
                        className="toPrint"
                        column
                        sm={2}
                        style={{ fontSize: "18pt" }}
                      >
                        הצעת מחיר:{" "}
                        <b>
                          <u>{sessionStorage.getItem("invoicenumber")}</u>
                        </b>
                      </Form.Label>
                      <Col className="noPrint">
                        <Form.Control
                          type="text"
                          placeholder="הצעת מחיר"
                          onChange={(e) => changeInvoiceNumber(e)}
                          value={
                            invoiceNumber
                              ? invoiceNumber
                              : sessionStorage.getItem("invoicenumber")
                          }
                        />
                      </Col>
                      <Button
                        className="noPrint"
                        as={Col}
                        onClick={printPage}
                        variant="success"
                        style={{ maxWidth: "10%" }}
                        sm="auto"
                      >
                        Export
                      </Button>
                    </Form.Group>
                  </Row>
                  <Row>
                    <FirstTable />
                  </Row>
                  <br/>
                  <br/>
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
                </Col>
              </Row>
            </Container>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td style={{border: "none"}}>
            <div className="footerSpace">&nbsp;</div>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};

BasicView.propTypes = {};

BasicView.defaultProps = {};

export default BasicView;
