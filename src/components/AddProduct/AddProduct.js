import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AddProduct.module.css";
import Header from "../Header/Header";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { read, utils, writeFile } from "xlsx";
import Button from "react-bootstrap/esm/Button";

const AddProduct = () => {
  const [items, setItems] = useState([sessionStorage.getItem("jsonData")]);
  const [selectedMeasurement, setSelectedMeasurement] = useState("");
  const [selectedPriceForOne, setPriceForOne] = useState("");
  const [itm, setItm] = useState("");

  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          sessionStorage.setItem("jsonData", JSON.stringify(rows));
          //window.location.reload();
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExport = () => {
    const headings = [["ItemDescription", "Measurement", "PriceForOne"]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, JSON.parse([sessionStorage.getItem("jsonData")]), {
      origin: "A4",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Book1.xlsx");
  };

  const handleChange = (e) => {
    const id = e.currentTarget.id;
    const field = e.currentTarget.value;

    console.log(id, field);

    if (id === "productName") {
      setItm(field);
    } else if (id === "measurement") {
      setSelectedMeasurement(field);
    } else {
      setPriceForOne(field);
    }
  };

  const handleAdd = () => {
    const newAddedItem = {
      ItemDescription: itm,
      Measurement: selectedMeasurement,
      PriceForOne: selectedPriceForOne,
    };

    if (sessionStorage.getItem("jsonData")) {
      const old = [...JSON.parse(sessionStorage.getItem("jsonData"))];
      old.push(newAddedItem);
      sessionStorage.setItem("jsonData", JSON.stringify(old));
    } else {
      alert("העלה קובץ");
    }
  };

  return (
    <Container style={{ direction: "rtl" }}>
      <Header />
      <Form onSubmit={handleExport}>
        <Row style={{ alignItems: "flex-end" }}>
          <Col className="custom-file" md="auto">
            <Form.Label
              className="custom-file-label"
              htmlFor="inputGroupFile"
            />
            <Form.Control
              type="file"
              name="file"
              id="inputGroupFile"
              onChange={handleImport}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </Col>
          <Col md="auto">
            <Button type="submit">Export</Button>
          </Col>
        </Row>
      </Form>
      <br />
      <Row>
        <Form onSubmit={handleAdd}>
          <Col>
            <FloatingLabel controlId="productName" label="שם המוצר">
              <Form.Control
                required
                type="text"
                placeholder="0"
                onChange={(e) => handleChange(e)}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="measurement" label="יחידת מידה">
              <Form.Control
                required
                type="text"
                placeholder="0"
                onChange={(e) => handleChange(e)}
                pattern="[\u0590-\u05FF\uFB2A-\uFB4E]+$"
                title="רק אותיות"
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="priceForOne" label="מחיר יח׳">
              <Form.Control
                required
                type="text"
                placeholder="0"
                onChange={(e) => handleChange(e)}
                pattern="/^\d+|\d+.\d+"
                title="רק מספרים"
              />
            </FloatingLabel>
          </Col>
          <Col className="d-grid g-2" md="auto" style={{ alignSelf: "center" }}>
            <Button variant="primary" type="submit">
              הוסף
            </Button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};

AddProduct.propTypes = {};

AddProduct.defaultProps = {};

export default AddProduct;
