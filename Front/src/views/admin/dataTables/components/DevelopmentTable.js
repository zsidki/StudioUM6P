'use client';
/* eslint-disable */
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
import { Modal, Input, message } from 'antd';

const columnHelper = createColumnHelper();

export default function ComplexTable() {
  const [tableData, setTableData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // Fetch data from API
  useEffect(() => {
    axios.get('https://comm6-0-1.onrender.com/api/users')
      .then(response => {
        setTableData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const showSuccess = (msg) => {
    message.success(msg);
  };

  const showError = (msg) => {
    message.error(msg);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      onOk: () => {
        axios.delete(`https://comm6-0-1.onrender.com/api/users/${id}`)
          .then(() => {
            showSuccess("User deleted successfully.");
            setTableData(prevData => prevData.filter(user => user.id !== id)); // Remove from state
          })
          .catch(error => {
            console.error("Error deleting user:", error);
            showError("Error deleting user.");
          });
      }
    });
  };

  const handlePromote = (id) => {
    Modal.confirm({
      title: "Are you sure you want to promote this user?",
      onOk: () => {
        axios.patch(`https://comm6-0-1.onrender.com/api/users/promote/${id}`)
          .then(() => {
            showSuccess("User promoted successfully.");
            // Optionally refetch data or update state
            setTableData(prevData => 
              prevData.map(user => 
                user.id === id ? { ...user, role: "admin" } : user
              )
            );
          })
          .catch(error => {
            console.error("Error promoting user:", error);
            showError("Error promoting user.");
          });
      }
    });
  };

  const handleRevert = (id) => {
    Modal.confirm({
      title: "Are you sure you want to revert this user?",
      onOk: () => {
        axios.patch(`https://comm6-0-1.onrender.com/api/users/revert/${id}`)
          .then(() => {
            showSuccess("User reverted successfully.");
            // Optionally refetch data or update state
          })
          .catch(error => {
            console.error("Error reverting user:", error);
            showError("Error reverting user.");
          });
      }
    });
  };

  const handleSaveEdit = () => {
    axios.put(`https://comm6-0-1.onrender.com/api/users/${editingUser.id}`, editingUser)
      .then(() => {
        showSuccess("User updated successfully.");
        setIsEditing(false);
        setTableData(prevData => prevData.map(user => user.id === editingUser.id ? editingUser : user));
      })
      .catch(error => {
        console.error("Error updating user:", error);
        showError("Error updating user.");
      });
  };

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
    columnHelper.accessor('department', {
      id: 'department',
      header: () => <Text fontSize="12px" color="gray.500">DEPARTMENT</Text>,
      cell: info => <Text color={textColor} fontSize="lg" fontWeight="600">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      header: () => <Text fontSize="12px" color="gray.500">PHONE</Text>,
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
          <Button size="sm" colorScheme="blue" onClick={() => handleEdit(info.row.original)}>Edit</Button>
          <Button size="sm" colorScheme="red" ml="2" onClick={() => handleDelete(info.row.original.id)}>Delete</Button>
          <Button size="sm" colorScheme="green" ml="2" onClick={() => handlePromote(info.row.original.id)}>Promote</Button>
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
    <>
      <Card
        flexDirection="column"
        w="100vw"
        h="100vh"
        px="20px"
        overflowX="auto"
        overflowY="auto"
      >
        <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
          <Text color={textColor} fontSize="24px" fontWeight="700" lineHeight="100%">Users</Text>
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

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={handleSaveEdit}
      >
        <Input
          placeholder="Username"
          value={editingUser?.username}
          onChange={e => setEditingUser({ ...editingUser, username: e.target.value })}
        />
        <Input
          placeholder="Email"
          value={editingUser?.email}
          onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
          style={{ marginTop: 10 }}
        />
        <Input
          placeholder="Department"
          value={editingUser?.department}
          onChange={e => setEditingUser({ ...editingUser, department: e.target.value })}
          style={{ marginTop: 10 }}
        />
        <Input
          placeholder="Phone"
          value={editingUser?.phone}
          onChange={e => setEditingUser({ ...editingUser, phone: e.target.value })}
          style={{ marginTop: 10 }}
        />
        <Input
          placeholder="Role"
          value={editingUser?.role}
          onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}
          style={{ marginTop: 10 }}
        />
      </Modal>
    </>
  );
}
