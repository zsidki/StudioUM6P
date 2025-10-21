import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { DollarOutlined, UserOutlined, FileDoneOutlined, TrophyOutlined } from '@ant-design/icons';
import { FaCrown } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import axios from 'axios';
import { Layout, Card, Row, Col, Statistic, message, Typography, Progress } from 'antd';
const { Header, Content } = Layout;

const { Title: AntTitle } = Typography;
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Title, Legend);

// Define a consistent color palette
const colorPalette = ['#FF6384', '#36A2EB', '#FFCE56', '#D4451E', '#FFEFEB'];

const Dashboard = () => {
  const [data, setData] = useState({
    topServices: {},
    profitableServices: {},
    servicesByCategory: {},
    serviceGrowth: { months: [], categories: {} }, // Set default values to avoid undefined errors
    requestStatuses: { redirected: 0, approved: 0, rejected: 0, pending: 0 },
    workerComparison: {},
    totalIncome: 0, // Changed from average price to total income
    totalRequests: 0,
    totalUsers: 0,
    topWorker: '',
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('https://comm6-0-1.onrender.com/api/selections/all');
      const selections = response.data;

      const userResponse = await axios.get('https://comm6-0-1.onrender.com/api/users');
      const users = userResponse.data;

      // Prepare data for the dashboard
      const dashboardData = processDashboardData(selections, users.length);
      setData(dashboardData);
    } catch (error) {
      message.error('Failed to fetch data from backend');
    }
  };

  const processDashboardData = (selections, totalUsers) => {
    const serviceCount = {};
    const profitData = {};
    const workerData = {};
    let totalIncome = 0;

    const statusCount = {
      redirected: 0,
      approved: 0,
      rejected: 0,
      pending: 0,
    };

    // Iterate over the selections and build the data
    selections.forEach((selection) => {
      const { serviceName, price, status, workerAssigned } = selection;

      // Count requests by service name
      if (serviceName) serviceCount[serviceName] = (serviceCount[serviceName] || 0) + 1;

      // Calculate total income for each service
      if (serviceName && price) profitData[serviceName] = (profitData[serviceName] || 0) + price;

      // Count by request status
      if (status) statusCount[status.toLowerCase()]++;

      // Count tasks assigned to each worker
      if (workerAssigned) workerData[workerAssigned] = (workerData[workerAssigned] || 0) + 1;

      // Accumulate income for total income calculation
      if (price) totalIncome += price;
    });

    // Identify top worker (most assigned tasks)
    const topWorker = Object.keys(workerData).reduce((a, b) => (workerData[a] > workerData[b] ? a : b), 'None');

    // Return the processed data
    return {
      topServices: Object.fromEntries(Object.entries(serviceCount).sort(([, a], [, b]) => b - a).slice(0, 5)),
      profitableServices: profitData,
      requestStatuses: statusCount,
      workerComparison: workerData,
      totalIncome,
      totalRequests: selections.length,
      totalUsers,
      topWorker,
    };
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <Layout className="site-layout">
        <Header style={{ background: '#fff', padding: '0 24px', textAlign: 'center' }}>
          <AntTitle level={1} style={{ fontSize: '36px', fontWeight: 'bold', color: '#333' }}>The statistics</AntTitle>
        </Header>
        <Content style={{ padding: '24px' }}>
          {/* Top Worker Section */}
          <Row gutter={16} style={{ marginTop: '24px', marginBottom: '40px' }}> {/* Added marginBottom here */}
            <Col span={24}>
              <Card
                style={{
                  backgroundColor: '#fff',
                  textAlign: 'center',
                  padding: '24px',
                  borderRadius: '10px',
                }}
                hoverable
              >
                <AntTitle level={3} style={{ fontSize: '28px', color: '#D4451E', fontWeight: 'bold' }}>
                  <FaCrown style={{ fontSize: '32px', color: '#D4451E', marginRight: '10px' }} />
                  {data.topWorker} is taking the lead!
                </AntTitle>
                <p style={{ fontSize: '16px', color: '#333' }}>
                  {data.topWorker} has completed the most tasks and is currently the top performer in our system. Keep up the great work!
                </p>
              </Card>
            </Col>
          </Row>

          {/* Statistics Overview */}
          <Row gutter={16}>
            <Col span={8}>
              <Card hoverable>
                <Statistic
                  title="Total Requests"
                  value={data.totalRequests}
                  prefix={<FileDoneOutlined style={{ fontSize: '24px', color: '#D4451E' }} />}
                  valueStyle={{ fontWeight: 'bold', color: '#000' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable>
                <Statistic
                  title="Total Income"
                  value={`MAD ${data.totalIncome.toFixed(2)}`}
                  prefix={<DollarOutlined style={{ fontSize: '24px', color: '#D4451E' }} />}
                  valueStyle={{ fontWeight: 'bold', color: '#000' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable>
                <Statistic
                  title="Total Users"
                  value={data.totalUsers}
                  prefix={<UserOutlined style={{ fontSize: '24px', color: '#D4451E' }} />}
                  valueStyle={{ fontWeight: 'bold', color: '#000' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Charts Section */}
          <Row gutter={16} style={{ marginTop: '24px' }}>
            <Col span={12}>
              <Card title="Top 5 Most Requested Services" hoverable>
                <Bar
                  data={{
                    labels: Object.keys(data.topServices),
                    datasets: [
                      {
                        label: 'Requests',
                        data: Object.values(data.topServices),
                        backgroundColor: colorPalette, // Use the color palette here
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    height: 100, // Adjust chart height
                  }}
                />
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Most Profitable Services" hoverable>
                <Pie
                  data={{
                    labels: Object.keys(data.profitableServices),
                    datasets: [
                      {
                        label: 'Revenue',
                        data: Object.values(data.profitableServices),
                        backgroundColor: colorPalette, // Use the color palette here
                      },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false, height: 100 }}
                />
              </Card>
            </Col>
          </Row>

          {/* Additional Charts for Worker Comparison and Request Status */}
          <Row gutter={16} style={{ marginTop: '24px' }}>
            <Col span={12}>
              <Card title="Worker Comparison" hoverable>
                <Bar
                  data={{
                    labels: Object.keys(data.workerComparison),
                    datasets: [
                      {
                        label: 'Tasks Assigned',
                        data: Object.values(data.workerComparison),
                        backgroundColor: '#D4451E',
                      },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false, height: 100 }}
                />
                {/* Worker competition as a progress-based UI */}
                
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Request Status Breakdown" hoverable>
                <Bar
                  data={{
                    labels: ['Redirected', 'Approved', 'Rejected', 'Pending'],
                    datasets: [
                      {
                        label: 'Requests',
                        data: Object.values(data.requestStatuses),
                        backgroundColor: colorPalette, // Use the color palette here
                      },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false, height: 100 }}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
