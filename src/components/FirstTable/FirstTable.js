import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./FirstTable.module.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Item from "./Item/Item";
import AddItem from "../AddItem/AddItem";
import AllItems from "../AllItems/AllItems";
import ExportItems from "../ExportItems/ExportItems";
import { read, utils, writeFile } from "xlsx";

const FirstTable = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    document.title = `You clicked ${items} times`;
  });

  const handleImport = ($event) => {
    const files = $event.target.files;
    console.log(files);
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setItems(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <div className="custom-file">
        <Form.Label className="custom-file-label" htmlFor="inputGroupFile"/>
        <Form.Control
          type="file"
          name="file"
          id="inputGroupFile"
          required
          onChange={handleImport}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </div>
      <br></br>
      <AddItem items={items} />
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>תאור מוצר</th>
            <th>יחידת מידה</th>
            <th>כמות</th>
            <th>מחיר יח׳</th>
            <th>מחיר מלא</th>
          </tr>
        </thead>
        <tbody>
          <Item />
        </tbody>
      </Table>
    </div>
  );
};

FirstTable.propTypes = {};

FirstTable.defaultProps = {};

export default FirstTable;
