import React from "react"
import firebase from "./../firebase"
import "firebase/auth" //firebase authentication
import { useAuthState } from "react-firebase-hooks/auth" //firebase hook for auth with user object (userID/email/Name)
// import Snapshot from "../Snapshot"
import Button from "react-bootstrap/Button"

const auth = firebase.auth()

const Login = () => {
  const [user] = useAuthState(auth)
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  //if user object exists (logged in), show page, else show SignIn
  return (
    <div>
      <SignOut />
      <section>{user ? "" : <SignIn />}</section>
    </div>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <Button
        style={{ marginTop: "5px", marginRight: "5px" }}
        size="sm"
        variant="outline-info"
        className="sign-in"
        onClick={signInWithGoogle}
      >
        <img src="g.png" alt="" />
        &nbsp; Sign in
      </Button>
      <p>&nbsp;</p>
    </>
  )
}

function SignOut() {
  return (
    auth.currentUser && (
      <Button
        style={{ marginTop: "5px", marginRight: "5px" }}
        size="sm"
        variant="info"
        className="sign-out"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </Button>
    )
  )
}

export default Login
