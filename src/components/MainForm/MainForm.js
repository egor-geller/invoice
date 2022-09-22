import React from "react";
import PropTypes from "prop-types";
import "./MainForm.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";

const MainForm = () => (
    <div>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalTo">
        <Form.Label column sm={2}>
          לכבוד
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalTel">
        <Form.Label column sm={2}>
          טל׳
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalFax">
        <Form.Label column sm={2}>
          פקס
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalFor">
        <Form.Label column sm={2}>
          לידי
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="" />
        </Col>
      </Form.Group>
    </div>

  // <Form>
  //   <Form.Group className="mb-3" controlId="formBasicTo">
  //     <Form.Label> לכבוד</Form.Label>
  //     <Form.Control type="text" placeholder="" />
  //   </Form.Group>
  // </Form>
);

MainForm.propTypes = {};

MainForm.defaultProps = {};

export default MainForm;
