import styled from "styled-components";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";
import moment from "moment";

const MessageBox = styled.div`
  border: 1px solid rgba(255, 0, 0, 0.6);
  padding: 0.5em 1em;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 5px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  color: #444444;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justify && props.justify};
  border-bottom: ${(props) => props.border && "1px solid rgba(255, 0, 0, 0.6)"};
  margin-bottom: ${(props) => props.border && "0.5em"};
`;

export function LatestNews() {
  const messageRef = firestore
    .collection("/fridges/fridge1/statusMessages")
    .orderBy("published", "desc")
    .limit(1);
  const [message, loading] = useCollectionData(messageRef);

  if (loading) {
    return <p>Laster inn meldinger...</p>;
  }

  return (
    <div
      style={{
        width: "100%",
        marginTop: "1em",
      }}
    >
      <MessageBox>
        <Col>
          <Row justify="space-between" border>
            <span>Siste melding</span>
            <span>
              Tid:
              {moment
                .unix(message[0].published.seconds)
                .format("DD.MM.YYYY HH:mm")}
            </span>
          </Row>
          <Row>{message[0].message}</Row>
        </Col>
      </MessageBox>
    </div>
  );
}
