import "./App.css";
import { Route, Link } from "react-router-dom";
import Admin from "./pages/admin";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { firestore } from "./firebase";

import { useDocumentData } from "react-firebase-hooks/firestore";

const fridgeStatusRef = firestore.doc("/fridges/fridge1");

function Main({ fridgeData, loading }) {
  function getStatus() {
    if (fridgeData.stock > 0) {
      return (
        <div className="dahls">
          <h4 style={{ color: "green" }}>Status: Mye dahls i skap</h4>
          <p>{fridgeData.stock} dahlser igjen</p>
          <div className="circles">
            <div className="beer"></div>
            <div className="noBeer" style={{ opacity: 0.2 }}></div>
          </div>
        </div>
      );
    }
    return (
      <div className="tomt">
        <h4 style={{ color: "red" }}>
          Helvette det er tomt, kontakt dagsfylla ASAP!
        </h4>
        <div className="circles">
          <div className="beer" style={{ opacity: 0.2 }}></div>
          <div className="noBeer"></div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="header">
        <h1>
          Velkommen til <span style={{ color: "red" }}>dahls</span>.
          <span style={{ color: "green" }}>tech</span>
        </h1>
        <h4 style={{ fontStyle: "italic", paddingBottom: "20px" }}>
          - En trust-løsning for de som liker å drikke iskald 0,33 Dahls på sal
        </h4>
      </div>
      <div className="body">
        {loading ? (
          <p>Laster kjøleskapsstatus</p>
        ) : (
          <div className="status">{getStatus()}</div>
        )}

        <p>
          Betaling: Skjer foreløpig over Vipps (se kjøleskap), men et mer
          avansert brukersystem er under utvikling!
        </p>

        <p>
          Lokasjon: Køddehjørnet mellom salplass A545 (Johannesen) og 5117
          (Ankile)
        </p>
      </div>
    </>
  );
}

function App() {
  const [fridgeData, loading, error] = useDocumentData(fridgeStatusRef);

  console.log(fridgeData, loading, error);

  return (
    <div className="container">
      <div className="content">
        <Route path="/" exact>
          <Main fridgeData={fridgeData} loading={loading} />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </div>
      <div className="footer">
        Powered by dagsfylla
        <a
          href="https://www.dagsfylla.no"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/dahls.png" alt="Dagsfylla" />
        </a>
        <p style={{ paddingLeft: 10 }}>og vi som liker dahls på glass</p>
        <a
          href="https://www.ecdahls.no"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/dahls.png" alt="Dahls på glass" />
        </a>
        <Link to="/login" style={{ marginLeft: "1em" }}>
          Logg inn
        </Link>
        <Link to="/admin" style={{ marginLeft: "1em" }}>
          Adminpanel
        </Link>
      </div>
    </div>
  );
}

export default App;
