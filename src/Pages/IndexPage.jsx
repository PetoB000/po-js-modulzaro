import { Container, Row, Spinner } from "react-bootstrap";
import useFetch from "../Hooks/useFetch";

import HairdresserCard from "../Components/HairdresserCard";

export default function Index() {
  const hairdressers = useFetch("/hairdressers");

  if (!hairdressers) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  return (
    <>
      <Container className="my-5">
        <Row xs={1} md={2} lg={3} className="g-4">
          {hairdressers.map((hairdresser) => (
            <HairdresserCard key={hairdresser.id} hairdresser={hairdresser} />
          ))}
        </Row>
      </Container>
    </>
  );
}
