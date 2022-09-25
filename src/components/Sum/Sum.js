import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./Sum.module.css";
import Table from "react-bootstrap/Table";

const Sum = () => {
  const [data, setData] = useState([]);
  const [sum, setSum] = useState(0);
  const [totalSum, setTotalSum] = useState(1);

  const getAddedItem = useCallback(async function () {
    const d = sessionStorage.getItem("addItem");
    const newAddItem = JSON.parse(d);

    if (d) {
      setData(newAddItem);
    }
  }, []);

  const addTax = () => {
    const s = data.reduce((s, val) => {
      return val.total + s;
    }, 0);
    const tax = document.getElementById("tax").value;
    sessionStorage.setItem("tax", tax);
    setTotalSum(s * (tax / 100) + s);
    sessionStorage.setItem("totalSum", s * (tax / 100) + s);
  };

  useEffect(() => {
    getAddedItem();
  }, [getAddedItem]);

  return (
    <Table responsive striped="columns" bordered hover dir="rtl">
      <tbody>
        <tr>
          <td>סה״כ לפני מע״מ</td>
          <td>
            {data.reduce((s, val) => {
              return val.total + s;
            }, 0).toFixed(2)}
          </td>
        </tr>
        <tr>
          <td>מע״מ</td>
          <td>
            <input
              className="noPrint"
              id="tax"
              type="number"
              placeholder="מע״מ"
              onChange={addTax}
              style={{ textAlign: "center" }}
              value={
                sessionStorage.getItem("tax")
                  ? sessionStorage.getItem("tax")
                  : ""
              }
            />
            <label className="toPrint">{sessionStorage.getItem("tax")
                  ? sessionStorage.getItem("tax")
                  : ""}</label>
          </td>
        </tr>
        <tr>
          <td>סה״כ לתשלום</td>
          <td>{totalSum !== 1 ? totalSum.toFixed(2) : Number(sessionStorage.getItem("totalSum")).toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  );
};

Sum.propTypes = {};

Sum.defaultProps = {};

export default Sum;
