import { useState } from "react";
import PropTypes from "prop-types";
import userIcon from "../images/user-icon-3.png";
import logo from "../images/Logotipo_UCI_2.png";
import block from "../images/block.png";
import "./Form.css";

const Form = ({
  formVisible,
  setFormVisible,
  setUserName,
  setRol,
  formState,
  setFormState,
  setToken,
  url,
}) => {
  const [inputValue, setinputValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");

  const toggleForm = () => {
    setFormVisible(!formVisible);
    setFormState("");
  };

  const handleChange = (e) => {
    setinputValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setpasswordValue(e.target.value);
  };

  const sendUserName = async (e) => {
    if (inputValue.trim().length > 3) {
      e.preventDefault();

      try {
        const response = await fetch(`http://${url}:3000/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: inputValue,
            password: passwordValue,
          }),
        });

        if (response.ok) {
          console.log(response);
          const data = await response.json();
          console.log(data);
          setUserName(data.name);
          setinputValue("");
          toggleForm();
          console.log(data.role);
          setRol(data.role);
          setToken(data.token);
          console.log(data.token);
        } else {
          console.error("Error:", response.statusText);
          setFormState("WrongPassword");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <form
      onSubmit={sendUserName}
      style={{ transform: formVisible ? "scale(100%)" : "scale(0)" }}
      id="auth"
      action=""
    >
      <img src={logo} id="f-img-one" alt="" />

      <div className="f-input-outside">
        <div className="f-input-image-container">
          <img className="f-input-image" src={userIcon} alt="" />
        </div>

        <input
          value={inputValue}
          className="f-input"
          type="text"
          name="user"
          placeholder="Usuario"
          onChange={handleChange}
        />
      </div>

      <div className="f-input-outside">
        <div className="f-input-image-container">
          <img className="f-input-image" src={block} alt="" />
        </div>

        <input
          value={passwordValue}
          className="f-input"
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handlePasswordChange}
        />
      </div>

      <div id="notify-box">
        {formState === "Noauth" ? <p>Debe autenticarse</p> : null}
        {formState === "WrongPassword" ? <p>Contraseña incorrecta</p> : null}
      </div>

      <div id="button-container">
        <button className="f-button" type="submit">
          Acceder
        </button>
        <button className="f-button" type="button" onClick={toggleForm}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

Form.propTypes = {
  formVisible: PropTypes.bool,
  setFormVisible: PropTypes.func,
  setUserName: PropTypes.func,
  setRol: PropTypes.func,
  formState: PropTypes.string,
  setFormState: PropTypes.func,
  setToken: PropTypes.func,
  url: PropTypes.string,
};

export default Form;
