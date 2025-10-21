import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, DatePicker, message, Input } from 'antd';
import moment from 'moment';
import axios from 'axios';
import servicesData from '../services.json'; // Ensure this path is correct

const { Option } = Select;

const workersData = {
  "Photography": [
    { name: "Yassine Bellouquid", email: "yassine.bellouquid@um6p.ma" },
    { name: "Lina Elmouaaouy", email: "lina.elmouaaouy@um6p.ma" },
    { name: "Noureddine Ait Bih", email: "wiam.el-khammal@esi.ac.ma" },
    { name: "Zakaria Sidki", email: "wiam.el-khammal@esi.ac.ma" }
  ],
  "Videomaking": [
    { name: "Yassine Bellouquid", email: "yassine.bellouquid@um6p.ma" },
    { name: "Lina Elmouaaouy", email: "lina.elmouaaouy@um6p.ma" },
    { name: "Noureddine Ait Bih", email: "noureddine.aitbih@um6p.ma" },
    { name: "Zakaria Sidki", email: "zakaria.sidki@um6p.ma" }
  ],
  "Graphic Design": [
    { name: "Abdelmounaim Yousfi", email: "wiam.el-khammal@esi.ac.ma" },
    { name: "Iliyas El Mezouari", email: "wiam.el-khammal@esi.ac.ma" },
    { name: "Sanae Echachouai", email: "wiam.el-khammal@esi.ac.ma" },
    { name: "Zakaria Sidki", email: "wiam.el-khammal@esi.ac.ma" }
  ]
};

const RequestModal = ({ visible, onCancel, onSave, editingRequest }) => {
  const [form] = Form.useForm();
  const [workers, setWorkers] = useState([]);
  const [services, setServices] = useState([]);
  const [variations, setVariations] = useState([]);
  const [status, setStatus] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(''); // Track the selected price

  useEffect(() => {
    if (editingRequest) {
      form.setFieldsValue({
        ...editingRequest,
        startDate: editingRequest.startDate ? moment(editingRequest.startDate) : null,
        endDate: editingRequest.endDate ? moment(editingRequest.endDate) : null,
      });

      // Set the status and handle category changes to update services and workers
      setStatus(editingRequest.status);
      handleCategoryChange(editingRequest.category);
      form.setFieldsValue({ 
        service: editingRequest.service, 
        variation: editingRequest.variation 
      });
      handleServiceChange(editingRequest.service); // To load variations based on selected service
      setSelectedPrice(editingRequest.price); // Set the selected price for editing
    }
  }, [editingRequest, form]);

  const handleCategoryChange = (category) => {
    const workersInCategory = workersData[category] || [];
    setWorkers(workersInCategory);
    form.setFieldsValue({ workerAssigned: undefined, service: undefined, variation: undefined });

    const selectedCategory = servicesData.find(item => item.category === category);
    if (selectedCategory) {
      setServices(selectedCategory.services);
      setVariations([]);
    } else {
      setServices([]);
    }
  };

  const handleServiceChange = (serviceName) => {
    const selectedService = services.find(service => service.service === serviceName);
    if (selectedService) {
      setVariations(selectedService.variations);
      form.setFieldsValue({ variation: undefined }); // Reset variation selection
    }
  };


  const handleFinish = async (values) => {
    try {
        const requestPayload = {
            ...values,
            startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : null,
            endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : null,
            price: selectedPrice, // Include the selected price in the payload
        };

        if (editingRequest) {
            // Use the updated edit API endpoint
            await axios.put(`https://comm6-0-1.onrender.com/api/selections/updateSelection/${editingRequest.id}`, requestPayload);
            message.success('Request updated successfully');
        } else {
            // Use the updated save API endpoint
            await axios.post(`https://comm6-0-1.onrender.com/api/selections/saveSelection`, requestPayload, {
                params: { userId: currentUserId }, // Ensure currentUserId is defined appropriately
            });
            message.success('Request saved successfully');
        }

        onSave(); // Call onSave to refresh or close modal
    } catch (error) {
        message.error('Failed to save request');
    }
};
const currentUserId = localStorage.getItem('userId'); // Adjust according to your auth logic


  const handleStatusChange = (newStatus) => {
    setStatus(newStatus); // Update the status state
    form.setFieldsValue({ status: newStatus }); // Set form value
  };

  return (
    <Modal
      visible={visible}
      title={editingRequest ? 'Edit Request' : 'New Request'}
      onCancel={onCancel}
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
          rules={[{ required: true, message: 'Please select the status' }]}
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
          rules={[{ required: true, message: 'Please select the category' }]}
        >
          <Select onChange={handleCategoryChange}>
            {servicesData.map(item => (
              <Option key={item.category} value={item.category}>
                {item.category}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Service Name"
          name="service"
          rules={[{ required: true, message: 'Please select a service' }]}
        >
          <Select onChange={handleServiceChange} disabled={!services.length}>
            {services.map(service => (
              <Option key={service.service} value={service.service}>
                {service.service}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Variation"
          name="variation"
          rules={[{ required: true, message: 'Please select a variation' }]}
        >
          <Select onChange={(value) => form.setFieldsValue({ price: variations.find(v => v.name === value)?.price })} disabled={!variations.length}>
            {variations.map(variation => (
              <Option key={variation.name} value={variation.name}>
                {variation.name} - {variation.price}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the price' }]}
        >
          <Input value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)} /> {/* Editable price */}
        </Form.Item>

        {status === 'accepted' && (
          <>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: 'Please select the start date' }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="End Date"
              name="endDate"
              rules={[{ required: true, message: 'Please select the end date' }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Worker Assigned"
              name="workerAssigned"
              rules={[{ required: true, message: 'Please select a worker' }]}
            >
              <Select placeholder="Select worker              ">
                {workers.map(worker => (
                  <Option key={worker.email} value={worker.name}>
                    {worker.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        )}

        {['work in progress', 'completed'].includes(status) && (
          <>
            <Form.Item
              label="Start Date"
              name="startDate"
            >
              <DatePicker disabled />
            </Form.Item>

            <Form.Item
              label="End Date"
              name="endDate"
            >
              <DatePicker disabled />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default RequestModal;

