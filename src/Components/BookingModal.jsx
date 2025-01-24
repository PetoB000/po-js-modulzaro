import { Modal } from "react-bootstrap";
import { useBooking } from "../Hooks/useBooking";
import { BookingForm } from "./BookingForm";
import useFetch from "../Hooks/useFetch";
import { useEffect, useState } from "react";

export default function BookingModal({ show, handleClose, hairdresser }) {
  const [localAppointments, setLocalAppointments] = useState([]);
  const appointments = useFetch("/appointments");

  useEffect(() => {
    if (appointments) {
      setLocalAppointments(appointments);
    }
  }, [appointments]);

  const bookingProps = useBooking(
    hairdresser,
    handleClose,
    localAppointments,
    setLocalAppointments
  );

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Időpontfoglalás - {hairdresser.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BookingForm {...bookingProps} hairdresserServices={hairdresser.services} />
      </Modal.Body>
    </Modal>
  );
}
