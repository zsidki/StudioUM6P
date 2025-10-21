import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Form, Modal, DatePicker, message, Tag, Popconfirm, Tabs } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import StatsSection from './StatsSection';  // Stats section component
import './Requests.css';

const { Option } = Select;
const { TabPane } = Tabs;

const customRed = '#D4451E';

const workersData = {
  "Photography": [
    { name: "Yassine Bellouquid", email: "yassine.bellouquid@um6p.ma" },
    { name: "Lina Elmouaaouy", email: "lina.elmouaaouy@um6p.ma" },
    { name: "Noureddine Ait Bih", email: "noureddine.aitbih@um6p.ma" },
    { name: "Zakaria Sidki", email: "zakaria.sidki@um6p.ma" }
  ],
  "Videomaking": [
    { name: "Yassine Bellouquid", email: "yassine.bellouquid@um6p.ma" },
    { name: "Lina Elmouaaouy", email: "lina.elmouaaouy@um6p.ma" },
    { name: "Noureddine Ait Bih", email: "noureddine.aitbih@um6p.ma" },
    { name: "Zakaria Sidki", email: "zakaria.sidki@um6p.ma" }
  ],
  "Graphic Design": [
    { name: "Abdelmounaim Yousfi", email: "abdelmounaim.yousfi@um6p.ma" },
    { name: "Iliyas El Mezouari", email: "ilias.elmezouari@um6p.ma" },
    { name: "Fawzi Radad", email: "fawzi.radad@um6p.ma" }
  ]
};

const statusIcons = {
  pending: <Tag color="yellow">Pending</Tag>,
  approved: <Tag color="green">Approved</Tag>,
  rejected: <Tag color="red">Rejected</Tag>,
  redirected: <Tag color="blue">Redirected</Tag>,
};

const RequestManagement = ({ currentUserId }) => {
  const [form] = Form.useForm();
  const [requests, setRequests] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [sortOrder, setSortOrder] = useState('newest');
  const [activeTab, setActiveTab] = useState('all');
  const [requestSummary, setRequestSummary] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    redirected: 0,
  });
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    loadRequests();
  }, [sortOrder, activeTab]);

  const loadRequests = async () => {
    try {
      const response = await axios.get(`https://comm6-0-1.onrender.com/api/selections/all`);
      const filteredRequests = filterRequestsByStatus(response.data);
      const sortedRequests = sortRequests(filteredRequests);
      setRequests(sortedRequests);

      const summary = {
        total: response.data.length,
        approved: response.data.filter(req => req.status === 'approved').length,
        rejected: response.data.filter(req => req.status === 'rejected').length,
        pending: response.data.filter(req => req.status === 'pending').length,
        redirected: response.data.filter(req => req.status === 'redirected').length,
      };
      setRequestSummary(summary);
    } catch (error) {
      message.error('Failed to load requests');
    }
  };

  const filterRequestsByStatus = (data) => {
    if (activeTab === 'all') {
      return data;
    }
    return data.filter(request => request.status === activeTab);
  };

  const sortRequests = (data) => {
    return data.sort((a, b) => {
      const dateA = moment(a.requestDate);
      const dateB = moment(b.requestDate);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const handleEditRequest = (record) => {
    setIsEditing(true);
    setCurrentRequestId(record.id);
    setSelectedStatus(record.status);
    setWorkers(workersData[record.category] || []);

    form.setFieldsValue({
      ...record,
      startDate: record.startDate ? moment(record.startDate) : null,
      endDate: record.endDate ? moment(record.endDate) : null,
    });
    setIsModalVisible(true);
  };

  const handleSaveRequest = async () => {
    try {
        const values = await form.validateFields();
        const startDate = values.startDate ? moment(values.startDate).format('YYYY-MM-DD') : null;
        const endDate = values.endDate ? moment(values.endDate).format('YYYY-MM-DD') : null;

        let workerEmail = null;
        if (values.status === 'approved') {
            const selectedWorker = workers.find(worker => worker.name === values.workerAssigned);
            if (!selectedWorker) {
                message.error('Please assign a worker for approved status');
                return;
            }
            workerEmail = selectedWorker.email;
        }

        const requestPayload = {
            ...values,  // This includes status, variation, price, and workerAssigned
            startDate,
            endDate,
            workerEmail,
        };

        if (isEditing) {
            await axios.put(`https://comm6-0-1.onrender.com/api/selections/updateSelection/${currentRequestId}`, requestPayload);
            message.success('Request updated successfully');
        } else {
            await axios.post(`https://comm6-0-1.onrender.com/api/selections/saveSelection`, requestPayload, {
                params: { userId: currentUserId },
            });
            message.success('Request saved successfully');
        }

        form.resetFields();
        setIsModalVisible(false);
        loadRequests();  // Reload the table to show updated data
    } catch (error) {
        message.error('Failed to save request');
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      await axios.delete(`https://comm6-0-1.onrender.com/api/selections/deleteSelection/${id}`);
      message.success('Request deleted successfully');
      loadRequests();
    } catch (error) {
      message.error('Failed to delete request');
    }
  };

  // RowSpan logic based on requestDate (date only, ignoring time)
  const calculateRowSpan = (data, index, columnKey) => {
    let rowSpan = 1;
    const currentDate = moment(data[index][columnKey]).format('YYYY-MM-DD'); // Format to only get the date (without time)

    // Check consecutive rows to see if they share the same requestDate (ignoring time)
    for (let i = index + 1; i < data.length; i++) {
      const nextDate = moment(data[i][columnKey]).format('YYYY-MM-DD');
      if (currentDate === nextDate) {
        rowSpan++;
      } else {
        break;
      }
    }

    // Return 0 for subsequent rows with the same requestDate to hide them
    if (index > 0 && moment(data[index - 1][columnKey]).format('YYYY-MM-DD') === currentDate) {
      return 0;
    }

    return rowSpan;
  };

  const columns = [
    {
      title: 'Request Date & Time',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (date, record, index) => ({
        children: <>{moment(date).format('YYYY-MM-DD HH:mm:ss')}</>, // Show date and time
        props: { rowSpan: calculateRowSpan(requests, index, 'requestDate') }, // Row span logic
      }),
    },
    {
      title: 'Username',
      dataIndex: ['user', 'username'],
      key: 'username',
      render: (text, record, index) => ({
        children: text,
        props: { rowSpan: calculateRowSpan(requests, index, 'requestDate') },
      }),
    },
    {
      title: 'Department',
      dataIndex: ['user', 'department'],
      key: 'department',
      render: (text, record, index) => ({
        children: text,
        props: { rowSpan: calculateRowSpan(requests, index, 'requestDate') },
      }),
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
      render: (text, record, index) => ({
        children: text,
        props: { rowSpan: calculateRowSpan(requests, index, 'requestDate') },
      }),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text, record, index) => ({
        children: text,
        props: { rowSpan: calculateRowSpan(requests, index, 'requestDate') },
      }),
    },
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price} MAD`,
    },
    {
      title: 'Variation',
      dataIndex: 'variation',
      key: 'variation',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => statusIcons[status] || status,
    },
    {
      title: 'Worker Assigned',
      dataIndex: 'workerAssigned',
      key: 'workerAssigned',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => (date ? moment(date).format('YYYY-MM-DD') : 'N/A'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => (date ? moment(date).format('YYYY-MM-DD') : 'N/A'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => handleEditRequest(record)} style={{ marginRight: 8 }} />
          <Popconfirm
            title="Are you sure to delete this request?"
            onConfirm={() => handleDeleteRequest(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex' }}>

      <div style={{ flexGrow: 1, padding: '20px' }}>
        <div className="header">
          <h1 style={{ fontSize: '24px', fontFamily: 'Roboto', fontWeight: 'bold' }}>Hello, Admin</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input.Search
              placeholder="Search by username or department"
              style={{ width: 300, marginRight: 10 }}
              onSearch={(value) => console.log('Search:', value)} // You can add search logic here
            />
            <Select
              defaultValue="newest"
              style={{ width: 150 }}
              onChange={handleSortChange}
            >
              <Option value="newest">Newest</Option>
              <Option value="oldest">Oldest</Option>
            </Select>
          </div>
        </div>

        <StatsSection
          totalRequests={requestSummary.total}
          totalApproved={requestSummary.approved}
          totalRejected={requestSummary.rejected}
          totalRedirected={requestSummary.redirected}
        />

        {/* Status Navigation Tabs */}
        <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: '20px' }}>
          <TabPane tab="All Requests" key="all" />
          <TabPane tab="Pending" key="pending" />
          <TabPane tab="Approved" key="approved" />
          <TabPane tab="Rejected" key="rejected" />
          <TabPane tab="Redirected" key="redirected" />
        </Tabs>

        <div style={{ marginTop: '20px', padding: '0 10px' }}>
          <Table
            bordered
            dataSource={requests}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}  // Added pagination with 10 items per page
            loading={!requests.length}
            scroll={{ x: true }}
            size="small"
            style={{ marginBottom: '20px' }}
          />
        </div>

        {/* Modal for adding/editing requests */}
        <Modal
          title={isEditing ? 'Edit Request' : 'Add New Request'}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={handleSaveRequest}
          okButtonProps={{ style: { backgroundColor: customRed, borderColor: customRed } }}
          okText="Save"
        >
          <Form form={form} layout="vertical">
            <Form.Item name="brief" label="Brief" rules={[{ required: true, message: 'Please enter a brief' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
              <Select>
                <Option value="Photography">Photography</Option>
                <Option value="Videomaking">Videomaking</Option>
                <Option value="Graphic Design">Graphic Design</Option>
              </Select>
            </Form.Item>
            <Form.Item name="serviceName" label="Service Name" rules={[{ required: true, message: 'Please enter service name' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="variation" label="Variation" rules={[{ required: true, message: 'Please enter variation' }]}>
              <Input />
            </Form.Item>

            <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select status' }]}>
              <Select onChange={setSelectedStatus}>
                <Option value="pending">Pending</Option>
                <Option value="approved">Approved</Option>
                <Option value="rejected">Rejected</Option>
                <Option value="redirected">Redirected</Option>
              </Select>
            </Form.Item>

            {selectedStatus === 'approved' && (
              <>
                <Form.Item name="workerAssigned" label="Worker Assigned" rules={[{ required: true, message: 'Please assign a worker' }]}>
                  <Select>
                    {workers.map(worker => <Option key={worker.email} value={worker.name}>{worker.name}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: 'Please select start date' }]}>
                  <DatePicker />
                </Form.Item>
                <Form.Item name="endDate" label="End Date">
                  <DatePicker />
                </Form.Item>
              </>
            )}

            {selectedStatus === 'redirected' && (
              <Form.Item name="redirectOption" label="Redirect Option" rules={[{ required: true, message: 'Please select a redirect option' }]}>
                <Select>
                  <Option value="109 Agency">109 Agency</Option>
                  <Option value="LionsAndBulls">Lions and Bulls</Option>
                </Select>
              </Form.Item>
            )}
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default RequestManagement;
