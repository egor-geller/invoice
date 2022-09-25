import React, { useState } from "react";
import { nanoid } from "nanoid";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const AddItem = ({ items }) => {
  const [selectedMeasurement, setSelectedMeasurement] = useState("");
  const [selectedPriceForOne, setPriceForOne] = useState("");
  const [amount, setAmount] = useState(1);
  const [sum, setSum] = useState();
  const [itm, setItm] = useState("");
  const [title, setTitle] = useState();

  const changeState = (e) => {
    const newAddedItem = {
      id: nanoid(),
      item: itm,
      measure: selectedMeasurement,
      amount: amount,
      priceForOne: selectedPriceForOne,
      total: sum,
    };

    if (sessionStorage.getItem("addItem")) {
      const old = [...JSON.parse(sessionStorage.getItem("addItem"))];
      old.push(newAddedItem);
      sessionStorage.setItem("addItem", JSON.stringify(old));
    } else {
      sessionStorage.setItem("addItem", JSON.stringify([newAddedItem]));
    }
  };

  const handlePriceChange = (e) => {
    setAmount(e.currentTarget.value);
    setSum(selectedPriceForOne * e.currentTarget.value);
  };

  const CustomToggle = React.forwardRef(({ children, onClick}, ref) => (
    <FloatingLabel controlId="sec" label="בחר מוצר">
      <Form.Select
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        <option>{children ? children : "בחר מוצר"}</option>
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
    <Form className="noPrint" onSubmit={changeState}>
      <Row className="d-grip g-2">
        <Col style={{ alignSelf: "center" }}>
          <Dropdown as={ButtonGroup} className="d-grid gap-2">
            <Dropdown.Toggle as={CustomToggle}>{title}</Dropdown.Toggle>
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
                      setTitle(item.ItemDescription)
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
        </Col>
        <Col md={2}>
          <FloatingLabel controlId="measurement" label="יחידת מידה">
            <Form.Control
              type="text"
              placeholder="0"
              value={selectedMeasurement}
              readOnly
              style={{ textAlign: "center" }}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel controlId="quantity" label="כמות">
            <Form.Control
              type="text"
              placeholder="0"
              defaultValue={1}
              onChange={handlePriceChange}
              style={{ textAlign: "center" }}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel controlId="priceForOne" label="מחיר יח׳">
            <Form.Control
              type="text"
              placeholder="0"
              value={selectedPriceForOne}
              readOnly
              style={{ textAlign: "center" }}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel controlId="priceForAll" label="מחיר מלא">
            <Form.Control
              type="text"
              placeholder="0"
              value={sum}
              readOnly
              style={{ textAlign: "center" }}
            />
          </FloatingLabel>
        </Col>
        <Col className="d-grid g-2" md="auto" style={{ alignSelf: "center" }}>
          <Button variant="primary" type="submit" size="lg">
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
