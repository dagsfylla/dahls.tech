import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export function Login() {
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    const { email, password } = credentials;
    await auth
      .signInWithEmailAndPassword(email, password)
      .catch((reason) => alert(reason.message));

    setLoading(false);
  }

  function logout() {
    auth.signOut();
  }

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [user] = useAuthState(auth);

  return (
    <div
      onKeyPress={(e) => e.key === "Enter" && login()}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {!user ? (
        <>
          <h1>Login</h1>
          <p>
            Har du ikke konto? Registrer deg <Link to="register">her</Link>
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                password: e.currentTarget.value,
              })
            }
          />
          <button onClick={login}>{!loading ? "Logg inn" : "Jobber..."}</button>
        </>
      ) : (
        <>
          <h2>Du har logget inn.</h2>
          <p>
            Du kan nå gå til <Link to="/me">min side</Link> eller{" "}
            <Link to="/admin">adminpanelet</Link>.
          </p>
          <button onClick={logout}>Logg ut</button>
        </>
      )}
      <Link to="/">Home</Link>
    </div>
  );
}
