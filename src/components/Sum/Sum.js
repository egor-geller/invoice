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
    setTotalSum((s * (tax / 100)) + s);
    sessionStorage.setItem("totalSum", (s * (tax / 100)) + s);
  }

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
            }, 0)}
          </td>
        </tr>
        <tr>
          <td>מע״מ</td>
          <td>
            <input id="tax" type="number" onChange={addTax} style={{textAlign: "center"}}/>
          </td>
        </tr>
        <tr>
          <td>סה״כ לתשלום</td>
          <td>
            {totalSum}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

Sum.propTypes = {};

Sum.defaultProps = {};

export default Sum;
