import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import Table from "react-bootstrap/esm/Table";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Table style={{ width: "100%", direction: "rtl" }}>
      <thead>
        <tr>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">הצעת מחיר</Nav.Link>
                  <Nav.Link href="/addProduct">הוספת מוצר</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </tr>
        <tr>
          <td style={{ border: "none", width: "70%" }}>
            <h1>פלאיי אלקטריק בע״מ</h1>
            <p>ח.פ. 515337251</p>
          </td>
          <td style={{ border: "none" }}>
            <Figure>
              <Figure.Image
                width={100}
                height={100}
                alt="FlyTag logo"
                src="images/FlyTagLogo.jpeg"
              />
            </Figure>
          </td>
        </tr>
      </thead>
    </Table>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
