import React from 'react';
import { Row, Col, Divider } from 'antd';
import { FaClock, FaCheckCircle, FaTimesCircle, FaRedo } from 'react-icons/fa';  // Import the icons you want to use

const StatsSection = ({ totalRequests, totalApproved, totalRejected, totalRedirected }) => {
  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
      <Row gutter={16} align="middle" justify="center">
        {/* Total Requests */}
        <Col span={5}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              backgroundColor: '#FFEFEB',  // Circle background color
              borderRadius: '50%',
              padding: '10px',
              marginRight: '15px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <FaClock style={{ color: '#E45C37', fontSize: '24px' }} />  {/* Icon color */}
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#999' }}>Total Requests</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalRequests}</div>
            </div>
          </div>
        </Col>

        <Col span={1}>
          <Divider type="vertical" style={{ height: '80px', backgroundColor: '#ccc' }} />
        </Col>

        {/* Approved Requests */}
        <Col span={5}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              backgroundColor: '#FFEFEB',  // Circle background color
              borderRadius: '50%',
              padding: '10px',
              marginRight: '15px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <FaCheckCircle style={{ color: '#E45C37', fontSize: '24px' }} />  {/* Icon color */}
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#999' }}>Approved Requests</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalApproved}</div>
            </div>
          </div>
        </Col>

        <Col span={1}>
          <Divider type="vertical" style={{ height: '80px', backgroundColor: '#ccc' }} />
        </Col>

        {/* Rejected Requests */}
        <Col span={5}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              backgroundColor: '#FFEFEB',  // Circle background color
              borderRadius: '50%',
              padding: '10px',
              marginRight: '15px',
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <FaTimesCircle style={{ color: '#E45C37', fontSize: '24px' }} />  {/* Icon color */}
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#999' }}>Rejected Requests</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalRejected}</div>
            </div>
          </div>
        </Col>

        <Col span={1}>
          <Divider type="vertical" style={{ height: '80px', backgroundColor: '#ccc' }} />
        </Col>

        {/* Redirected Requests */}
        <Col span={5}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              backgroundColor: '#FFEFEB',  // Circle background color
              borderRadius: '50%',
              padding: '10px',
              marginRight: '15px',
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <FaRedo style={{ color: '#E45C37', fontSize: '24px' }} />  {/* Icon color */}
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#999' }}>Redirected Requests</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalRedirected}</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StatsSection;
