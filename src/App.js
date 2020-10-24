import './App.css';


function getStatus() {

}

function App() {

  let data = 1;
  let status;
  if (data) {
    status = <div className="dahls">
      <h4 style={{ color: "green" }}>Status: Mye dahls i skap</h4>
      <div className="circles">
        <div className="beer"></div>
        <div className="noBeer" style={{ opacity: 0.2 }}></div>
      </div>
    </div>
  } else {
    status = <div className="tomt">
      <h4 style={{ color: "red" }}>Helvette det er tomt, kontakt dagsfylla ASAP</h4>
      <div className="circles">
        <div className="beer" style={{ opacity: 0.2 }}></div>
        <div className="noBeer"></div>
      </div>
    </div>
  }

  return (
    <div className="container">
      <div className="header">
        <h1>
          Velkommen til <span style={{ color: 'red' }}>dahls</span>.<span style={{ color: 'green' }}>tech</span>
        </h1>
        <h4 style={{ fontStyle: "italic", paddingBottom: "20px" }}>
          - En trust-løsning for de som liker å drikke iskald 0,33 dahls på sal
          </h4>
      </div>
      <div className="body">
        <div className="status">
          {status}
        </div>

        <p>
          Betaling: Skjer foreløpig over Vipps (se kjøleskap), men et mer avansert brukersystem er under utvikling!
        </p>

        <p>
          Lokasjon: Køddehjørnet mellom salplass A545 (Johannesen) og 5117 (Ankile)
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
