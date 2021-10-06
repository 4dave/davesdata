import React, { useContext } from "react"
import { AuthContext } from "./auth/Auth"

const Welcome = () => {
  const { currentUser } = useContext(AuthContext)
  // const currentUserEmail = currentUser ? currentUser.email : ""
  const displayName = currentUser ? currentUser.displayName : ""

  return (
    <>
      {/* {loading ? <h1>Loading...</h1> : null} */}
      <div className="welcome">
        <span>{displayName ? `Welcome, ` : ""}</span>
        <span style={{ fontWeight: "bold" }}>
          {displayName ? `${displayName}` : ""}
        </span>
      </div>
      {/* <h2>{`Welcome ${currentUserEmail}`}</h2> */}
      {/* <div className="welcome">{`Welcome ${displayName}`}</div> */}
      {/* <h4>{`Welcome ${displayName}`}</h4> */}
    </>
  )
}

export default Welcome
