import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Champ } from "../types/Champ";
import { apiClient, BaseUrl } from "../api/apiClient";
import { Carousel, Container } from "react-bootstrap";
import { toast } from "react-toastify";

const OneChamp = () => {
  const { id } = useParams();
  const [champ, setChamp] = useState<Champ>();

  useEffect(() => {
    apiClient
      .get(`/champions/${id}`)
      .then((res) => setChamp(res.data))
      .catch(() => toast.error("Erro fetching data"));
  }, []);

  return (
    <>
      <Container>
        <Carousel style={{ width: 1000, margin: "auto" }}>
          {champ?.images.map((img) => (
            <Carousel.Item>
              <img src={`${BaseUrl}/images/${img}`} width={1000} height={500} />
            </Carousel.Item>
          ))}
        </Carousel>
        <div style={{ textAlign: "center" }}>
          <h1>{champ?.name}</h1>
          <h2>
            {" "}
            {champ?.role}, {champ?.lane}
          </h2>
          <p>difficulty: {champ?.difficulty}</p>
          <p>blue essence: {champ?.blue_essence}</p>
          <p>damage type: {champ?.damage_type}</p>
          <p>{champ?.description}</p>
        </div>
      </Container>
    </>
  );
};
export default OneChamp;
