import { Col, Container, Row } from "react-bootstrap";
import logo from "../Assets/logo.png";

export default function Header() {
  return (
    <Container className="text-center my-4">
      <Row>
        <Col>
          <img src={logo} alt="Business Logo" style={{ maxWidth: "150px" }} />
          <h1 className="mt-1">Fantázia fodrászat</h1>
        </Col>
      </Row>
    </Container>
  );
}
