import { useEffect, useState } from "react";
import type { Champ } from "../types/Champ";
import { apiClient, BaseUrl } from "../api/apiClient";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function App() {
  const [champs, setChamps] = useState<Array<Champ>>();
  const navigate = useNavigate();

  const isLoggedIn =
    JSON.parse(localStorage.getItem("credentials") || "[]") !== null &&
    JSON.parse(localStorage.getItem("credentials") || "[]") !== "";

  useEffect(() => {
    apiClient
      .get("champions")
      .then((res) => setChamps(res.data))
      .catch(() => toast.error("Error fetching data"));
  }, []);

  const onDelete = (id: number) => {};

  const generateCard = (champ: Champ) => {
    return (
      <Col>
        <Card style={{ width: "18rem" }}>
          <Carousel>
            {champ.images.map((img) => (
              <Carousel.Item>
                <img src={`${BaseUrl}/images/${img}`} width={300} />
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Body>
            <Card.Title>
              {champ.name}, {champ.role}, {champ.lane}
            </Card.Title>
            <Card.Text>
              difficulty: {champ.difficulty}
              blue essence: {champ.blue_essence}
              damage type: {champ.damage_type}
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => navigate(`/champ/${champ.id}`)}
            >
              Megtekintés
            </Button>
            {isLoggedIn && (
              <Button variant="danger" onClick={() => onDelete(champ.id)}>
                Törlés
              </Button>
            )}
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <>
      <Container>
        {isLoggedIn ? (
          <Button
            variant="primary"
            onClick={() => navigate("/login")}
            className="m-3"
          >
            Login
          </Button>
        ) : (
          <Button
            variant="danger"
            onClick={() => localStorage.setItem("credentials", "")}
            className="m-3"
          >
            Logout
          </Button>
        )}
        {champs?.length == 0 ? (
          <div>Nincs champ</div>
        ) : (
          <Row xs={"auto"} md={"auto"} className="g-4">
            {champs?.map((champ) => generateCard(champ))}
          </Row>
        )}
      </Container>
    </>
  );
}

export default App;
