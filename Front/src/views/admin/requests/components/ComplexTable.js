import React, { useEffect, useState } from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'; // Importing the new icons
import TextModal from './TextModal';
import { useDisclosure } from '@chakra-ui/react';
import { Popconfirm } from 'antd';

import {
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Button,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  HStack,
  Tag,
  Select,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import { message } from 'antd';
import RequestModal from './RequestModal';

import {
  CheckCircleIcon,
  WarningIcon,
  InfoOutlineIcon,
  SpinnerIcon,
  ArrowForwardIcon,
  CheckIcon,
  NotAllowedIcon,
  DownloadIcon,
} from '@chakra-ui/icons';



const RequestTable = () => {

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalText, setModalText] = useState('');
  const [hasQuote, setHasQuote] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await axios.get('https://comm6-0-1.onrender.com/api/selections/all');
      const groupedRequests = groupRequests(response.data);

      // Check for quote existence and add hasQuote to each request
      const requestsWithQuotes = await Promise.all(groupedRequests.map(async (request) => {
        const quoteExists = await checkQuoteFileExistence(request.groupId, 'quote');
        return { ...request, hasQuote: quoteExists };
      }));

      setRequests(requestsWithQuotes);
      setFilteredRequests(requestsWithQuotes);
    } catch (error) {
      message.error("Failed to load requests.");
    }
  };

  const closeAndRefresh = () => {
    setModalVisible(false);
    loadRequests(); // Reload requests after closing the modal
  };
  const groupRequests = (data) => {
    const groupedData = {};
    let numeration = 1; // Initialize numeration counter
  
    data.forEach((item) => {
      const dateKey = moment(item.requestDate).format('YYYY-MM-DD HH:mm');
      const groupKey = item.groupId || '';
      const key = `${dateKey}-${groupKey}`;
  
      if (!groupedData[key]) {
        groupedData[key] = { count: 0, items: [] };
      }
      groupedData[key].count += 1;
      groupedData[key].items.push({ ...item, numeration }); // Assign numeration to the first item
    });
  
    return Object.keys(groupedData).flatMap((key) => {
      const group = groupedData[key];
      const groupNumeration = numeration++;
      return group.items.map((item, index) => ({
        ...item,
        rowSpanData: index === 0 ? { rowspan: group.count } : null,
        numeration: index === 0 ? groupNumeration : null, // Only assign numeration to first item in the group
      }));
    });
  };
  


  const checkQuoteFileExistence = async (groupId, fileType) => {
    const fileUrl = `https://comm6-0-1.onrender.com/upload/download/${groupId}/${fileType}`;

    try {
      console.log(`Checking if file exists at: ${fileUrl}`);
      const response = await fetch(fileUrl);  // Changed to GET request
      if (response.ok) {
        console.log('File exists!');
        return true;  // File exists
      } else {
        console.log('File not found');
        return false;  // File does not exist
      }
    } catch (error) {
      console.error('Error checking file existence:', error);
      return false;  // Handle network or other errors
    }
  };


  const downloadQuote = async (groupId, fileType) => {
    // Check if the file exists before attempting to download
    const fileExists = await checkQuoteFileExistence(groupId, fileType);

    if (!fileExists) {
      message.error('File not found');
      return;
    }

    // Proceed with downloading the file if it exists
    const fileUrl = `https://comm6-0-1.onrender.com/upload/download/${groupId}/${fileType}`;

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error('File not found');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Get the filename from Content-Disposition header (if available)
      const disposition = response.headers.get('Content-Disposition');
      const matches = /filename="([^"]*)"/.exec(disposition);
      const filename = matches && matches[1] ? matches[1] : 'quote.pdf'; // Fallback if filename is not present

      link.download = filename;  // Set the filename dynamically
      link.click();
    } catch (error) {
      message.error(`Error downloading file: ${error.message}`);
    }
  };
  const confirmDelete = async (record) => {
    try {
      // Assuming there’s an API endpoint to delete the request
      await axios.delete(`https://comm6-0-1.onrender.com/api/selections/${record.id}`);
      message.success('Request deleted successfully.');
      loadRequests(); // Refresh the table after deletion
    } catch (error) {
      message.error('Failed to delete the request.');
    }
  };


  const checkFileExistence = async (groupId, fileType) => {
    const fileUrl = `https://comm6-0-1.onrender.com/upload/download/${groupId}/${fileType}`;

    try {
      console.log(`Checking if file exists at: ${fileUrl}`);
      const response = await fetch(fileUrl);  // Changed to GET request
      if (response.ok) {
        console.log('File exists!');
        return true;  // File exists
      } else {
        console.log('File not found');
        return false;  // File does not exist
      }
    } catch (error) {
      console.error('Error checking file existence:', error);
      return false;  // Handle network or other errors
    }
  };


  const downloadfile = async (groupId, fileType) => {
    // Check if the file exists before attempting to download
    const fileExists = await checkFileExistence(groupId, fileType);

    if (!fileExists) {
      message.error('File not found');
      return;
    }

    // Proceed with downloading the file if it exists
    const fileUrl = `https://comm6-0-1.onrender.com/upload/download/${groupId}/${fileType}`;

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error('File not found');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Get the filename from Content-Disposition header (if available)
      const disposition = response.headers.get('Content-Disposition');
      const matches = /filename="([^"]*)"/.exec(disposition);
      const filename = matches && matches[1] ? matches[1] : 'file.pdf'; // Fallback if filename is not present

      link.download = filename;  // Set the filename dynamically
      link.click();
    } catch (error) {
      message.error(`Error downloading file: ${error.message}`);
    }
  };
  const handleEdit = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };
  const handleLongTextClick = (text) => {
    setModalText(text);
    onOpen();
  };

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    setFilteredRequests(status ? requests.filter((req) => req.status === status) : requests);
  };




  const statusColorMap = {
    pending: 'orange',
    accepted: 'green',
    rejected: 'red',
    'work in progress': 'blue',
    redirected: 'purple',
    completed: 'teal',
  };

  const statusIconMap = {
    pending: <InfoOutlineIcon />,
    accepted: <CheckCircleIcon />,
    rejected: <WarningIcon />,
    'work in progress': <SpinnerIcon />,
    redirected: <ArrowForwardIcon />,
    completed: <CheckIcon />,
  };

  return (
    <Box
      w="130vw"
      h="auto"
      bg="white"
      padding="4"
      borderRadius="md"
      boxShadow="md"
    >
      <TextModal isOpen={isOpen} onClose={onClose} text={modalText} />

      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text color={textColor} fontSize="24px" fontWeight="700">Requests</Text>
        <Select
          placeholder="Filter by Status"
          onChange={handleFilterChange}
          value={statusFilter}
          w="200px"
        >
          {Object.keys(statusColorMap).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </Select>
      </Flex>
      <Box w="100%" overflowX="auto">
        <Table variant="simple" color="gray.500" mb="24px" mt="12px" size="lg" border="1px" borderColor={borderColor}>
          <Thead>
            <Tr>
              <Th borderRight="1px solid" borderColor={borderColor} textAlign="center" width="100px">
                <Text fontSize="12px" color="gray.500">#</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="200px">
                <Text fontSize="12px" color="gray.500">Request Date</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="250px">
                <Text fontSize="12px" color="gray.500">Username</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="300px">
                <Text fontSize="12px" color="gray.500">Email</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="200px">
                <Text fontSize="12px" color="gray.500">Phone</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="200px">
                <Text fontSize="12px" color="gray.500">Department</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="300px">
                <Text fontSize="12px" color="gray.500">Content</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="300px">
                <Text fontSize="12px" color="gray.500">Description</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="200px">
                <Text fontSize="12px" color="gray.500">Format</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="200px">
                <Text fontSize="12px" color="gray.500">Category</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="200px">
                <Text fontSize="12px" color="gray.500">Service Name</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="200px">
                <Text fontSize="12px" color="gray.500">Variation</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="200px">
                <Text fontSize="12px" color="gray.500">Price</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="200px">
                <Text fontSize="12px" color="gray.500">Start Date</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="200px">
                <Text fontSize="12px" color="gray.500">End Date</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="200px">
                <Text fontSize="12px" color="gray.500">Status</Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="200px">
                <Text fontSize="12px" color="gray.500">AssignedTo </Text>
              </Th>
              <Th borderRight="1px solid" borderColor={borderColor} width="250px">
                <Text fontSize="12px" color="gray.500">Quote</Text>
              </Th>

              <Th borderRight="1px solid" borderColor={borderColor} width="250px">
                <Text fontSize="12px" color="gray.500">Summary</Text>
              </Th>
              <Th borderColor={borderColor} width="200px">
                <Text fontSize="12px" color="gray.500">Actions</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredRequests.map((record, index) => {
              const statusKey = record.status.trim().toLowerCase();

              return (  // Added return here
                <Tr key={index} borderColor={borderColor}>
{record.rowSpanData && (
        <Td
          rowSpan={record.rowSpanData.rowspan}
          borderRight="1px solid"
          borderColor={borderColor}
          textAlign="center"
          verticalAlign="middle"
        ><Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">

          {record.numeration}</Text>
        </Td>
      )}


                  {record.rowSpanData && (
                    <>
                      <Td rowSpan={record.rowSpanData.rowspan} borderRight="1px solid" borderColor={borderColor}>
                        <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">
                          {moment(record.requestDate).format('YYYY-MM-DD HH:mm')}
                        </Text>
                      </Td>
                      <Td rowSpan={record.rowSpanData.rowspan} borderRight="1px solid" borderColor={borderColor}>
                        <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">
                          {record.user.username}
                        </Text>
                      </Td>
                      <Td rowSpan={record.rowSpanData.rowspan} borderRight="1px solid" borderColor={borderColor}>
                        <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">
                          {record.user.email}
                        </Text>
                      </Td>
                      <Td rowSpan={record.rowSpanData.rowspan} borderRight="1px solid" borderColor={borderColor}>
                        <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">
                          {record.user.phone}
                        </Text>
                      </Td>
                      <Td rowSpan={record.rowSpanData.rowspan} borderRight="1px solid" borderColor={borderColor}>
                        <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">
                          {record.user.department}
                        </Text>
                      </Td>
                    </>
                  )}

                  {/* Content columns with "View" button */}
                  <Td textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
                    <Button variant="link" onClick={() => handleLongTextClick(record.content || 'N/A')}>
                      <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">View</Text>
                    </Button>
                  </Td>
                  <Td textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
                    <Button variant="link" onClick={() => handleLongTextClick(record.descp || 'N/A')}>
                      <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">View</Text>
                    </Button>
                  </Td>
                  <Td textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
                    <Button variant="link" onClick={() => handleLongTextClick(record.format || 'N/A')}>
                      <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">View</Text>
                    </Button>
                  </Td>

                  {/* Other columns */}
                  <Td borderRight="1px solid" borderColor={borderColor}>
                    <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">
                      {record.category || 'N/A'}
                    </Text>
                  </Td>
                  <Td borderRight="1px solid" borderColor={borderColor}>
                    <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">
                      {record.serviceName || 'N/A'}
                    </Text>
                  </Td>
                  <Td borderRight="1px solid" borderColor={borderColor}>
                    <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">
                      {record.variation}
                    </Text>
                  </Td>
                  <Td borderRight="1px solid" borderColor={borderColor}>
                    <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">
                      {record.price ? `${record.price}` : 'N/A'}
                    </Text>
                  </Td>
                  <Td borderRight="1px solid" borderColor={borderColor}>
                    <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">
                      {moment(record.startDate).format('YYYY-MM-DD')}
                    </Text>
                  </Td>
                  <Td borderRight="1px solid" borderColor={borderColor}>
                    <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">
                      {moment(record.endDate).format('YYYY-MM-DD')}
                    </Text>
                  </Td>

                  {/* Status Column */}
                  <Td borderRight="1px solid" borderColor={borderColor}>
                    <HStack spacing={2}>
                      <Tag colorScheme={statusColorMap[record.status]} whiteSpace="nowrap">
                        {statusIconMap[record.status]} <span style={{ marginLeft: '5px' }}>{record.status}</span>
                      </Tag>
                    </HStack>
                  </Td>

                  {/* Assigned worker column */}
                  <Td borderRight="1px solid" borderColor={borderColor}>
                    <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">
                      {record.workerAssigned ? record.workerAssigned : 'Not assigned yet'}
                    </Text>
                  </Td>

                  {/* Centered Quote with download option */}
{record.rowSpanData && (
  <Td
    rowSpan={record.rowSpanData.rowspan}
    borderRight="1px solid"
    borderColor={borderColor}
    textAlign="center"
    verticalAlign="middle"
  >
    <Tag colorScheme={record.hasQuote ? 'blue' : 'red'}>
      {record.hasQuote ? (
        <HStack spacing={2}>
          <DownloadIcon />
          <Text
            onClick={() => downloadQuote(record.groupId, 'quote')}
            style={{ cursor: 'pointer' }}
          >
            Download
          </Text>
        </HStack>
      ) : (
        <HStack spacing={2}>
          <NotAllowedIcon />
          <Text whiteSpace="nowrap">No Quote</Text>
        </HStack>
      )}
    </Tag>
  </Td>
)}

{/* Centered Summary with download option */}
{record.rowSpanData && (
  <Td
    rowSpan={record.rowSpanData.rowspan}
    borderRight="1px solid"
    borderColor={borderColor}
    textAlign="center"
    verticalAlign="middle"
  >
    <Tag colorScheme={record.hasQuote ? 'blue' : 'red'}>
      {record.hasQuote ? (
        <HStack spacing={2}>
          <DownloadIcon />
          <Text
            onClick={() => downloadfile(record.groupId, 'summary')}
            style={{ cursor: 'pointer' }}
          >
            Download file
          </Text>
        </HStack>
      ) : (
        <HStack spacing={2}>
          <NotAllowedIcon />
          <Text whiteSpace="nowrap">No file</Text>
        </HStack>
      )}
    </Tag>
  </Td>
)}




                  {/* Action buttons */}
                  <Td borderRight="1px solid" borderColor={borderColor}>
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        onClick={() => handleEdit(record)}
                        variant="ghost"
                        colorScheme="blue"
                      />
                      <Popconfirm
                        title="Are you sure you want to delete?"
                        onConfirm={() => confirmDelete(record)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <IconButton
                          aria-label="Delete"
                          icon={<DeleteIcon />}
                          variant="ghost"
                          colorScheme="red"
                        />
                      </Popconfirm>
                    </HStack>
                  </Td>


                </Tr>
              );
            })}
          </Tbody>

        </Table>
      </Box>
      <RequestModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSave={closeAndRefresh}
        editingRequest={selectedRecord}
      />
    </Box>
  );
};

export default RequestTable;
