import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export function Login() {
  function login() {
    const { email, password } = credentials;
    auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    auth.signOut();
  }

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [user] = useAuthState(auth);

  return (
    <div
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
          <button onClick={login}>Log in</button>
        </>
      ) : (
        <button onClick={logout}>Log out</button>
      )}
      <Link to="/">Home</Link>
    </div>
  );
}
