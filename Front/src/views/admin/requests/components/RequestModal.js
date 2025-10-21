import React, { useState, useEffect,useCallback } from 'react';
import { Modal, Form, Select, DatePicker, message, Input } from 'antd';
import moment from 'moment';
import axios from 'axios';
import servicesData from './services.json'; // Ensure this path is correct

const { Option } = Select;

const workersData = {
  "Photography": [
    { name: "Yassine Bellouquid", email: "yassine.bellouquid@um6p.ma" },
    { name: "Lina Elmouaaouy", email: "lina.elmouaaouy@um6p.ma" },
    { name: "Noureddine Ait Bih", email: "noureddine.aitbih@um6p.ma" },
    { name: "Zakaria Sidki", email: "zakaria.sidki@um6p.ma" }
  ],
  "Video Production": [
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

const variationsData = [
  { name: "Basic" },
  { name: "Complex" },
];


const RequestModal = ({ visible, onCancel, onSave, editingRequest }) => {
  const [form] = Form.useForm();
  const [workers, setWorkers] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');

  const handleCategoryChange = useCallback((category) => {
    setCategory(category);
    const workersInCategory = workersData[category] || [];
    setWorkers(workersInCategory);
    form.setFieldsValue({ workerAssigned: undefined });
  }, [form]);
  
  useEffect(() => {
    if (editingRequest) {
      form.setFieldsValue({
        ...editingRequest,
        startDate: editingRequest.startDate ? moment(editingRequest.startDate) : null,
        endDate: editingRequest.endDate ? moment(editingRequest.endDate) : null,
      });
  
      setStatus(editingRequest.status);
      setCategory(editingRequest.category);
      form.setFieldsValue({
        serviceName: editingRequest.serviceName,
        variation: editingRequest.variation,
        workerAssigned: editingRequest.workerAssigned,
      });
      handleCategoryChange(editingRequest.category);
      setSelectedPrice(editingRequest.price);
    }
  }, [editingRequest, form, handleCategoryChange]);

  const handleDelete = async () => {
    try {
      if (editingRequest) {
        await axios.delete(`https://comm6-0-1.onrender.com/api/selections/deleteSelection/${editingRequest.id}`);
        message.success('Request deleted successfully');
        onCancel(); // Close modal after deletion
        onSave(); // Refresh the list after deletion
      }
    } catch (error) {
      message.error('Failed to delete request');
    }
  };
  const handleFinish = async (values) => {
    try {
      const requestPayload = {
        ...values,
        startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : null,
        endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : null,
        price: selectedPrice,
      };

      if (editingRequest) {
        await axios.put(`https://comm6-0-1.onrender.com/api/selections/updateSelection/${editingRequest.id}`, requestPayload);
        message.success('Request updated successfully');
      } else {
        await axios.post(`https://comm6-0-1.onrender.com/api/selections/saveSelection`, requestPayload);
        message.success('Request saved successfully');
      }

      onSave();
    } catch (error) {
      message.error('Failed to save request');
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    form.setFieldsValue({ status: newStatus });
  };

  return (
    <Modal
      visible={visible}
      title={editingRequest ? 'Edit Request' : 'New Request'}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => form.submit()}
      okText={editingRequest ? 'Update' : 'Save'}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onValuesChange={(changedValues) => {
          if (changedValues.status) {
            handleStatusChange(changedValues.status);
          }
        }}
      >
        <Form.Item
          label="Status"
          name="status"
        >
          <Select>
            <Option value="pending">Pending</Option>
            <Option value="accepted">Accepted</Option>
            <Option value="rejected">Rejected</Option>
            <Option value="redirected">Redirected</Option>
            <Option value="work in progress">Work in Progress</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
        >
          <Select onChange={handleCategoryChange} disabled={editingRequest}>
            {Object.keys(workersData).map(item => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Service Name"
          name="serviceName"
        >
          <Select disabled>
            <Option key={form.getFieldValue('serviceName')} value={form.getFieldValue('serviceName')}>
              {form.getFieldValue('serviceName')}
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Variation"
          name="variation"
          rules={[{ required: status === 'accepted', message: 'Please select a variation' }]}
        >
          <Select
            disabled={status !== 'accepted'}
            onChange={(value) => {
              const selectedVariation = variationsData.find((v) => v.name === value);
              setSelectedPrice(selectedVariation?.price);
              form.setFieldsValue({ price: selectedVariation?.price });
            }}
          >
            {variationsData.map((variation) => (
              <Option key={variation.name} value={variation.name}>
                {variation.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: status === 'accepted', message: 'Please enter the price' }]}
        >
          <Input
            disabled={status !== 'accepted'}
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: status === 'accepted', message: 'Please select the start date' }]}
        >
          <DatePicker disabled={status !== 'accepted'} />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{ required: status === 'accepted', message: 'Please select the end date' }]}
        >
          <DatePicker disabled={status !== 'accepted'} />
        </Form.Item>

        {status === 'accepted' && (
          <Form.Item
            label="Worker Assigned"
            name="workerAssigned"
            rules={[{ required: status === 'accepted', message: 'Please select a worker' }]}
          >
            <Select disabled={status !== 'accepted'}>
              {workers.map((worker) => (
                <Option key={worker.name} value={worker.name}>
                  {worker.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default RequestModal;
