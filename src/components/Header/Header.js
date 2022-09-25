import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";

const Header = () => {
  return (
      <Container style={{ direction: "rtl"}}>
        <Row style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Col md={8}>
            {/* style={{ alignSelf: "center" }} */}
            <h1>פלאיי אלקטריק בע״מ</h1>
            <p>ח.פ. 515337251</p>
          </Col>
          <Col md={4}>
            <Figure>
              {/* style={{ display: "grid", justifyContent: "flex-end" }} */}
              <Figure.Image
                width={100}
                height={100}
                alt="FlyTag logo"
                src="images/FlyTagLogo.jpeg"
              />
            </Figure>
          </Col>
        </Row>
      </Container>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
