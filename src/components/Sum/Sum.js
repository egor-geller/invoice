import React, { useState, useEffect, useCallback, useReducer } from "react";
import PropTypes from "prop-types";
import styles from "./Sum.module.css";
import Table from "react-bootstrap/Table";

const Sum = () => {
  const [data, setData] = useState([]);
  const [sum, setSum] = useState(0);
  const [tax, setTax] = useState(0.17);
  const [totalSum, setTotalSum] = useState(1);

  const getAddedItem = useCallback(async () => {
    const d = sessionStorage.getItem("addItem");
    const newAddItem = JSON.parse(d);

    if (d) {
      setData(newAddItem);
    }
  }, []);

  const s = data.reduce((s, val) => {
    return val.total + s;
  }, 0);

  const addTax = useCallback(async () => {
    if (s > 0) {
      setSum(s);
      setTotalSum(s * tax + s);
      sessionStorage.setItem("totalSum", s * tax + s);
    }
  }, [s, tax]);

  useEffect(() => {
    getAddedItem();
    addTax();
  }, [getAddedItem, addTax]);

  return (
    <Table responsive striped="columns" bordered hover dir="rtl">
      <tbody>
        <tr>
          <td>סה״כ לפני מע״מ</td>
          <td>{sum}</td>
        </tr>
        <tr>
          <td>מע״מ 17%</td>
          <td>
            <label>
              {(tax * sum).toFixed(2)}
            </label>
          </td>
        </tr>
        <tr>
          <td>סה״כ לתשלום</td>
          <td>{totalSum.toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  );
};

Sum.propTypes = {};

Sum.defaultProps = {};

export default Sum;
