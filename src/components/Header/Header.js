import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import Table from "react-bootstrap/esm/Table";

const Header = () => {
  return (
    <Table style={{width: "100%"}}>
      <thead>
        <tr>
          <td style={{border: "none", width: "70%"}}>
            <h1>פלאיי אלקטריק בע״מ</h1>
            <p>ח.פ. 515337251</p>
          </td>
          <td style={{border: "none"}}>
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
