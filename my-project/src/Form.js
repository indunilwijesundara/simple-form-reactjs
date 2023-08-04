import React, { useState } from 'react';
import './form.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    address: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5050/api/person/add', formData);

      if (response.status === 200) {
        console.log('Person added successfully');
        navigate('/');
      } else {
        console.error('Error adding person');
      }
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };
  const closeEditDialog = () => {
   navigate('/');
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create New Person</h2>
        <label className="form-label">
          Name:
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <div className="form-gender">
          <label className="form-label">
            Gender:
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />
            Male  
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
             Female
          </label>
        </div>
        <label className="form-label">
          Address:
          <textarea
            className="form-input"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
          <button className="cancel-button" type="button" onClick={closeEditDialog}>Cancel</button>
      </form>
    </div>
  );
}

export default Form;
