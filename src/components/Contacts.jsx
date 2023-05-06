import React, { useEffect, useState } from "react";
import MessageService from "../services/MessageService";

export default function Contacts({ user, setSelected }) {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState("");
  useEffect(() => {
    getContacts();
  }, [user]);

  const contactsList =
    contacts &&
    contacts.map((c, i) => {
      return (
        <div
          key={Math.random()}
          className={i == 0 ? `py-3 px-2` : "px-2"}
          onClick={() => setSelected({ name: c.name, phone: c.phone })}
        >
          <div className="px-2">{c.name}</div>
          <hr />
        </div>
      );
    });
  return (
    <div className="">
      <div className="contact">
        {contactsList}
        <label htmlFor="newContact" className="form-label mx-2 mb-3">
          Add New
        </label>
        <div className="input-group">
          <input
            placeholder="add new contact"
            value={newContact}
            type="number"
            className="form-control contact"
            id="newContact"
            onChange={(e) => setNewContact(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={addNewContact}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );

  async function getContacts() {
    if (user.name !== "") {
      const response = await MessageService.getContacts({ user: user.mobile });
      // console.log(response);
      if (response) setContacts(response.data);
    }
  }

  async function addNewContact() {
    const newMessageObject = {
      accessor: { name: user.mobile },
      accessed: { name: newContact },
      body: "",
    };
    const response = await MessageService.postMessage(newMessageObject);
    console.log(response.status);
    getContacts();
  }
}
