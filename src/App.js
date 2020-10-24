import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";

import { useDocumentData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDeVK4Ry0JmrZ2I2WFTDojYUw95CIeNL04",
  authDomain: "dahls-tech.firebaseapp.com",
  databaseURL: "https://dahls-tech.firebaseio.com",
  projectId: "dahls-tech",
  storageBucket: "dahls-tech.appspot.com",
  messagingSenderId: "457693107267",
  appId: "1:457693107267:web:28ed20bdab468f1b14b0f6",
  measurementId: "G-BXJZC60K15",
});

const firestore = firebase.firestore();
const fridgeStatusRef = firestore.doc("/fridgeStatus/qTpqGIGm2kv7W2VaxjjQ");

function App() {
  const [fridgeData, loading, error] = useDocumentData(fridgeStatusRef);

  console.log(fridgeData, loading, error);

  function getStatus() {
    if (fridgeData.status === 1) {
      return (
        <div className="dahls">
          <h4 style={{ color: "green" }}>Status: Mye dahls i skap</h4>
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
    <div className="container">
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
      </div>
    </div>
  );
}

export default App;
