import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import { seedContacts } from './utils/seedData';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Seed contacts if needed
        await seedContacts();
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing app: ", error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading application...</div>;
  }

  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;