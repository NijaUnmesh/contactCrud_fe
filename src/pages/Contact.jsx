import React, { useEffect, useState } from "react";
import "../App.css";
import { createContact, deleteContact, editContact, getContact } from "../services/AllApi";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ph, setPh] = useState("");
  const [contactData, setContactData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    const apiResponse = await getContact();
    setContactData(apiResponse.data);
  };

  const createClick = async () => {
    if (!name || !email || !ph) {
      alert("Please fill all fields!");
      return;
    }

    const reqBody = { name, email, ph };
    await createContact(reqBody);
    loadContact();
    clearForm();
  };


  const onDeleteClick = async (id) => {
    await deleteContact(id);
    loadContact();
  };

 
  const onEditClickShow = (contact) => {
    setEditData(contact);
    setName(contact.name);
    setEmail(contact.email);
    setPh(contact.ph);
  };


  const onEditSaveClick = async () => {
    const reqBody = { name, email, ph };
    await editContact(editData.id, reqBody);
    loadContact();
    clearForm();
    setEditData(null);
  };


  const clearForm = () => {
    setName("");
    setEmail("");
    setPh("");
  };

  
  const filteredContacts = contactData.filter(c =>
    (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.ph || "").includes(search)
  );

  return (
    <div className="app-container">
      <h1>Contact Manager</h1>

      <div className="form-section">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={ph}
          onChange={(e) => setPh(e.target.value)}
          type="text"
          placeholder="Phone"
        />
        {editData ? (
          <button onClick={onEditSaveClick} className="add-btn">Save</button>
        ) : (
          <button onClick={createClick} className="add-btn">Add Contact</button>
        )}
      </div>

      {/* Search Bar (not yet functional, optional) */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search contact..."
          className="search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Contact List */}
      <div className="contact-list">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div className="contact-card" key={contact.id}>
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p>{contact.email}</p>
                <p>{contact.ph}</p>
              </div>
              <div className="contact-actions">
                <button
                  onClick={() => onEditClickShow(contact)}
                  className="edit-btn"
                >
                   Edit
                </button>
                <button
                  onClick={() => onDeleteClick(contact.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default Contact;
