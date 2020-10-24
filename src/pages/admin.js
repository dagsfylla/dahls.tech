import { useState } from "react";
import { firestore, auth, serverTimestamp } from "../firebase";
import { Link } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const fridgeRef = firestore.doc("/fridges/fridge1");

function Admin() {
  const [stock, setStock] = useState("");
  const [fridgeData, loading] = useDocumentData(fridgeRef);
  const [user] = useAuthState(auth);

  function updateFridgeStock() {
    fridgeRef.update({
      stock,
      lastUpdated: serverTimestamp(),
    });
    fridgeRef.collection("stocktakings").add({
      user: user.uid,
      stock,
      timePerformed: serverTimestamp(),
    });
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {user ? (
        <>
          <h1>Velkommen til adminpanelet</h1>
          <p>Hvor mye Dahls er det i skapet nå?</p>
          {!loading && (
            <p>Dahslbeholdning ved siste telling: {fridgeData.stock}</p>
          )}
          <input
            type="number"
            onChange={(e) => setStock(e.currentTarget.value)}
            value={stock}
          />
          <button onClick={updateFridgeStock}>Oppdater kjøleskap</button>
          <p />
        </>
      ) : (
        <p>
          Du må <Link to="login">logge inn</Link> for å bruke denne
          funksjonaliteten.
        </p>
      )}
      <Link to="/">Gå til forsiden</Link>
    </div>
  );
}

export default Admin;
