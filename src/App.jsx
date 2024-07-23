import { useState, useEffect } from "react";
import Header from "./components/Header";
import Aside from "./components/Aside";
import PresentationContainer from "./components/PresentationContainer";
import PresentationContainer2 from "./components/PresentationContainer2";
import Form from "./components/Form";
import Eventos from "./components/Eventos";
import Gestionar from "./components/Gestionar";
import Horario from "./components/Horario";

const App = () => {
  const [url] = useState("192.168.137.1");
  const [token, settoken] = useState("");
  const [asideVisible, setAsideVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [userName, setuserName] = useState("");
  const [rol, setrol] = useState("");
  const [screen, setscreen] = useState("Principal");
  const [formState, setformState] = useState("");

  useEffect(() => {
    if (rol === "Noauth") {
      setuserName("");
    }
  }, [rol]);

  return (
    <>
      <Header
        asideVisible={asideVisible}
        setAsideVisible={setAsideVisible}
        formVisible={formVisible}
        setFormVisible={setFormVisible}
        screen={screen}
        setScreen={setscreen}
        rol={rol}
        setRol={setrol}
        token={token}
        url={url}
      />

      <main style={{ backgroundImage: screen === "Principal" ? null : "none" }}>
        <Aside
          asideVisible={asideVisible}
          screen={screen}
          setScreen={setscreen}
          setAsideVisible={setAsideVisible}
          rol={rol}
          setFormState={setformState}
          setFormVisible={setFormVisible}
        />

        {screen === "Principal" ? (
          userName === "" ? (
            <PresentationContainer />
          ) : (
            <PresentationContainer2 userName={userName} />
          )
        ) : null}

        {screen === "Turnos" ? (
          <Horario rol={rol} url={url} token={token} />
        ) : null}

        {screen === "Eventos" ? <Eventos token={token} url={url} /> : null}

        {screen === "Gestionar" ? <Gestionar token={token} url={url} /> : null}

        <Form
          formVisible={formVisible}
          setFormVisible={setFormVisible}
          setUserName={setuserName}
          setRol={setrol}
          formState={formState}
          setFormState={setformState}
          rol={rol}
          setToken={settoken}
          url={url}
        />
      </main>
    </>
  );
};

export default App;
