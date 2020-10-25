import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, serverTimestamp } from "../firebase";
import { Link, useHistory } from "react-router-dom";

export function Register() {
  async function register() {
    setLoading(true);

    const {
      email,
      password1,
      password2,
      firstName,
      lastName,
      favPils,
    } = credentials;

    if (password1 !== password2) {
      alert("Passordene må være like.");
      setLoading(false);
      return;
    }
    const createResult = await auth
      .createUserWithEmailAndPassword(email, password1)
      .catch((reason) => alert(reason.message));

    if (!createResult) {
      setLoading(false);
      return;
    }

    console.log(user);

    await firestore.doc(`users/${createResult.user.uid}`).set({
      firstName,
      lastName,
      email,
      memberSince: serverTimestamp(),
      role: "user",
      favPils,
    });

    setLoading(false);
    history.push("/admin");
  }

  const history = useHistory();
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
    favPils: "",
  });
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  if (user) {
    history.push("/login");
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <>
        <h1>Her kan du registrere ny bruker</h1>
        <p>
          Har du konto? Logg inn <Link to="login">her</Link>.
        </p>
        <label htmlFor="firstName">Fornavn</label>
        <input
          id="firstName"
          type="email"
          value={credentials.firstName}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              firstName: e.currentTarget.value,
            })
          }
        />
        <label htmlFor="lastName">Etternavn</label>
        <input
          id="lastName"
          type="email"
          value={credentials.lastName}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              lastName: e.currentTarget.value,
            })
          }
        />
        <label htmlFor="email">Epostadresse</label>
        <input
          id="email"
          type="email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.currentTarget.value })
          }
        />
        <label htmlFor="password1">Passord</label>
        <input
          id="password1"
          type="password"
          value={credentials.password1}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              password1: e.currentTarget.value,
            })
          }
        />
        <label htmlFor="password2">Gjenta passord</label>
        <input
          id="password2"
          type="password"
          value={credentials.password2}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              password2: e.currentTarget.value,
            })
          }
        />
        <label htmlFor="favPils">Hva er din favorittpils</label>
        <select
          id="favPils"
          value={credentials.favPils}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              favPils: e.currentTarget.value,
            })
          }
        >
          <option name="Dahls 0,33 på glass">Dahls 0,33 på glass</option>
        </select>
        <p />
        <button onClick={register}>
          {!loading ? "Registrer" : "Jobber..."}
        </button>
      </>
      <p />
      <Link to="/">Forsiden</Link>
    </div>
  );
}
