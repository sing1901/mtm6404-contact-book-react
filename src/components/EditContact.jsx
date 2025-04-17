import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactRef = doc(db, 'contacts', id);
        const contactSnap = await getDoc(contactRef);
        
        if (contactSnap.exists()) {
          setFormData(contactSnap.data());
        } else {
          setError('Contact not found');
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contact: ", error);
        setError('Error loading contact');
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Please fill in all required fields (First Name, Last Name, Email)');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Update the contact in Firestore
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, formData);
      
      // Redirect to the contact's details page
      navigate(`/contact/${id}`);
    } catch (error) {
      console.error("Error updating contact: ", error);
      alert('Failed to update contact');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading contact...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="edit-contact">
      <h1>Edit Contact</h1>
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="save-button">
            {isSubmitting ? 'Saving...' : 'Update Contact'}
          </button>
          <Link to={`/contact/${id}`} className="cancel-button">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditContact;
