import { useAuthState } from "react-firebase-hooks/auth";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { auth, firestore } from "../firebase";
import { Link } from "react-router-dom";
import moment from "moment";

function UserInfo({ uid }) {
  const userRef = firestore.doc(`/users/${uid}`);
  const purchasesRef = firestore.collection(`/users/${uid}/purchases`);
  const [userInfo, loadingUser] = useDocumentData(userRef);
  const [purchases, loadingPurchases] = useCollectionData(purchasesRef);

  if (loadingUser || loadingPurchases) {
    return <p>Laster inn data...</p>;
  }

  const { firstName, lastName, favPils } = userInfo;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <>
        <h1>
          Velkommen, {firstName} {lastName}
        </h1>
        <p>Din favorittpils er {favPils}</p>
        <h4>Din kjøpshistorie</h4>
        <table>
          <thead>
            <tr>
              <th>Dato</th>
              <th>Antall</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((p) => (
              <tr>
                <td>
                  {moment.unix(p.date.seconds).format("DD.MM.YYYY HH:mm")}
                </td>
                <td>{p.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
}

export function Me() {
  const [user] = useAuthState(auth);

  if (!user) {
    return (
      <p>
        Du må <Link to="/login">logge inn</Link> for å bruke Min side
      </p>
    );
  }

  return <UserInfo uid={user.uid} />;
}
