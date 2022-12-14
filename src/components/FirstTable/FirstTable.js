import React, { useState, useEffect, useCallback } from "react";
import Button from '@mui/material/Button';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
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

    if (jsonData) {
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

  const handleDelete = (e, index) => {
    const old = [...JSON.parse(sessionStorage.getItem("addItem"))];
    old.splice(index, 1);
    sessionStorage.setItem("addItem", JSON.stringify(old));
    window.location.reload();
  }

  useEffect(() => {
    getJsonData();
    getAddedItem();

  }, [getJsonData, getAddedItem]);

  const columns = [
    {
      dataField: "",
      text: "#",
      isDummyField: true,
      formatter: (cell, row, rowIndex, extraData) => (
        <span>{rowIndex + 1}</span>
      ),
    },
    {
      dataField: "item",
      text: "???????? ????????",
      editable: false,
    },
    {
      dataField: "measure",
      text: "?????????? ????????",
      editable: false,
    },
    {
      dataField: "amount",
      text: "????????",
    },
    {
      dataField: "priceForOne",
      text: "???????? ??????",
      editable: false,
    },
    {
      dataField: "total",
      text: "???????? ??????",
      editable: false,
    },
    {
      dataField: "",
      text: "",
      editable: false,
      isDummyField: true,
      headerClasses: "noPrint",
      classes: "noPrint",
      formatter: (cell, row, rowIndex, extraData) => (
        <span>
          <IconButton aria-label="delete" key={row} onClick={(e) => handleDelete.apply(null, [e, rowIndex])}>
          <Delete />
          </IconButton>
        </span>
      ),
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
      <AddItem items={items} />
      <BootstrapTable
        bootstrap4
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
