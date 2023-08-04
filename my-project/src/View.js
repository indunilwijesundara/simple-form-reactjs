import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './view.css'; 
import axios from 'axios';

export default function View() {
  const navigate = useNavigate();
  const [persons, setPersons] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: '', 
    name: '',
    address: '',
    gender: '',
  });

  useEffect(() => {
    fetch('http://localhost:5050/api/person')
      .then(response => response.json())
      .then(data => setPersons(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5050/api/person/${id}`, editFormData);
      if (response.status === 200) {
        console.log(`Person with ID ${id} updated successfully`);
        closeEditDialog();
        refreshPersonList();
      } else {
        console.error(`Error updating person with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error updating person with ID ${id}:`, error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5050/api/person/${id}`);
      
      if (response.status === 200) {
        console.log(`Person with ID ${id} deleted successfully`);
        refreshPersonList();
      } else {
        console.error(`Error deleting person with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting person with ID ${id}:`, error);
    }
  };

  const refreshPersonList = () => {
    fetch('http://localhost:5050/api/person')
      .then(response => response.json())
      .then(data => setPersons(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditFormData({
      id: '',
      name: '',
      address: '',
      gender: '',
    });
  };

  return (

    <div className="view-container">
      <h1 className="view-title">Person List</h1>
     <div className= "create-button-div"> <button className="create-button" onClick={() => navigate('/add')}>
        Create New
      </button></div>
      <ul className="person-list">
    <li className="person-item person-header">
      <h3>Person Name</h3>
      <h3>Person Address</h3>
      <h3>Person Gender</h3>
      <h3>Action</h3>
    </li>
    {persons.map(person => (
      <li key={person.id} className="person-item">
        <span>{person.name}</span>
        <span>{person.address}</span>
        <span>{person.gender}</span>
        <div className="action-buttons">
          <button className="edit-button" onClick={() => {
            setEditFormData({
              id: person.id,
              name: person.name,
              address: person.address,
              gender: person.gender,
            });
            setIsEditDialogOpen(true);
          }}>Update</button>
          <button className="delete-button" onClick={() => handleDelete(person.id)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
     {isEditDialogOpen && (
  <div className="overlay">
    <div className="edit-dialog">
      <h2>Edit Person</h2>
      <form>
        <div className="input-container">
          <label>Name:</label>
          <input
            type="text"
            value={editFormData.name}
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
          />
        </div>
        <div className="input-container">
          <label>Address:</label>
          <input
            type="text"
            value={editFormData.address}
            onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
          />
        </div>
        <div className="input-container">
          <div className='form-gender'>
            <label>Gender:</label>
            <label> Male</label>
            <input
              type="radio"
              value="male"
              checked={editFormData.gender === 'male'}
              onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
            />
            <label>Female</label>
            <input
              type="radio"
              value="female"
              checked={editFormData.gender === 'female'}
              onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
            />
          </div>
        </div>
        <div className="button-container">
          <button className="cancel-button" type="button" onClick={closeEditDialog}>Cancel</button>
          <button className="save-button" type="button" onClick={() => handleUpdate(editFormData.id)}>Save</button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}
