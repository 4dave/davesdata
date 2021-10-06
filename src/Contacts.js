import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"
import ReadOnlyRow from "./components/ReadOnlyRow"
import EditableRow from "./components/EditableRow"
// import GoogleLogin from "react-google-login"

const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const [editContactId, setEditContactId] = useState(null)
  const [addFormData, setAddFormData] = useState({})
  const [editFormData, setEditFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getContacts()
  }, [])

  const getContacts = async () => {
    setIsLoading(true)
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOSTNAME}/contacts`
    )
    setIsLoading(false)
    setContacts(response.data)
    console.log(response.data)
  }

  const createContact = (e) => {
    e.preventDefault()
    e.target.reset()
    axios
      .post(`${process.env.REACT_APP_API_HOSTNAME}/contact`, addFormData)
      .then(() => {
        getContacts()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteContact = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_HOSTNAME}/contact/${id}`)
      .then(() => {
        getContacts()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const updateContact = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_HOSTNAME}/contact/${id}`, editFormData)
      .then(() => {
        getContacts()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleAddFormChange = (event) => {
    event.preventDefault()
    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value
    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue
    setAddFormData(newFormData)
  }

  const handleEditFormChange = (event) => {
    event.preventDefault()
    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value
    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue
    setEditFormData(newFormData)
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault()
    const editedContact = {
      id: editContactId,
      fullname: editFormData.fullname,
      address: editFormData.address,
      phonenumber: editFormData.phonenumber,
      email: editFormData.email,
    }
    const newContacts = [...contacts]
    const index = contacts.findIndex((contact) => contact.id === editContactId)
    newContacts[index] = editedContact
    setContacts(newContacts)
    setEditContactId(null)
    updateContact(editedContact.id)
  }

  const handleEditClick = (contact) => {
    setEditContactId(contact.id)
    const formValues = {
      fullname: contact.fullname,
      address: contact.address,
      phonenumber: contact.phonenumber,
      email: contact.email,
    }
    setEditFormData(formValues)
    // return formValues
  }

  const handleCancelClick = () => {
    setEditContactId(null)
  }

  return (
    <div className="app-container">
      <h1>Contacts</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          {isLoading && (
            <>
              <span>Loading...</span>
              <img src="loading.gif" alt="loading" />
            </>
          )}
          <tbody>
            {contacts.map((contact, index) => (
              <React.Fragment key={index}>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    deleteContact={deleteContact}
                  />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add a Contact</h2>
      <form onSubmit={createContact} autoComplete="off">
        <input
          type="text"
          name="fullname"
          required="required"
          placeholder="name"
          autoFocus="autofocus"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="address"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phonenumber"
          required="required"
          placeholder="phone"
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="email"
          onChange={handleAddFormChange}
        />
        <button style={{ width: "3rem" }} type="submit">
          Add
        </button>
      </form>
    </div>
  )
}

export default Contacts
