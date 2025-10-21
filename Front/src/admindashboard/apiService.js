export const fetchRequests = async (status) => {
    const response = await fetch(`https://comm6-0-1.onrender.com/api/admin/serviceRequests/${status}`);
    return response.json();
  };
  
  export const addRequest = async (data) => {
    const response = await fetch(`https://comm6-0-1.onrender.com/api/admin/addServiceRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };
  
  export const updateRequest = async (id, data) => {
    const response = await fetch(`https://comm6-0-1.onrender.com/api/admin/updateServiceRequest/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };
  
  export const deleteRequest = async (id) => {
    const response = await fetch(`https://comm6-0-1.onrender.com/api/admin/deleteServiceRequest/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  };
  