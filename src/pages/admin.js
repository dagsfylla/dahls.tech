import { useState } from "react";
import { firestore } from "../firebase";

const fridgeRef = firestore.doc("/fridges/fridge1");

function Admin() {
  const [stock, setStock] = useState("");

  function updateFridgeStock() {
    fridgeRef.update({
      stock,
    });
  }

  return (
    <div>
      <h1>Velkommen til adminpanelet</h1>
      <p>Hvor mye Dahls er det i skapet nå?</p>
      <input
        type="number"
        onChange={(e) => setStock(e.currentTarget.value)}
        value={stock}
      />
      <button onClick={updateFridgeStock}>Oppdater kjøleskap</button>
    </div>
  );
}

export default Admin;
