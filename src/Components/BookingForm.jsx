import { Form, Button, Row, Col } from "react-bootstrap";

export const BookingForm = ({
  userData,
  setUserData,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  availableSlots,
  handleSubmit,
}) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Név</Form.Label>
            <Form.Control
              type="text"
              required
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telefonszám</Form.Label>
            <Form.Control
              type="tel"
              required
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Válassz dátumot</Form.Label>
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Válassz időpontot</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {availableSlots.length > 0 ? (
                availableSlots.map((time) => (
                  <Button
                    key={time}
                    variant={
                      selectedTime === time ? "primary" : "outline-primary"
                    }
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))
              ) : (
                <div className="alert alert-info w-100">
                  Nincs szabad időpont erre a napra. Kérjük válasszon másik
                  napot!
                </div>
              )}
            </div>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-3">
          <Button variant="success" type="submit" disabled={!selectedTime}>
            Lefoglalom
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
