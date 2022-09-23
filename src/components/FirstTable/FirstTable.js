import React, { useState, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import AddItem from "../AddItem/AddItem";
import { read, utils } from "xlsx";

const FirstTable = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

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
          localStorage.setItem("jsonData", JSON.stringify(rows));
          window.location.reload();
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const getJsonData = useCallback(async function () {
    const jsonData = localStorage.getItem("jsonData");

    if (jsonData !== null) {
      setItems(JSON.parse(jsonData));
    }
  }, []);

  const getAddedItem = useCallback(async function () {
      const d = localStorage.getItem("addItem");
      const newAddItem = JSON.parse(d);

      if(d) {
        setData(newAddItem);
      }
        
    },[]);

  useEffect(() => {
    getJsonData();
    getAddedItem();
  }, [getJsonData, getAddedItem]);

  return (
    <div>
      {localStorage["jsonData"] ? (
        <></>
      ) : (
        <div className="custom-file">
          <Form.Label className="custom-file-label" htmlFor="inputGroupFile" />
          <Form.Control
            type="file"
            name="file"
            id="inputGroupFile"
            required
            onChange={handleImport}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </div>
      )}
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
          {data ? (
            data.map((d, index) => (
              <tr key={d.id}>
                <td>{index + 1}</td>
                <td>{d.item}</td>
                <td>{d.measure}</td>
                <td>{d.amount}</td>
                <td>{d.priceForOne}</td>
                <td>{d.total}</td>
              </tr>
            )
          )
            ) : (
              <></>
            )}
        </tbody>
      </Table>
    </div>
  );
};

FirstTable.propTypes = {};

FirstTable.defaultProps = {};

export default FirstTable;
