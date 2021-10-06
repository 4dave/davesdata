import React from "react"
// import { AuthContext } from "./auth/Auth"
import Login from "./auth/LoginGoogle"

const Header = () => {
  // const { currentUser } = useContext(AuthContext)
  // const currentUserEmail = currentUser ? currentUser.email : ""
  // const displayName = currentUser ? currentUser.displayName : ""

  return (
    <>
      <div className="header">
        <div className="auth">
          <img src="favicon-32x32.png" alt="" />
          <span className="logo">Jots!</span>
        </div>
        <Login />
      </div>
    </>
  )
}

export default Header
