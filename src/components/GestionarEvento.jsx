import { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";

const GestionarEvento = ({ token, url }) => {
  const [rl, setrl] = useState(0);
  const [action, setaction] = useState("");
  const [data, setdata] = useState([]);
  const [add, setadd] = useState(false);
  const [indexModify, setindexModify] = useState("");
  const [eventData, seteventData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: "",
  });
  useEffect(() => {
    if (action === "add") {
      setindexModify("");
    } else if (action === "modify") {
      setadd(false);
    }
  }, [action]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    seteventData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    seteventData({ ...eventData, image: selectedImage });
    console.log(eventData);
  };
  const addEvent = () => {
    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("location", eventData.location);
    formData.append("image", eventData.image);
    console.log(formData);

    fetch(`http://${url}:3000/event`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setadd(false);
        setrl(rl + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const deleteEvent = (index) => {
    fetch(`http://${url}:3000/event/${data[index].id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json();
      })
      .then(() => {
        setrl(rl + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const modifyEvent = (index) => {
    seteventData({
      username: `${data[index].username}`,
      password: `${data[index].password}`,
      name: `${data[index].name}`,
      last_name: `${data[index].last_name}`,
      group: `${data[index].group}`,
      role: `${data[index].role}`,
    });
    setaction("modify");
    setindexModify(index);
  };

  const acceptModifyEvent = () => {};

  const cancelModifyEvent = () => {
    setindexModify("");
    setrl(rl + 1);
  };

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
        seteventData({
          name: "",
          description: "",
          date: "",
          time: "",
          location: "",
          image: "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [token, url, rl]);
  const eventItems = data.map((objeto, index) => (
    <Fragment key={objeto.id}>
      {index !== indexModify ? (
        <div className="gest-list-item">{objeto.name}</div>
      ) : (
        <div className="gest-list-item">
          <input
            placeholder="Nombre"
            name="name"
            value={objeto.name}
            onChange={handleInputChange}
          />
        </div>
      )}
      {index !== indexModify ? (
        <div className="gest-list-item">{objeto.description}</div>
      ) : (
        <div className="gest-list-item">
          <input
            placeholder="Descripción"
            name="description"
            value={objeto.description}
            onChange={handleInputChange}
          />
        </div>
      )}
      {index !== indexModify ? (
        <div className="gest-list-item">{objeto.date}</div>
      ) : (
        <div className="gest-list-item">
          <input
            placeholder="Fecha"
            name="date"
            value={objeto.date}
            onChange={handleInputChange}
          />
        </div>
      )}
      {index !== indexModify ? (
        <div className="gest-list-item">{objeto.time}</div>
      ) : (
        <div className="gest-list-item">
          <input
            placeholder="Hora"
            name="time"
            value={objeto.time}
            onChange={handleInputChange}
          />
        </div>
      )}
      {index !== indexModify ? (
        <div className="gest-list-item">{objeto.location}</div>
      ) : (
        <div className="gest-list-item">
          <input
            placeholder="Lugar"
            name="location"
            value={objeto.location}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div className="gest-list-item">
        {index !== indexModify ? (
          <button className="modify-user" onClick={() => modifyEvent(index)}>
            Modificar
          </button>
        ) : (
          <button className="new-user" onClick={() => acceptModifyEvent(index)}>
            Aceptar
          </button>
        )}
      </div>
      <div className="gest-list-item">
        {index !== indexModify ? (
          <button className="delete-user" onClick={() => deleteEvent(index)}>
            Eliminar
          </button>
        ) : (
          <button className="delete-user" onClick={() => cancelModifyEvent()}>
            Cancelar
          </button>
        )}
      </div>
    </Fragment>
  ));
  const addInputs = (
    <Fragment>
      <div className="gest-list-item">
        <input
          placeholder="Nombre"
          name="name"
          value={eventData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="gest-list-item">
        <input
          placeholder="Descripción"
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="gest-list-item">
        <input
          placeholder="Fecha"
          name="date"
          value={eventData.date}
          onChange={handleInputChange}
        />
      </div>
      <div className="gest-list-item">
        <input
          placeholder="Hora"
          name="time"
          value={eventData.time}
          onChange={handleInputChange}
        />
      </div>
      <div className="gest-list-item">
        <input
          placeholder="Lugar"
          name="location"
          value={eventData.location}
          onChange={handleInputChange}
        />
      </div>
      <div className="gest-list-item">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <div className="gest-list-item">
        <button className="new-user" onClick={() => addEvent()}>
          Añadir
        </button>
      </div>
    </Fragment>
  );
  return (
    <div id="gest-list">
      <div id="gest-list-header">
        <div className="gest-list-item-header">Nombre</div>
        <div className="gest-list-item-header">Descripcion</div>
        <div className="gest-list-item-header">Fecha</div>
        <div className="gest-list-item-header">Hora</div>
        <div className="gest-list-item-header">Lugar</div>
        <div className="gest-list-item-header">
          <input id="search" placeholder={"Buscar"}></input>
        </div>
        <div className="gest-list-item-header">
          <button
            className={add === false ? "new-user" : "delete-user"}
            onClick={() => {
              setaction("add");
              setadd(!add);
            }}
          >
            {add === false ? "Nuevo" : "Cancelar"}
          </button>
        </div>
      </div>

      <div id="gest-list-content">
        {add === true ? addInputs : null}
        {eventItems}
      </div>
    </div>
  );
};

GestionarEvento.propTypes = {
  token: PropTypes.string,
  url: PropTypes.string,
};

export default GestionarEvento;
