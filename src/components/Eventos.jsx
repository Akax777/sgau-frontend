import { useEffect, useState } from "react";
import EventReader from "./EventReader";
import PropTypes from "prop-types";
import "./Eventos.css";

const Eventos = ({ token, url }) => {
  const [showEventA, setshowEventA] = useState(false);
  const [showEvent, setshowEvent] = useState(false);
  const [data, setdata] = useState([]);
  const [eventToSend, seteventToSend] = useState(data[0]);

  const events = data.map((objeto) => (
    <div className="event-item" key={objeto.id}>
      <img
        className="event-img"
        alt=""
        src={`http://${url}:3000/${objeto.image_path === null ? "uploads/default.jpg" : objeto.image_path}`}
      />
      <label className="event-subt">{objeto.name}</label>
      <label className="event-date">
        {objeto.date} a las {objeto.time}
      </label>
      <button
        onClick={() => {
          seteventToSend(objeto);
          setshowEvent(true);
          setTimeout(() => setshowEventA(true), 300);
        }}
        className="event-read"
      >
        Ver evento
      </button>
    </div>
  ));

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://${url}:3000/event`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setdata(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [token, url]);

  return (
    <div className="flex-container">
      <h2 className="screen-sub">Eventos Actuales</h2>
      <div id="event-container">{events}</div>
      {showEvent ? (
        <EventReader
          setShowEvent={setshowEvent}
          setShowEventA={setshowEventA}
          showEvent={showEvent}
          showEventA={showEventA}
          eventToSend={eventToSend}
        />
      ) : null}
    </div>
  );
};

Eventos.propTypes = {
  token: PropTypes.string,
  url: PropTypes.string,
};

export default Eventos;
