// src/views/admin/Requests/components/tableHelpers.js

import React from 'react';

// Function to get the status icon based on the status value
export const getStatusIcon = (status) => {
  switch (status) {
    case 'completed':
      return <span>✔️</span>; // Completed icon
    case 'pending':
      return <span>⏳</span>; // Pending icon
    case 'rejected':
      return <span>❌</span>; // Rejected icon
    case 'work in progress':
      return <span>🔄</span>; // Work in Progress icon
    default:
      return <span>❓</span>; // Default icon for unknown statuses
  }
};
