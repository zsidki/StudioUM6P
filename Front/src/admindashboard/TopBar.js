import React from 'react';
import { Input, Button } from 'antd';
import { FaSearch, FaPlus } from 'react-icons/fa';

const TopBar = ({ setTab, searchTerm, setSearchTerm, handleAddRequestClick }) => {
  return (
    <div className="top-bar">
      <div className="tabs">
        <Button onClick={() => setTab('Pending')}>Pending</Button>
        <Button onClick={() => setTab('Approved')}>Approved</Button>
        <Button onClick={() => setTab('Rejected')}>Rejected</Button>
        <Button onClick={() => setTab('Redirected')}>Redirected</Button>
      </div>
      <div className="search-bar">
        <Input
          prefix={<FaSearch />}
          placeholder="Search by service name or category"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <Button type="primary" onClick={handleAddRequestClick}>
        <FaPlus /> Add Request
      </Button>
    </div>
  );
};

export default TopBar;
