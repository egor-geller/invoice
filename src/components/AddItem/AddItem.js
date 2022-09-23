import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const AddItem = ({ items }) => {
  const [selectedMeasurement, setSelectedMeasurement] = useState("");
  const [selectedPriceForOne, setPriceForOne] = useState("");
  const [amount, setAmount] = useState(1);
  const [sum, setSum] = useState(0);
  const [itm, setItm] = useState("");

  const changeState = (e) => {
    const newAddedItem = {
      id: nanoid(),
      item: itm,
      measure: selectedMeasurement,
      amount: amount,
      priceForOne: selectedPriceForOne,
      total: sum,
    };

    if (localStorage.getItem("addItem")) {
      const old = [...JSON.parse(localStorage.getItem("addItem"))];
      old.push(newAddedItem);
      localStorage.setItem("addItem", JSON.stringify(old));
    } else {
      localStorage.setItem("addItem", JSON.stringify([newAddedItem]));
    }
  };

  const handlePriceChange = (e) => {
    setAmount(e.currentTarget.value);
    setSum(selectedPriceForOne * e.currentTarget.value);
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <FloatingLabel controlId="sec" label="בחר מוצר">
      <Form.Select
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        readOnly
      >
        {children}
      </Form.Select>
    </FloatingLabel>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <Form onSubmit={changeState}>
      <Row className="g-2">
        <Col md>
          <Dropdown className="d-grid gap-2" as={ButtonGroup}>
            <Dropdown.Toggle split as={CustomToggle}></Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
              {items ? (
                items.map((item, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={(e) => {
                      setItm(item.ItemDescription);
                      setPriceForOne(item.PriceForOne);
                      setSelectedMeasurement(item.Measurement);
                      setSum(item.PriceForOne);
                    }}
                  >
                    {item.ItemDescription}
                  </Dropdown.Item>
                ))
              ) : (
                <></>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <label className="text-truncate">{itm ? itm : ""}</label>
        </Col>
        <Col md>
          <FloatingLabel controlId="measurement" label="יחידת מידה">
            <Form.Control
              type="text"
              placeholder=""
              value={selectedMeasurement}
              readOnly
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="quantity" label="כמות">
            <Form.Control
              type="text"
              placeholder=""
              defaultValue={1}
              onChange={handlePriceChange}
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="priceForOne" label="מחיר יח׳">
            <Form.Control
              type="text"
              placeholder=""
              value={selectedPriceForOne}
              readOnly
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="priceForAll" label="מחיר מלא">
            <Form.Control type="text" placeholder="" value={sum} readOnly />
          </FloatingLabel>
        </Col>
        <Col md="auto" style={{ display: "flex" }}>
          <Button variant="primary" type="submit">
            הוסף
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
AddItem.propTypes = {};

AddItem.defaultProps = {};

export default AddItem;
