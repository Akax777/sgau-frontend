import PropTypes from "prop-types";

const PresentationContainer = ({ userName }) => {
  return (
    <>
      <div id="presentation-container">
        <h1 id="uni">
          {" "}
          Bienvenido <br />
          {userName},<br /> al SGAU
        </h1>
        <h4 id="subt">
          Explora el mundo universitario: <br /> actividades horarios,
          documentación y noticias relevantes en un solo clic.
        </h4>
        <button id="brm">
          <div className="b-inner-ext"></div>
          <p id="b-inner-text">↓LEER MÁS↓</p>
          <div className="b-inner-ext"></div>
        </button>
      </div>
    </>
  );
};

PresentationContainer.propTypes = {
  userName: PropTypes.string,
};

export default PresentationContainer;
