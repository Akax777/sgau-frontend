import block from "../images/block.png";
import PropTypes from "prop-types";
import "./Aside.css";

const Aside = ({
  asideVisible,
  screen,
  setScreen,
  setAsideVisible,
  rol,
  setFormState,
  setFormVisible,
}) => {
  const callScreen = (e) => {
    if (rol === "") {
      setFormState("");
      setFormVisible(true);
    } else {
      setScreen(e);
    }
  };

  const toggleAside = () => {
    setAsideVisible(!asideVisible);
  };

  return (
    <aside
      style={{
        transform: asideVisible ? "translateX(0)" : "translateX(-100%)",
        visibility: asideVisible ? "visible" : "hidden",
      }}
    >
      {screen === "Eventos" ? null : (
        <button
          className="aside-item"
          onClick={() => {
            callScreen("Eventos");
            toggleAside();
          }}
        >
          Eventos
          {rol === "" ? (
            <img className="aside-item-block" src={block} alt="" />
          ) : null}
        </button>
      )}
      {screen === "Turnos" ? null : (
        <button
          className="aside-item"
          onClick={() => {
            callScreen("Turnos");
            toggleAside();
          }}
        >
          Horario
          {rol === "" ? (
            <img className="aside-item-block" src={block} alt="" />
          ) : null}
        </button>
      )}

      {rol === "Admin" ? (
        screen === "Gestionar" ? null : (
          <button
            className="aside-item"
            onClick={() => {
              callScreen("Gestionar");
              toggleAside();
            }}
          >
            Gestionar
          </button>
        )
      ) : null}
    </aside>
  );
};

Aside.propTypes = {
  asideVisible: PropTypes.bool,
  screen: PropTypes.string,
  setScreen: PropTypes.func,
  setAsideVisible: PropTypes.func,
  rol: PropTypes.string,
  setFormState: PropTypes.func,
  setFormVisible: PropTypes.func,
};

export default Aside;
