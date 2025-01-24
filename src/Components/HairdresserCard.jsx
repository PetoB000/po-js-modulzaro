import { useState } from "react";
import { Card, Badge, Button, Col } from "react-bootstrap";
import profile_image from "../Assets/profile_image.png";
import BookingModal from "./BookingModal";
import useFetch from "../Hooks/useFetch";

export default function HairdresserCard({ hairdresser }) {
  const [show, setShow] = useState(false);

  const appointments = useFetch("/appointments");

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Col className="d-flex justify-content-evenly mt-5 mb-3">
      <Card
        className="text-center border border-black"
        style={{ width: "18rem" }}
      >
        <div className="position-relative">
          <img
            src={profile_image}
            alt={hairdresser.name}
            className="rounded-circle position-absolute translate-middle"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              border: "3px solid white",
            }}
          />
        </div>
        <Card.Body className="pt-5 mt-4 d-flex flex-column">
          <div>
            <Card.Title>{hairdresser.name}</Card.Title>
            <Card.Text>{hairdresser.phone_number}</Card.Text>
            <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
              {hairdresser.services.map((service, index) => (
                <Badge bg="primary" key={index}>
                  {service}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-auto">
            <Button variant="success" onClick={handleShow}>
              Foglalj időpontot
            </Button>
          </div>
        </Card.Body>
      </Card>
      <BookingModal
        show={show}
        handleClose={handleClose}
        hairdresser={hairdresser}
        appointments={appointments}
      />
    </Col>
  );
}
