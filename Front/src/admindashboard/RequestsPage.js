import React, { useState } from 'react';
import RequestTable from './RequestTable';
import RequestModal from './RequestModal';

const RequestsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  const handleEditRequest = (record) => {
    setEditingRequest(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setEditingRequest(null);
    setIsModalVisible(false);
  };

  const handleSaveRequest = () => {
    setIsModalVisible(false);
    setEditingRequest(null);
    // Optionally reload request data
  };

  return (
    <div>
      <RequestTable
        handleEditRequest={handleEditRequest}
        setIsModalVisible={setIsModalVisible}
      />
      <RequestModal
        visible={isModalVisible}
        onCancel={handleModalClose}
        onSave={handleSaveRequest}
        editingRequest={editingRequest}
      />
    </div>
  );
};

export default RequestsPage;
