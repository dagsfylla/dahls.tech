import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Link, useHistory } from "react-router-dom";

export function Register() {
  async function register() {
    const { email, password1, password2 } = credentials;
    if (password1 !== password2) {
      alert("Passwords must match!");
      return null;
    }
    await auth.createUserWithEmailAndPassword(email, password1);
    history.push("/admin");
  }

  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password1: "",
    password2: "",
  });
  const [user] = useAuthState(auth);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {!user ? (
        <>
          <h1>Login</h1>
          <p>
            Har du konto? Logg inn <Link to="login">her</Link>
          </p>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.currentTarget.value })
            }
          />
          <label htmlFor="password1">Password</label>
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
          <label htmlFor="password2">Password</label>
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
          <button onClick={register}>Registrer</button>
        </>
      ) : (
        <button>Log out</button>
      )}
      <Link to="/">Home</Link>
    </div>
  );
}
