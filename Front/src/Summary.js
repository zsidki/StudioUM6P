import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, notification } from 'antd';

function Summary({ selectedServices, fullName, email, phone, department }) {
  const [serviceDetails, setServiceDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [file, setFile] = useState(null); // State for file upload

  // Initialize serviceDetails when selectedServices changes
  useEffect(() => {
    const initialServiceDetails = {};
    selectedServices.forEach((service) => {
      initialServiceDetails[service.service] = {
        description: '',
        content: '',
        format: ''
      };
    });
    setServiceDetails(initialServiceDetails);
  }, [selectedServices]);

  // Show notification when the word count validation fails
  const openNotification = (message) => {
    notification.error({
      message: 'Word Count Validation',
      description: message,
      placement: 'topRight',
      duration: 3,
    });
  };

  // Handle changes to service details (description, content, format)
  const handleDetailChange = (service, field, value) => {
    setServiceDetails((prevDetails) => ({
      ...prevDetails,
      [service]: {
        ...prevDetails[service],
        [field]: value,
      },
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Handle file selection
  };

  // Validate all required fields before proceeding with the booking
  const validateData = () => {
    if (!fullName || !email || !phone) {
      return "Please ensure that all your information (name, email, phone) is provided.";
    }

    if (selectedServices.length === 0) {
      return "You need to select at least one service before booking.";
    }

    for (let service of selectedServices) {
      const descriptionWordCount = serviceDetails[service.service]?.description.trim().split(/\s+/).length;
      const contentWordCount = serviceDetails[service.service]?.content.trim().split(/\s+/).length;

      if (descriptionWordCount < 50 || contentWordCount < 50 ) {
        return `Please ensure that the service fields have at least 50 words for service: ${service.service}`;
      }

      if (!serviceDetails[service.service]?.description || 
          !serviceDetails[service.service]?.content || 
          !serviceDetails[service.service]?.format) {
        return `Please complete all fields for the service: ${service.service}`;
      }
    }

    return null;
  };

  const handleConfirmBooking = async () => {
    const validationError = validateData();
    if (validationError) {
      openNotification(validationError);
      return;
    }
  
    const userId = localStorage.getItem('userId');
    if (!userId) {
      openNotification("User ID is missing, please log in.");
      return;
    }
  
    setLoading(true);
  
    const requestData = selectedServices.map((service) => ({
      serviceName: service.service,
      category: service.category,
      descp: serviceDetails[service.service]?.description,
      content: serviceDetails[service.service]?.content,
      format: serviceDetails[service.service]?.format,
      status: 'pending',
      price: service.price || 0,
      startDate: null,
      endDate: null,
      workerAssigned: service.workerAssigned || null,
      workerEmail: service.workerEmail || null
    }));
  
    try {
      let response;
      if (selectedServices.length === 1) {
        const singleService = requestData[0];
        response = await axios.post(`https://comm6-0-1.onrender.com/api/selections/saveSelection?userId=${userId}`, singleService, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        response = await axios.post(`https://comm6-0-1.onrender.com/api/selections/saveSelections?userId=${userId}`, requestData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
  
      const groupIdFromResponse = response.data.groupId;
  
      // Now upload the file with the obtained groupId
      if (file && groupIdFromResponse) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('groupId', groupIdFromResponse);
        formData.append('fileType', 'summary'); // assuming 'summary' as per your setup
  
        await axios.post(`https://comm6-0-1.onrender.com/upload/${groupIdFromResponse}/summary`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        notification.success({
          message: 'File Uploaded',
          description: 'Your file has been uploaded successfully!',
        });
      }
  
      setIsModalVisible(true);
      setOrderPlaced(true);
    } catch (error) {
      openNotification('Error creating service selections or uploading file.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  // Close the modal after the order is placed
  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mt-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Review & Confirm</h2>

      <div className="space-y-8">
        {selectedServices.length > 0 ? (
          selectedServices.map((service, index) => (
            <div key={index} className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow relative">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center relative">
                  <span className="bg-gray-800 text-white rounded-r-full px-3 py-1 text-sm font-semibold absolute" style={{ top: '0px', left: '-24px', whiteSpace: 'nowrap' }}>
                    {service.category || 'Category'}
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900 ml-32">{service.service}</h3>
                </div>
              </div>
              <p className="text-base text-gray-600 mb-6">{service.description}</p>

              {/* Additional Questions */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What content do you want to include, and what message should it deliver?
                  <span className="text-red-600">*</span> :
                </label>
                <textarea
                  value={serviceDetails[service.service]?.description || ''}
                  onChange={(e) => handleDetailChange(service.service, 'description', e.target.value)}
                  className={`w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:border-red-500`}
                  rows="3"
                  placeholder="Provide a clear idea of the content you need..."
                ></textarea>
                <p className="text-sm text-gray-500 mt-2 text-right">
                  {serviceDetails[service.service]?.description ? `${serviceDetails[service.service]?.description.trim().split(/\s+/).length} / 50 words` : '0 / 50 words'}
                </p>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What’s the purpose, and who is it for?
                  <span className="text-red-600">*</span> :
                </label>
                <textarea
                  value={serviceDetails[service.service]?.content || ''}
                  onChange={(e) => handleDetailChange(service.service, 'content', e.target.value)}
                  className={`w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:border-red-500`}
                  rows="3"
                  placeholder="Explain the main goal of the project..."
                ></textarea>
                <p className="text-sm text-gray-500 mt-2 text-right">
                  {serviceDetails[service.service]?.content ? `${serviceDetails[service.service]?.content.trim().split(/\s+/).length} / 50 words` : '0 / 50 words'}
                </p>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are the specifications for the final deliverable?
                  <span className="text-red-600">*</span> :
                </label>
                <textarea
                  value={serviceDetails[service.service]?.format || ''}
                  onChange={(e) => handleDetailChange(service.service, 'format', e.target.value)}
                  className={`w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:border-red-500`}
                  rows="3"
                  placeholder="Detail any required formats (e.g., MP4, JPG, PDF)..."
                ></textarea>

              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No services selected.</p>
        )}
      </div>

      {/* File Upload */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Your File</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg p-3 w-full"
        />
      </div>

      {/* Confirm Button */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={handleConfirmBooking}
          className={`bg-custom-red text-white font-bold py-3 px-12 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105 ${loading || orderPlaced ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading || orderPlaced}
        >
          {loading ? 'Processing...' : orderPlaced ? 'Order Placed' : 'Confirm & Book'}
        </button>
      </div>

      {/* Modal for Order Confirmation */}
      <Modal
        title="Order Confirmation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        centered
        footer={null}
      >
        <p className="text-center">
          Your order has been taken into consideration and is processing. We will get to you shortly. 
          Please check your <a href="/user/userTables" style={{ color: 'red' }}>orders page</a> for live updates.
        </p>
      </Modal>
    </div>
  );
}

export default Summary;
