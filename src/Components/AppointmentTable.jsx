import { Row, Table } from "react-bootstrap";

export default function AppointmentTable({ appointments }) {
  if (appointments.length === 0) {
    return (
      <Row className="mt-5 text-white bg-primary p-2 rounded">
        <h2 className="text-center">Nincs foglalás</h2>
      </Row>
    );
  }

  return (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>Időpont</th>
          <th>Vendég neve</th>
          <th>Telefonszám</th>
          <th>Szolgáltatás</th>
        </tr>
      </thead>
      <tbody>
        {appointments?.map((appointment) => (
          <tr key={appointment.id}>
            <td>
              {appointment.appointment_date.split(" ")[1].substring(0, 5)}
            </td>
            <td>{appointment.customer_name}</td>
            <td>{appointment.customer_phone}</td>
            <td>{appointment.service}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
