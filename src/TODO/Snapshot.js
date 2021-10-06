import React, { useState, useEffect, useContext } from "react"
import firebase from "./firebase"
import { v4 as uuidv4 } from "uuid"
import { AuthContext } from "./auth/Auth"
import Loader from "react-loader-spinner"
import Button from "react-bootstrap/Button"
import { Form, Col } from "react-bootstrap"

// import Login from "./auth/LoginGoogle"
// import { useAuthState } from "react-firebase-hooks/auth" //firebase hook for auth with user object (userID/email/Name)

function Snapshot() {
  const { currentUser } = useContext(AuthContext)
  const displayName = currentUser ? currentUser.displayName : ""
  const currentUserId = currentUser ? currentUser.uid : null
  const [jots, setJots] = useState([])
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const [score, setScore] = useState("")
  const ref = firebase.firestore().collection("notes")
  // const auth = firebase.auth()
  // const { displayName } = auth.currentUser

  function getJots() {
    setLoading(true)
    ref
      .where("owner", "==", currentUserId)
      .orderBy("createdAt", "desc") // needed an index
      //.where('title', '==', 'Jot1') // does not need index
      //.where('score', '<=', 10)    // needs index
      //.orderBy('owner', 'asc')
      //.limit(3)
      .onSnapshot((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          items.push(doc.data())
        })
        setJots(items)
        setLoading(false)
      })
  }

  useEffect(() => {
    getJots()
    // eslint-disable-next-line
  }, [currentUser])

  // ADD FUNCTION
  function addJot() {
    const owner = currentUser ? currentUser.uid : "unknown"
    const ownerEmail = currentUser ? currentUser.email : "unknown"
    const newJot = {
      title,
      note,
      score: +score,
      id: uuidv4(),
      owner,
      ownerEmail,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
      displayName,
    }

    ref
      .doc(newJot.id)
      .set(newJot)
      .catch((err) => {
        console.error(err)
      })
    setTitle("")
    setNote("")
    setScore("")
  }

  //DELETE FUNCTION
  function deleteJot(jot) {
    ref
      .doc(jot.id)
      .delete()
      .catch((err) => {
        console.error(err)
      })
  }

  // EDIT FUNCTION
  function editJot(jot) {
    const updatedJot = {
      score: +score,
      note: note,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    }
    setLoading()
    ref
      .doc(jot.id)
      .update(updatedJot)
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      {currentUser ? (
        <>
          <Form noValidate style={{ marginLeft: "5px", marginRight: "5px" }}>
            <Form.Row>
              <Col>
                <Form.Control
                  id="priority"
                  as="select"
                  size="sm"
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  style={{
                    backgroundColor: "#ffffff",
                    fontSize: "14px",
                    color: "#ff8080",
                  }}
                  custom
                >
                  <option hidden>priority</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Control
                  id="title"
                  placeholder="title"
                  aria-describedby="title-info"
                  size="sm"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </Form.Row>

            <Form.Group>
              <Form.Control
                id="note"
                as="textarea"
                rows={3}
                size="sm"
                placeholder="note"
                aria-describedby="note-info"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>

            <Button
              size="sm"
              variant="info"
              onClick={() => addJot()}
              style={{ marginTop: "5px" }}
            >
              Submit
            </Button>
          </Form>
        </>
      ) : (
        <div>Please sign in to view your notes!</div>
      )}
      {loading ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : null}
      {/* {loading ? <h1>Loading...</h1> : null} */}
      {currentUser ? (
        <div>
          {jots.map((jot) => (
            <div className="jot" key={jot.id}>
              <p>{jot.title}</p>
              <p>{jot.note}</p>
              <h4>
                {jot.score} | {jot.displayName.split(" ")[0].trim()}
              </h4>
              {/* <p>
            <img src={photoURL} alt="" width="32" height="32" />
            {jot.ownerEmail ? jot.ownerEmail : currentUser.displayName}
          </p> */}
              <div>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => deleteJot(jot)}
                >
                  <img src="trash.png" alt="" />
                </Button>
                <span>&nbsp;</span>
                <Button
                  size="sm"
                  variant="outline-info"
                  onClick={() => editJot(jot)}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}

export default Snapshot
