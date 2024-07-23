import { useState } from "react";
import PropTypes from "prop-types";
import "./Header.css";

const Header = ({
  asideVisible,
  setAsideVisible,
  formVisible,
  setFormVisible,
  screen,
  setScreen,
  rol,
  setRol,
  token,
  url,
}) => {
  const [lobActive, setlobActive] = useState(false);

  const toggleAside = () => {
    setAsideVisible(!asideVisible);
    setFormVisible(false); // Cerrar el formulario si está abierto
  };

  const toggleForm = () => {
    if (rol === "") {
      setFormVisible(!formVisible);
      setAsideVisible(false); // Cerrar el aside si está abierto
    } else {
      setlobActive(!lobActive);
    }
  };

  const returnIni = () => {
    setScreen("Principal");
    if (asideVisible) toggleAside();
    if (formVisible) toggleForm();
  };

  const logout = () => {
    fetch(`http://${url}:3000/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setScreen("Principal");
        setRol("");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <header className="bg-gray-200 p-1 flex flex-row">
      <button onClick={toggleAside} id="button-bar" className="b"></button>
      {screen === "Principal" ? null : (
        <button onClick={returnIni} id="inicio" className="b">
          Inicio
        </button>
      )}
      <button
        style={{ marginLeft: screen === "Principal" ? "auto" : null }}
        id="contact"
        className="b"
      >
        Contactar
      </button>
      <button id="about" className="b">
        Acerca
      </button>

      {rol === "" ? null : lobActive === true ? (
        <button
          id="logout"
          className="b"
          style={{ width: lobActive === true ? "9%" : "0rem" }}
          onClick={logout}
        >
          Abandonar
        </button>
      ) : null}

      <button onClick={toggleForm} id="account" className="b"></button>
    </header>
  );
};

Header.propTypes = {
  asideVisible: PropTypes.bool,
  setAsideVisible: PropTypes.func,
  formVisible: PropTypes.bool,
  setFormVisible: PropTypes.func,
  screen: PropTypes.string,
  setScreen: PropTypes.func,
  rol: PropTypes.string,
  setRol: PropTypes.func,
  token: PropTypes.string,
  url: PropTypes.string,
};

export default Header;
