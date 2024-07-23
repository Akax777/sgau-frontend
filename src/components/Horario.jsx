import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./Horario.css";

const Horario = ({ rol, url, token }) => {
  const [subjects, setSubjects] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [schedules, setschedules] = useState([]);
  const [action, setaction] = useState("");
  const [turns, setturns] = useState([])
  const [rl, setrl] = useState(0);
  const [turnData, setturnData] = useState({
    index: "",
    schedule_id: "1",
    subject_id: "",
    classroom_id: ``,
    description: "",
    user_id: ``,
    task: "",
    document: "",
  });

  useEffect(() => {
    //asignaturas
    fetch(`http://${url}:3000/subject`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => console.error("Error fetching options:", error));
    //aulas
    fetch(`http://${url}:3000/classroom`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClassrooms(data);
      })
      .catch((error) => console.error("Error fetching options:", error));
    //teacher
    fetch(`http://${url}:3000/teachers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTeachers(data);
      })
      .catch((error) => console.error("Error fetching options:", error));
    //horario
    fetch(`http://${url}:3000/schedule`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setschedules(data);
      })
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  useEffect(()=>{
    fetch(`http://${url}:3000/turn/${turnData.schedule_id}`, {
      method:"GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setturns(data);
        console.log(turns)
      })
      .catch((error) => console.error("Error fetching options:", error));
  },[turnData.schedule_id,rl])

  const divElements = Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        style={{ border: turnData.index === index ? "solid black 1px" : null }}
        className="grid-element turn"
        onClick={() =>
          setturnData((prevData) => ({
            ...prevData,
            index: index,
          }))
        }
      >{`${turns[index]!==undefined?turns[index].abbreviation:""}`}</div>
    ));

  
  const divElements2 = Array.from({ length: 5 }, (_, index) => (
        <div
          key={index + 5}
          style={{
            border: turnData.index === index + 5 ? "solid black 1px" : null,
          }}
          className="grid-element turn"
          onClick={() =>
            setturnData((prevData) => ({
              ...prevData,
              index: index + 5,
            }))
          }
        >{`${turns[index]!==undefined?turns[index+5].abbreviation:""}`}</div>
      ));

  const divElements3 = Array.from({ length: 5 }, (_, index) => (
      <div
        key={index + 10}
        style={{
          border: turnData.index === index + 10 ? "solid black 1px" : null,
        }}
        className="grid-element turn"
        onClick={() =>
          setturnData((prevData) => ({
            ...prevData,
            index: index + 10,
          }))
        }
      >{`${turns[index]!==undefined?turns[index+10].abbreviation:""}`}</div>
    ));

  const divElements4 = Array.from({ length: 5 }, (_, index) => (
      <div
        key={index + 15}
        style={{
          border: turnData.index === index + 15 ? "solid black 1px" : null,
        }}
        className="grid-element turn"
        onClick={() =>
          setturnData((prevData) => ({
            ...prevData,
            index: index + 15,
          }))
        }
      >{`${turns[index]!==undefined?turns[index+15].abbreviation:""}`}</div>
    ));

  const divElements5 = Array.from({ length: 5 }, (_, index) => (
      <div
        key={index + 20}
        style={{
          border: turnData.index === index + 20 ? "solid black 1px" : null,
        }}
        className="grid-element turn"
        onClick={() =>
          setturnData((prevData) => ({
            ...prevData,
            index: index + 20,
          }))
        }
      >{`${turns[index]!==undefined?turns[index+20].abbreviation:""}`}</div>
    ));
    
  
  const divElements6 = Array.from({ length: 5 }, (_, index) => (
      <div
        key={index + 25}
        style={{
          border: turnData.index === index + 25 ? "solid black 1px" : null,
        }}
        className="grid-element turn"
        onClick={() =>
          setturnData((prevData) => ({
            ...prevData,
            index: index + 25,
          }))
        }
      >{`${turns[index]!==undefined?turns[index+25].abbreviation:""}`}</div>
    ));


  const handleImageUpload = (e) => {
    const selectedDocument = e.target.files[0];
    setturnData({ ...turnData, document: selectedDocument });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setturnData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    console.log(turnData);
  };

  const handleSelectChange = (event, selectName) => {
    setturnData((prevValues) => ({
      ...prevValues,
      [selectName]: event.target.value,
    }));
  };

  const asignaturas = (
    <select
      id="selectSubjects"
      name="subjects"
      onChange={(e) => handleSelectChange(e, "subject_id")}
    >
      <option></option>
      {subjects.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
  const aulas = (
    <select
      id="selectClassrooms"
      name="classrooms"
      onChange={(e) => handleSelectChange(e, "classroom_id")}
    >
      <option></option>
      {classrooms.map((option) => (
        <option key={option.id} value={option.id}>
          {option.full}
        </option>
      ))}
    </select>
  );
  const profesores = (
    <select
      id="selectTeachers"
      name="teachers"
      onChange={(e) => handleSelectChange(e, "user_id")}
    >
      <option></option>
      {teachers.map((option) => (
        <option key={option.id} value={option.id}>
          {`${option.name} ${option.last_name}`}
        </option>
      ))}
    </select>
  );
  const horario = (
    <select
      className="schedule-select"
      id="selectSchedule"
      name="schedule"
      onChange={(e) => handleSelectChange(e, "schedule_id")}
    > 
      {schedules.map((option) => (
        <option key={option.id} value={option.id}>
          {`Grupo: ${option.group}`}
        </option>
      ))}
    </select>
  );

  const gestor = (
    <div className="gest-option">
      <button
        style={{ backgroundColor: action === "add" ? "rgb(0, 169, 0)" : null }}
        className="new-turn"
        onClick={() => turnData.index!==""?setaction("add"):null}
      >
        Añadir
      </button>
      <button
        style={{
          backgroundColor: action === "show" ? "rgb(0, 0, 169)" : null,
        }}
        className="modify-user"
        onClick={() => turnData.index!==""?setaction("show"):null}
      >
        Mostrar
      </button>
      <button
        style={{
          backgroundColor: action === "delete" ? "rgb(169, 0, 0)" : null,
        }}
        className="delete-user"
        onClick={() => turnData.index!==""?setaction("delete"):null}
      >
        Eliminar
      </button>
    </div>
  );

  const addTurn = () => {
    return (
      <div id="turn-gest">
        <div className="gest-turn-item">
          <p>Añadir turno</p>
        </div>
        <div className="gest-turn-item">
          {asignaturas}
          {aulas}
          {profesores}
        </div>
        <div className="gest-turn-item">
          <input
            placeholder="Descripción"
            name="description"
            value={turnData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="gest-turn-item">
          <input
            placeholder="Tarea"
            name="task"
            value={turnData.task}
            onChange={handleInputChange}
          />
        </div>
        <div className="gest-turn-item">
          <input
            className="fileSender"
            type="file"
            accept="document/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="gest-turn-item">
          <button className="new-user" onClick={sendTurn}>
            Añadir
          </button>
        </div>
      </div>
    );
  };

  const showTurn=(turnn)=>{
    console.log(turnn)
    return (
      <div id="turn-gest">
        <div className="gest-turn-item">
          <p>Información del turno</p>
        </div>
        <div className="gest-turn-item">
          <p>{`${turnn.subject_name}`}</p>
          <p>{`${turnn.classroom}`}</p>
          <p>{`${turnn.teacher_name}`}</p>
        </div>
        <div className="gest-turn-item">
          <label>{`${turnn.description}`}</label>
        </div>
        <div className="gest-turn-item">
        <label>{`${turnn.task}`}</label>
        </div>
        <div className="gest-turn-item">
        {<a href={`http://${url}:3000/${turnn.attachment}`}>Documento</a>}
        </div>
        <div className="gest-turn-item">
          <button className="new-user">
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  const sendTurn = () => {
    const formData = new FormData();
    formData.append("index", turnData.index);
    formData.append("schedule_id", turnData.schedule_id);
    formData.append("subject_id", turnData.subject_id);
    formData.append("classroom_id", turnData.classroom_id);
    formData.append("description", turnData.description);
    formData.append("user_id", turnData.user_id);
    formData.append("task", turnData.task);
    formData.append("document", turnData.document);

    fetch(`http://${url}:3000/turn`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setaction("");
        setrl(rl + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deleteTurn = () => {
    return (
      <div className="delete-content">
        <p id="confirm-delete">{`¿Desea eliminar el turno?`}</p>
        <button className="delete-user delete-item" onClick={()=>confirmDeleteTurn()}>Si</button>
        <button className="modify-user delete-item" onClick={()=>{setaction('')}}>No</button>
      </div>
    );
  };

  const confirmDeleteTurn=()=>{
    fetch(`http://${url}:3000/turn/${turns[turnData.index].id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then(() => {
        setaction("");
        setrl(rl + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <div className="flex-container">
      <h2 className="screen-sub">Horario</h2>
      <div>{horario}</div>
      <div id="grid-container">
        <div className="grid-element" id="null"></div>
        <div className="grid-element sp">LUNES</div>
        <div className="grid-element sp">MARTES</div>
        <div className="grid-element sp">MIERCOLES</div>
        <div className="grid-element sp">JUEVES</div>
        <div className="grid-element sp">VIERNES</div>
        <div className="grid-element sp">08:00</div>
        {divElements}
        <div className="grid-element sp">09:30</div>
        {divElements2}
        <div className="grid-element sp">11:00</div>
        {divElements3}
        <div className="grid-element sp">12:30</div>
        {divElements4}
        <div className="grid-element sp">02:00</div>
        {divElements5}
        <div className="grid-element sp">03:20</div>
        {divElements6}
      </div>
      {rol === `Admin` ? gestor : null}
      {action === "add" ? addTurn() : null}
      {action === "delete" ? deleteTurn() : null}
      {action === "show" ? showTurn(turns[turnData.index]):null}
    </div>
  );
};

Horario.propTypes = {
  rol: PropTypes.string,
  url: PropTypes.string,
  token: PropTypes.string,
};

export default Horario;
