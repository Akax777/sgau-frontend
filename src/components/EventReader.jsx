import PropTypes from "prop-types";
import "./EventReader.css";

const EventReader = ({
  setShowEvent,
  setShowEventA,
  showEvent,
  showEventA,
  eventToSend,
}) => {
  const closeER = () => {
    setShowEventA(false);
    setTimeout(() => {
      setShowEvent(false);
    }, 3000);
  };

  return (
    <div
      id="eventreader"
      style={{
        transform: showEventA ? "scale(1)" : "scale(0)",
        visibility: showEventA ? "visible" : showEvent ? "hidden" : null,
      }}
    >
      <div id="eventreader-head">
        <h3 id="eventreader-title">{eventToSend.name}</h3>
      </div>
      <div id="eventreader-main">
        <div className="eventreader-side">
          <img
            alt=""
            src={`http://192.168.137.1:3000/${eventToSend.image_path === null ? "uploads/default.jpg" : eventToSend.image_path}`}
            className="event-img"
          ></img>
          <label id="eventreader-date">
            {eventToSend.date + " a las " + eventToSend.time}
          </label>
        </div>
        <div className="eventreader-side">
          <label className="eventreader-subt">LUGAR</label>
          <p className="eventreader-text">{eventToSend.location}</p>
          <label className="eventreader-subt">DESCRIPCION</label>
          <p className="eventreader-text">{eventToSend.description}</p>
          <button onClick={closeER} id="eventreader-close">
            CERRAR
          </button>
        </div>
      </div>
    </div>
  );
};

EventReader.propTypes = {
  eventSample: PropTypes.any,
  setShowEvent: PropTypes.func,
  setShowEventA: PropTypes.func,
  showEvent: PropTypes.bool,
  showEventA: PropTypes.bool,
  eventToSend: PropTypes.object,
};

export default EventReader;
