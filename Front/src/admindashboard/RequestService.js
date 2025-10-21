import axios from 'axios';

const API_URL = 'https://comm6-0-1.onrender.com/api/admin'; // Base URL

const RequestService = {
  getServiceRequests: (status) => axios.get(`${API_URL}/serviceRequests/${status}`),
  updateServiceRequest: (id, data) => axios.put(`${API_URL}/updateServiceRequest/${id}`, data),
  deleteServiceRequest: (id) => axios.delete(`${API_URL}/deleteServiceRequest/${id}`),
  performBulkAction: (action) => axios.put(`${API_URL}/${action}All`),
  addServiceRequest: (data) => axios.post(`${API_URL}/addServiceRequest`, data),
  uploadFile: (id, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_URL}/uploadFile/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default RequestService;
