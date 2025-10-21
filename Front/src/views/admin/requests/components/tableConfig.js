// Update your tableConfig.js

import { createColumnHelper } from '@tanstack/react-table';
import { Text } from '@chakra-ui/react';

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor('requestDate', {
    id: 'requestDate',
    header: () => <Text fontSize="12px" color="gray.500">REQUEST DATE</Text>,
    cell: (info) => <Text>{info.getValue()}</Text>, // Simple text display, adjust as necessary
  }),
  columnHelper.accessor('username', {
    id: 'username',
    header: () => <Text fontSize="12px" color="gray.500">USERNAME</Text>,
    cell: (info) => <Text>{info.getValue()}</Text>, // Simple text display, adjust as necessary
  }),
  // ... other columns
  columnHelper.accessor('id', {
    id: 'actions',
    header: () => <Text fontSize="12px" color="gray.500">ACTIONS</Text>,
    cell: () => null, // Handle actions in ComplexTable.js
  }),
];

export default columnHelper;
