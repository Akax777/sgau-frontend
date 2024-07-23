import { useState } from "react";
import GestionarUsuario from "./GestionarUsuario";
import GestionarEvento from "./GestionarEvento";
import PropTypes from "prop-types";
import "./Gestionar.css";

const Gestionar = ({ token, url }) => {
  const [view, setview] = useState("Usuario");

  return (
    <div id="gest">
      <h1 className="screen-sub">Gestionar {view}</h1>
      <div id="gest-content">
        <div id="gest-view">
          <button
            className={
              view === "Evento" ? "gest-view-item-focus" : "gest-view-item"
            }
            onClick={() => {
              setview("Evento");
            }}
          >
            Eventos
          </button>
          <button
            className={
              view === "Usuario" ? "gest-view-item-focus" : "gest-view-item"
            }
            onClick={() => {
              setview("Usuario");
            }}
          >
            Usuarios
          </button>
        </div>
        {view === "Usuario" ? (
          <GestionarUsuario token={token} url={url} />
        ) : null}
        {view === "Evento" ? <GestionarEvento token={token} url={url} /> : null}
      </div>
    </div>
  );
};

Gestionar.propTypes = {
  token: PropTypes.string,
  url: PropTypes.string,
};

export default Gestionar;
