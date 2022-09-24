import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import BootstrapTable from "react-bootstrap-table-next";
import CellEditFactory from "react-bootstrap-table2-editor";
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
          sessionStorage.setItem("jsonData", JSON.stringify(rows));
          window.location.reload();
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const getJsonData = useCallback(async function () {
    const jsonData = sessionStorage.getItem("jsonData");

    if (jsonData !== null) {
      setItems(JSON.parse(jsonData));
    }
  }, []);

  const getAddedItem = useCallback(async function () {
    const d = sessionStorage.getItem("addItem");
    const newAddItem = JSON.parse(d);

    if (d) {
      setData(newAddItem);
    }
  }, []);

  useEffect(() => {
    getJsonData();
    getAddedItem();
  }, [getJsonData, getAddedItem]);


  const columns = [
    {
      dataField: "",
      text: "#",
      formatter: (cell, row, rowIndex, extraData) => (
        <span>{rowIndex + 1}</span>
      )
    },
    {
      dataField: "item",
      text: "תאור מוצר",
      editable: false,
    },
    {
      dataField: "measure",
      text: "יחידת מידה",
      editable: false,
    },
    {
      dataField: "amount",
      text: "כמות",
    },
    {
      dataField: "priceForOne",
      text: "מחיר יח׳",
      editable: false,
    },
    {
      dataField: "total",
      text: "מחיר מלא",
      editable: false,
    },
  ];

  return (
    <div>
      {sessionStorage["jsonData"] ? (
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
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        striped
        hover
        condensed
        noDataIndication="Table is Empty"
        cellEdit={CellEditFactory({
          mode: "click",
          blurToSave: true,
          afterSaveCell: (oldValue, newValue, row, column) => {
            data.map((d, idx) => {
              if (d.id === row.id) {
                const d = sessionStorage.getItem("addItem");
                const newAddItem = JSON.parse(d);
                newAddItem[idx].amount = newValue;
                newAddItem[idx].total = newValue * newAddItem[idx].priceForOne;
                sessionStorage.setItem("addItem", JSON.stringify(newAddItem));
                window.location.reload();
              }
              return 1;
            });
          },
          autoSelectText: true,
        })}
      />
    </div>
  );
};

export default FirstTable;
