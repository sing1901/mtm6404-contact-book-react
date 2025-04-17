import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsRef = collection(db, 'contacts');
        const q = query(contactsRef, orderBy('lastName'));
        const querySnapshot = await getDocs(q);
        
        const contactsList = [];
        querySnapshot.forEach((doc) => {
          contactsList.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setContacts(contactsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts: ", error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => {
    const fullName = (contact.firstName + ' ' + contact.lastName).toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="contact-list">
      <h1>Contact Book</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <Link to="/add" className="add-button">
        Add New Contact
      </Link>
      
      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <div className="contacts-container">
          {filteredContacts.length > 0 ? (
            filteredContacts.map(contact => (
              <div key={contact.id} className="contact-item">
                <Link to={`/contact/${contact.id}`} className="contact-link">
                  <span className="contact-name">{contact.lastName}, {contact.firstName}</span>
                </Link>
              </div>
            ))
          ) : (
            <p>No contacts found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ContactList;