import React, { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

const workers = {
  'Photography': [
    'Yassine Bellouquid', 'Lina Elmouaaouy', 'Noureddine Ait Bih', 'Zakaria Sidki'
  ],
  'Videomaking': [
    'Yassine Bellouquid', 'Lina Elmouaaouy', 'Noureddine Ait Bih', 'Zakaria Sidki'
  ],
  'Graphic Design': [
    'Abdelmounaim Yousfi', 'Iliyas El Mezouari', 'Fawzi Radad'
  ]
};

const RequestForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    serviceName: '',
    category: 'Photography',
    price: '',
    status: 'Pending',
    workerAssigned: '',
    dateRange: '',
    brief: '',
    user: {
      username: '',
      department: '',
      email: '',
      phone: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="request-form">
      <div className="form-group">
        <label>Service Name</label>
        <input
          type="text"
          name="serviceName"
          value={formData.serviceName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {Object.keys(workers).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Worker Assigned</label>
        <select
          name="workerAssigned"
          value={formData.workerAssigned}
          onChange={handleChange}
        >
          {workers[formData.category]?.map((worker) => (
            <option key={worker} value={worker}>{worker}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Date Range</label>
        <input
          type="text"
          name="dateRange"
          value={formData.dateRange}
          onChange={handleChange}
          placeholder="YYYY-MM-DD - YYYY-MM-DD"
        />
      </div>

      <div className="form-group">
        <label>Brief</label>
        <textarea
          name="brief"
          value={formData.brief}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit"><FaSave /> Save</button>
        <button type="button" onClick={onCancel}><FaTimes /> Cancel</button>
      </div>
    </form>
  );
};

export default RequestForm;
