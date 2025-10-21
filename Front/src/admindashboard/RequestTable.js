import React, { useEffect, useState } from 'react';
import { Table, Input, Select, Button, Tag, Popconfirm, message, Tabs } from 'antd';
import moment from 'moment';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import StatsSection from './StatsSection'; // Stats section component
import './Requests.css'; // Importing custom styles

const { Option } = Select;
const { TabPane } = Tabs;

const statusIcons = {
  pending: <Tag color="yellow">Pending</Tag>,
  accepted: <Tag color="green">Accepted</Tag>,
  rejected: <Tag color="red">Rejected</Tag>,
  redirected: <Tag color="blue">Redirected</Tag>,
  workInProgress: <Tag color="orange">Work in Progress</Tag>,
  completed: <Tag color="purple">Completed</Tag>,
};

const RequestTable = ({ handleEditRequest, setIsModalVisible }) => {
  const [requests, setRequests] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [requestSummary, setRequestSummary] = useState({
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
    redirected: 0,
    workInProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    loadRequests();
  }, [sortOrder, activeTab, searchQuery]);

  const loadRequests = async () => {
    try {
      const response = await axios.get('https://comm6-0-1.onrender.com/api/selections/all');
      const filtered = filterRequestsBySearch(response.data);
      const sortedRequests = sortRequests(filtered);
      setFilteredRequests(sortedRequests);

      const summary = {
        total: response.data.length,
        accepted: response.data.filter(req => req.status === 'accepted').length,
        rejected: response.data.filter(req => req.status === 'rejected').length,
        pending: response.data.filter(req => req.status === 'pending').length,
        redirected: response.data.filter(req => req.status === 'redirected').length,
        workInProgress: response.data.filter(req => req.status === 'workInProgress').length,
        completed: response.data.filter(req => req.status === 'completed').length,
      };
      setRequestSummary(summary);
    } catch (error) {
      message.error('Failed to load requests');
    }
  };

  const filterRequestsBySearch = (data) => {
    return data.filter(request =>
      request.user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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

  const prepareDataWithRowspan = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const requestDateKey = moment(item.requestDate).format('YYYY-MM-DD HH:mm');
      const userKey = `${item.user.username}-${item.user.department}-${item.user.email}`;
      const groupKey = `${requestDateKey}-${userKey}`;

      if (!groupedData[groupKey]) {
        groupedData[groupKey] = {
          count: 0,
          items: []
        };
      }
      groupedData[groupKey].count += 1;
      groupedData[groupKey].items.push(item);
    });

    return Object.keys(groupedData).flatMap((key) => {
      const group = groupedData[key];
      return group.items.map((item, index) => ({
        ...item,
        requestDate: index === 0 ? { text: moment(item.requestDate).format('YYYY-MM-DD HH:mm'), rowspan: group.count } : null,
        username: index === 0 ? { text: item.user.username, rowspan: group.count } : null,
        department: index === 0 ? { text: item.user.department, rowspan: group.count } : null,
        email: index === 0 ? { text: item.user.email, rowspan: group.count } : null,
        devis: index === 0 ? { text: item.devis ? item.devis : 'No Devis', rowspan: group.count } : null
      }));
    });
  };

  const dataSource = prepareDataWithRowspan(filteredRequests);

  const columns = [
    {
      title: 'Request Date & Time',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (requestDate) => {
        if (requestDate && requestDate.rowspan !== 0) {
          return {
            children: requestDate.text,
            props: { rowSpan: requestDate.rowspan },
          };
        }
        return { props: { rowSpan: 0 } };
      },
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (username) => {
        if (username && username.rowspan !== 0) {
          return {
            children: username.text,
            props: { rowSpan: username.rowspan },
          };
        }
        return { props: { rowSpan: 0 } };
      },
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (department) => {
        if (department && department.rowspan !== 0) {
          return {
            children: department.text,
            props: { rowSpan: department.rowspan },
          };
        }
        return { props: { rowSpan: 0 } };
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => {
        if (email && email.rowspan !== 0) {
          return {
            children: email.text,
            props: { rowSpan: email.rowspan },
          };
        }
        return { props: { rowSpan: 0 } };
      },
    },
    {
      title: 'Devis',
      dataIndex: 'devis',
      key: 'devis',
      render: (devis, record) => {
        if (devis && devis.rowspan !== 0) {
          return {
            children: devis.text ? (
              <a
                href={`https://comm6-0-1.onrender.com/upload/download/${record.groupId}`} // Using the correct groupId for download
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Devis
              </a>
            ) : 'No Devis',
            props: { rowSpan: devis.rowspan },
          };
        }
        return { props: { rowSpan: 0 } };
      },
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price} MAD`,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Format',
      dataIndex: 'format',
      key: 'format',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="request-table">
      <div className="search-bar">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by username"
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      <StatsSection requestSummary={requestSummary} />
      
      <Select defaultValue="newest" style={{ width: 120, margin: '16px 0' }} onChange={handleSortChange}>
        <Option value="newest">Newest</Option>
        <Option value="oldest">Oldest</Option>
      </Select>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="All" key="all" />
        <TabPane tab="Accepted" key="accepted" />
        <TabPane tab="Rejected" key="rejected" />
        <TabPane tab="Pending" key="pending" />
        <TabPane tab="Redirected" key="redirected" />
        <TabPane tab="Work In Progress" key="workInProgress" />
        <TabPane tab="Completed" key="completed" />
      </Tabs>

      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default RequestTable;
