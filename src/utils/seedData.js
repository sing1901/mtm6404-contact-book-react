import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const initialContacts = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    address: '123 Main St, Anytown, USA',
    notes: 'College friend'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '555-987-6543',
    address: '456 Oak Ave, Somewhere, USA',
    notes: 'Work colleague'
  },
  {
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    phone: '555-456-7890',
    address: '789 Pine Rd, Nowhere, USA',
    notes: 'High school friend'
  },
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '555-234-5678',
    address: '101 Maple Dr, Elsewhere, USA',
    notes: 'Book club member'
  },
  {
    firstName: 'David',
    lastName: 'Williams',
    email: 'david.williams@example.com',
    phone: '555-345-6789',
    address: '202 Elm St, Anywhere, USA',
    notes: 'Neighbor'
  }
];

export const seedContacts = async () => {
  try {
    // Check if contacts already exist
    const contactsRef = collection(db, 'contacts');
    const q = query(contactsRef, where('email', '==', initialContacts[0].email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // If no contacts exist, add the initial contacts
      for (const contact of initialContacts) {
        await addDoc(collection(db, 'contacts'), contact);
      }
      console.log('Initial contacts added successfully!');
      return true;
    } else {
      console.log('Contacts already exist, skipping seeding.');
      return false;
    }
  } catch (error) {
    console.error('Error seeding contacts: ', error);
    return false;
  }
};
