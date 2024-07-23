import { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";

const GestionarUsuario = ({ token, url }) => {
  const [rl, setrl] = useState(0);
  const [action, setaction] = useState("");
  const [data, setdata] = useState([]);
  const [add, setadd] = useState(false);
  const [indexModify, setindexModify] = useState("");
  const [userData, setuserData] = useState({
    username: "",
    password: "",
    name: "",
    last_name: "",
    group: "",
    role: "",
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
    setuserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const addUser = () => {
    console.log(userData);
    fetch(`http://${url}:3000/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
        name: userData.name,
        last_name: userData.last_name,
        group: userData.group,
        role: userData.role,
      }),
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

  const deleteUser = (index) => {
    fetch(`http://${url}:3000/user/${data[index].id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json();
        console.log(response);
      })
      .then(() => {
        console.log("LOL");
        setrl(rl + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const modifyUser = (index) => {
    setuserData({
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

  const acceptModifyUser = () => {};

  const cancelModifyUser = () => {
    setindexModify("");
    setrl(rl + 1);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://${url}:3000/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setdata(data);
        setuserData({
          username: "",
          password: "",
          name: "",
          last_name: "",
          group: "",
          role: "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [token, url, rl]);

  const userItems = data.map((objeto, index) => (
    <Fragment key={objeto.id}>
      {index !== indexModify ? (
        <div className="gest-list-item">{objeto.username}</div>
      ) : (
        <div className="gest-list-item">
          <input
            placeholder="Usuario"
            name="username"
            value={objeto.username}
            onChange={handleInputChange}
          />
        </div>
      )}
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
        <div className="gest-list-item">{objeto.last_name}</div>
      ) : (
        <div className="gest-list-item">
          <input
            placeholder="Apellido"
            name="last_name"
            value={objeto.last_name}
            onChange={handleInputChange}
          />
        </div>
      )}
      {index !== indexModify ? (
        <div className="gest-list-item">{objeto.group}</div>
      ) : (
        <div className="gest-list-item">
          <input
            placeholder="Grupo"
            name="group"
            value={objeto.group}
            onChange={handleInputChange}
          />
        </div>
      )}
      {index !== indexModify ? (
        <div className="gest-list-item">{objeto.role}</div>
      ) : (
        <div className="gest-list-item">
          <input
            placeholder="Rol"
            name="role"
            value={objeto.role}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div className="gest-list-item">
        {index !== indexModify ? (
          <button className="modify-user" onClick={() => modifyUser(index)}>
            Modificar
          </button>
        ) : (
          <button className="new-user" onClick={() => acceptModifyUser(index)}>
            Aceptar
          </button>
        )}
      </div>
      <div className="gest-list-item">
        {index !== indexModify ? (
          <button className="delete-user" onClick={() => deleteUser(index)}>
            Eliminar
          </button>
        ) : (
          <button className="delete-user" onClick={() => cancelModifyUser()}>
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
          placeholder="Usuario"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="gest-list-item">
        <input
          placeholder="Nombre"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="gest-list-item">
        <input
          placeholder="Apellido"
          name="last_name"
          value={userData.last_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="gest-list-item">
        <input
          placeholder="Grupo"
          name="group"
          value={userData.group}
          onChange={handleInputChange}
        />
      </div>
      <div className="gest-list-item">
        <input
          placeholder="Rol"
          name="role"
          value={userData.role}
          onChange={handleInputChange}
        />
      </div>
      <div className="gest-list-item">
        <input
          placeholder="Contraseña"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="gest-list-item">
        <button className="new-user" onClick={() => addUser()}>
          Añadir
        </button>
      </div>
    </Fragment>
  );

  return (
    <div id="gest-list">
      <div id="gest-list-header">
        <div className="gest-list-item-header">Usuario</div>
        <div className="gest-list-item-header">Nombre</div>
        <div className="gest-list-item-header">Apellido</div>
        <div className="gest-list-item-header">Grupo</div>
        <div className="gest-list-item-header">Rol</div>
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
        {userItems}
      </div>
    </div>
  );
};

GestionarUsuario.propTypes = {
  token: PropTypes.string,
  url: PropTypes.string,
};

export default GestionarUsuario;
