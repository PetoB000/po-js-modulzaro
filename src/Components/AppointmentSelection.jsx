import { Form, Row, Col } from "react-bootstrap";
import useFetch from "../Hooks/useFetch";
import { useState } from "react";
import AppointmentTable from "./AppointmentTable";

export default function AppointmentSelection() {
  const hairdressers = useFetch("/hairdressers");
  const appointments = useFetch("/appointments");
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedHairdresser, setSelectedHairdresser] = useState("");

  const filteredAppointments = appointments?.filter(
    (app) =>
      app.hairdresser_id === selectedHairdresser &&
      app.appointment_date.includes(selectedDate)
  );

  return (
    <>
      <Form className="my-4">
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Fodrász</Form.Label>
              <Form.Select
                onChange={(e) => setSelectedHairdresser(e.target.value)}
                value={selectedHairdresser}
              >
                <option value="">Válassz fodrászt...</option>
                {hairdressers?.map((hairdresser) => (
                  <option key={hairdresser.id} value={hairdresser.id}>
                    {hairdresser.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Dátum</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {selectedHairdresser && (
        <AppointmentTable appointments={filteredAppointments} />
      )}
    </>
  );
}
