import React, { useState, useEffect } from 'react';
import { Layout, Table, Tag, Spin, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons'; // Upload icon
import axios from 'axios';
import RedirectedOptions from './RedirectedOptions'; // RedirectedOptions component
import './UserDashboard.css'; // Custom styles

const { Content } = Layout;

const UserDashboard = () => {
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality

  // Retrieve user data from localStorage
  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    const fetchSelections = async () => {
      try {
        const response = await axios.get(`https://comm6-0-1.onrender.com/api/selections/getRequestsForUserById/${userId}`);
        const sortedSelections = response.data.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
        setSelections(sortedSelections);
        setLoading(false);
      } catch (err) {
        setError('Error fetching requests. Please try again later.');
        setLoading(false);
      }
    };

    if (userId) {
      fetchSelections();
    } else {
      setError('User is not logged in.');
      setLoading(false);
    }
  }, [userId]);

  const isSameGroup = (groupId1, groupId2) => groupId1 === groupId2;

  const calculateRowSpan = (data, index) => {
    let rowSpan = 1;
    for (let i = index + 1; i < data.length; i++) {
      if (isSameGroup(data[i].groupId, data[index].groupId)) rowSpan++;
      else break;
    }
    if (index > 0 && isSameGroup(data[index - 1].groupId, data[index].groupId)) return 0;
    return rowSpan;
  };

  const calculateInvoiceRowSpan = (data, index) => {
    let rowSpan = 0;
    for (let i = index; i < data.length; i++) {
      if (isSameGroup(data[i].groupId, data[index].groupId) && data[i].status === 'Redirected') rowSpan++;
      else break;
    }
    if (index > 0 && isSameGroup(data[index - 1].groupId, data[index].groupId) && data[index - 1].status === 'Redirected') return 0;
    return rowSpan;
  };

  const handleUpload = async (file, groupId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('groupId', groupId);
    try {
      await axios.post(`https://comm6-0-1.onrender.com/upload/${groupId}`, formData);
      message.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      message.error(`${file.name} file upload failed.`);
    }
    return false;
  };

  const columns = [
    {
      title: 'No.',
      key: 'number',
      render: (text, record, index) => ({
        children: <span>{index + 1}</span>,
        props: {
          rowSpan: calculateRowSpan(selections, index),
        },
      }),
    },
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (requestDate, record, index) => ({
        children: <span>{new Date(requestDate).toLocaleString()}</span>,
        props: {
          rowSpan: calculateRowSpan(selections, index),
        },
      }),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (content) => content || 'N/A',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => description || 'N/A',
    },
    {
      title: 'Format',
      dataIndex: 'format',
      key: 'format',
      render: (format) => format || 'N/A',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate) => (startDate ? new Date(startDate).toLocaleDateString() : 'N/A'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (endDate) => (endDate ? new Date(endDate).toLocaleDateString() : 'N/A'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;
        switch (status) {
          case 'pending':
            color = 'yellow';
            break;
          case 'approved':
            color = 'orange';
            break;
          case 'redirected':
            color = 'blue';
            break;
          case 'rejected':
            color = 'red';
            break;
          case 'completed':
            color = 'green';
            break;
          default:
            color = 'gray';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price ? price : 'N/A'} MAD`,
    },
    {
      title: 'Invoice',
      key: 'invoice',
      render: (text, record, index) => {
        const rowSpan = calculateInvoiceRowSpan(selections, index);
        if (rowSpan === 0) return null;
        if (record.status === 'Redirected' && rowSpan > 0) {
          return (
            <div className="text-center">
              <a href={`/RedirectedOptions/${record.id}`} target="_blank" rel="noopener noreferrer">
                View Invoice
              </a>
            </div>
          );
        }
        return null;
      },
      props: (text, record, index) => ({
        rowSpan: calculateInvoiceRowSpan(selections, index),
      }),
    },
    {
      title: 'Quote',
      key: 'quote',
      render: (text, record, index) => {
        const rowSpan = calculateRowSpan(selections, index);
        if (rowSpan === 0) return null;
        const allStatusesResolved = selections.filter(sel => sel.groupId === record.groupId).every(sel => sel.status !== 'pending');
        return (
          <div className="text-center">
            {index === selections.findIndex(sel => sel.groupId === record.groupId) && allStatusesResolved && (
              <a href={`https://comm6-0-1.onrender.com/api/pdf/generatePdf/${encodeURIComponent(record.groupId)}`} target="_blank" rel="noopener noreferrer">
                Download Quote
              </a>
            )}
          </div>
        );
      },
      props: (text, record, index) => ({
        rowSpan: calculateRowSpan(selections, index),
      }),
    },
    {
      title: 'Upload Quote',
      key: 'upload',
      render: (text, record) => (
        <Upload beforeUpload={(file) => handleUpload(file, record.groupId)} showUploadList={false}>
          <UploadOutlined />
        </Upload>
      ),
    },
  ];

  const filteredSelections = selections.filter(selection =>
    selection.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Content className="p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Hello, {userName}! My Requests</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by service name"
          className="px-4 py-2 border rounded-md w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredSelections}
        pagination={{ pageSize: 15 }}
        rowKey="id"
        bordered
        className="request-table"
      />
    </Content>
  );
};

export default UserDashboard;
