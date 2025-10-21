import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import Card from 'components/card/Card';
import axios from 'axios';
import { Modal, message } from 'antd';

const columnHelper = createColumnHelper();

const Admin = () => {
  const [tableData, setTableData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // Fetch the list of admins from the backend
  const fetchAdmins = async () => {
    try {
      const response = await axios.get('https://comm6-0-1.onrender.com/admins'); // Replace with your API endpoint
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
      message.error('Could not fetch admins');
    }
  };

  // Delete an admin
  const deleteAdmin = async (adminId) => {
    try {
      await axios.delete(`https://comm6-0-1.onrender.com/admins/${adminId}`); // Replace with your API endpoint
      fetchAdmins(); // Refresh the admin list
      message.success('Admin deleted successfully');
    } catch (error) {
      console.error('Error deleting admin:', error);
      message.error('Could not delete admin');
    }
  };

  const handleRevert = (id) => {
    Modal.confirm({
      title: "Are you sure you want to revert this user?",
      onOk: () => {
        axios.patch(`https://comm6-0-1.onrender.com/api/users/revert/${id}`)
          .then(() => {
            message.success("User reverted successfully.");
            fetchAdmins();  // Optionally refetch data or update state
          })
          .catch(error => {
            console.error("Error reverting user:", error);
            message.error("Error reverting user.");
          });
      }
    });
  };

  // Fetch admin data when the component mounts
  useEffect(() => {
    fetchAdmins();
  }, []);

  const columns = [
    columnHelper.accessor('username', {
      id: 'username',
      header: () => <Text fontSize="12px" color="gray.500">USERNAME</Text>,
      cell: info => <Text color={textColor} fontSize="lg" fontWeight="600">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => <Text fontSize="12px" color="gray.500">EMAIL</Text>,
      cell: info => <Text color={textColor} fontSize="lg" fontWeight="600">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('role', {
      id: 'role',
      header: () => <Text fontSize="12px" color="gray.500">ROLE</Text>,
      cell: info => <Text color={textColor} fontSize="lg" fontWeight="600">{info.getValue()}</Text>,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <Text fontSize="12px" color="gray.500">ACTIONS</Text>,
      cell: info => (
        <Flex>
          <Button size="sm" colorScheme="red" onClick={() => deleteAdmin(info.row.original.id)}>Delete</Button>
          <Button size="sm" colorScheme="yellow" ml="2" onClick={() => handleRevert(info.row.original.id)}>Revert</Button>
        </Flex>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card
      flexDirection="column"
      w="100vw"
      h="100vh"
      px="20px"
      overflowX="auto"
      overflowY="auto"
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text color={textColor} fontSize="24px" fontWeight="700" lineHeight="100%">Admins</Text>
      </Flex>
      <Box w="100%" overflowX="auto">
        <Table variant="simple" color="gray.500" mb="24px" mt="12px" size="lg">
          <Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    borderColor={borderColor}
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                    px="16px"
                    py="12px"
                  >
                    <Flex justifyContent="space-between" align="center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map(row => (
              <Tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <Td
                    key={cell.id}
                    fontSize="lg"
                    px="16px"
                    py="12px"
                    borderColor="gray.300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}

export default Admin;
