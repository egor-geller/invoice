import React, { useState } from "react";
import "./MainForm.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";

const MainForm = () => {
  const [date, setDate] = useState();
  const [to, setTo] = useState();
  const [phone, setPhone] = useState();
  const [fax, setFax] = useState();
  const [forwho, setForwho] = useState();

  const changeDate = (e) => {
    sessionStorage.setItem("date", e.target.value);
    setDate(e.currentTarget.value);
  };
  const changeTo = (e) => {
    sessionStorage.setItem("to", e.target.value);
    setTo(e.currentTarget.value);
  };
  const changePhone = (e) => {
    sessionStorage.setItem("phone", e.target.value);
    setPhone(e.currentTarget.value);
  };
  const changeFax = (e) => {
    sessionStorage.setItem("fax", e.target.value);
    setFax(e.currentTarget.value);
  };
  const changeForWho = (e) => {
    sessionStorage.setItem("forwho", e.target.value);
    setForwho(e.currentTarget.value);
  };

  return (
    <Container className="labelFontSize">
      <Col
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row-reverse",
        }}
      >
        <Form.Group as={Row} className="" controlId="formHorizontalDate">
          <Form.Label className="toPrint" column sm={2}>
            תאריך <b><u>{sessionStorage.getItem("date")}</u></b>
          </Form.Label>
          <Col className="noPrint" sm={10}>
            <Form.Control
              type="text"
              placeholder="תאריך"
              onChange={(e) => changeDate(e)}
              value={date ? date : sessionStorage.getItem("date")}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="" controlId="formHorizontalTo">
          <Form.Label className="toPrint" column sm={2}>
            לכבוד <b><u>{sessionStorage.getItem("to")}</u></b>
          </Form.Label>
          <Col className="noPrint" sm={10}>
            <Form.Control
              type="text"
              placeholder="לכבוד"
              onChange={(e) => changeTo(e)}
              value={to ? to : sessionStorage.getItem("to")}
            />
          </Col>
        </Form.Group>
      </Col>

      <Col style={{ display: "grid", justifyContent: "flex-start" }}>
        <Form.Group as={Row} className="" controlId="formHorizontalTel">
          <Form.Label className="toPrint" column sm={2}>
            טל׳ <b><u>{sessionStorage.getItem("phone")}</u></b>
          </Form.Label>
          <Col className="noPrint" sm={10}>
            <Form.Control
              type="text"
              placeholder="טלפון"
              onChange={(e) => changePhone(e)}
              value={phone ? phone : sessionStorage.getItem("phone")}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="" controlId="formHorizontalFax">
          <Form.Label className="toPrint" column sm={2}>
            פקס <b><u>{sessionStorage.getItem("fax")}</u></b>
          </Form.Label>
          <Col className="noPrint" sm={10}>
            <Form.Control
              type="text"
              placeholder="פקס"
              onChange={(e) => changeFax(e)}
              value={fax ? fax : sessionStorage.getItem("fax")}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="" controlId="formHorizontalForWho">
          <Form.Label className="toPrint" column sm={2} style={{textAlign: "right"}}>
            לידי <b><u>{sessionStorage.getItem("forwho")}</u></b>
          </Form.Label>
          <Col className="noPrint" sm={10}>
            <Form.Control
              type="text"
              placeholder="לידי"
              onChange={(e) => changeForWho(e)}
              value={forwho ? forwho : sessionStorage.getItem("forwho")}
            />
          </Col>
        </Form.Group>
      </Col>
    </Container>
  );
};

MainForm.propTypes = {};

MainForm.defaultProps = {};

export default MainForm;
