import React from "react"
import { AuthProvider } from "./auth/Auth"
import Contacts from "./Contacts"
// import Welcome from "./Welcome"
// import Header from "./Header"
// import Snapshot from "./Snapshot"

function App() {
  return (
    <>
      <AuthProvider>
        <Contacts />
        {/* <Header />
        <Welcome />
        <Snapshot /> */}
      </AuthProvider>
    </>
  )
}

export default App
