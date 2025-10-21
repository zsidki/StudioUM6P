import React, { useState } from 'react';
import { Modal, Upload, Button, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function SummaryUploadModal({ isVisible, handleUpload, handleCancel }) {
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ file, fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title="Upload Your Files"
      visible={isVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Skip
        </Button>,
        <Button
          key="upload"
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => handleUpload(fileList)}
          disabled={fileList.length === 0}
        >
          Upload
        </Button>,
      ]}
    >
      <Upload
        multiple
        fileList={fileList}
        beforeUpload={() => false} // Prevent automatic upload
        onChange={handleFileChange}
        listType="text"
      >
        <Button icon={<UploadOutlined />}>Select Files</Button>
      </Upload>
    </Modal>
  );
}

export default SummaryUploadModal;
