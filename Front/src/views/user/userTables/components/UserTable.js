import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  Spinner,
  Tag,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Select,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import {  message } from 'antd';

import { CloseIcon, AttachmentIcon,DownloadIcon,NotAllowedIcon,ArrowDownIcon} from '@chakra-ui/icons';
import { CheckCircleIcon, WarningIcon, SpinnerIcon, ArrowForwardIcon, InfoOutlineIcon, CheckIcon } from '@chakra-ui/icons';
import axios from 'axios';
import TextModal from './TextModal';
import { useDisclosure } from '@chakra-ui/react';

const UserDashboard = () => {

  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalText, setModalText] = useState('');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const department = localStorage.getItem('department');
  const [selectedFile, setSelectedFile] = useState(null); // New state for file selection

  useEffect(() => {
    const fetchSelections = async () => {
      try {
        const response = await axios.get(
          `https://comm6-0-1.onrender.com/api/selections/getRequestsForUserById/${userId}`
        );
        const sortedSelections = response.data.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
        setSelections(sortedSelections);
        setLoading(false);
      } catch (err) {
        setError('Error fetching requests. Please try again later.');
        setLoading(false);
      }
    };

    if (userId) {
      fetchSelections();
    } else {
      setError('User is not logged in.');
      setLoading(false);
    }
  }, [userId]);

  const isSameGroup = (groupId1, groupId2) => groupId1 === groupId2;
  const handleUpload = async (file, groupId) => {
    if (!file) return; // If no file is selected, do nothing.
  
    const formData = new FormData();
    formData.append('file', file);  // Attach the selected file
    formData.append('groupId', groupId);  // Attach the group ID
    formData.append('fileType', 'quote');  // Explicitly set fileType as "quote"
  
    try {
      // Send the file to the server for upload with the "quote" fileType
      await axios.post(`https://comm6-0-1.onrender.com/upload/${groupId}/quote`, formData);
      message.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      message.error(`${file.name} file upload failed.`);
    }
  };
  
  const calculateRowSpan = (data, index) => {
    let rowSpan = 1;
    for (let i = index + 1; i < data.length; i++) {
      if (isSameGroup(data[i].groupId, data[index].groupId)) rowSpan++;
      else break;
    }
    if (index > 0 && isSameGroup(data[index - 1].groupId, data[index].groupId)) return 0;
    return rowSpan;
  };
  

  const handleLongTextClick = (text) => {
    setModalText(text);
    onOpen();
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value.toLowerCase());
  };

  const filteredSelections = selections.filter((selection) =>
    selection.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter ? selection.status.toLowerCase() === statusFilter : true)
  );

  if (loading) return <Spinner size="xl" />;
  if (error) return <Box>{error}</Box>;

  // Status color and icon map with case-insensitive handling
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
    <Box w="130vw" h="auto" bg="white" padding="4" borderRadius="md" boxShadow="md">
  <TextModal isOpen={isOpen} onClose={onClose} text={modalText} />

  <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
    <Text fontSize="24px" fontWeight="700">My Requests</Text>
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
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">No.</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">Username</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">Department</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">Phone</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">Email</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px" whiteSpace="nowrap">Request Date</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">Category</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px" whiteSpace="nowrap">Service Name</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">Content</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">Description</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">Format</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">Start Date</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px" whiteSpace="nowrap">End Date</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">Status</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">Price</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">Quote</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px" whiteSpace="nowrap">Upload Your Quote</Th>
          <Th borderRight="1px solid" borderColor={borderColor} width="200px">Partners</Th>
        </Tr>
      </Thead>
      <Tbody>
      {filteredSelections.map((selection, index) => {
  const rowSpan = calculateRowSpan(filteredSelections, index);
  const isGroupStart = rowSpan > 0;
  const statusKey = selection.status.toLowerCase();
  const allStatusesResolved = selections
    .filter(sel => sel.groupId === selection.groupId)
    .every(sel => sel.status !== 'pending');

  // Keep track of if the quote has been already displayed for the current group
  const isQuoteAlreadyDisplayed = index > 0 && filteredSelections[index - 1].groupId === selection.groupId;

  return (
    <Tr key={selection.id}>
      {isGroupStart && (
        <>
          {/* Columns that should be shown once per group (first row) */}
          <Td rowSpan={rowSpan} textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
            <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">{index + 1}</Text>
          </Td>
          <Td rowSpan={rowSpan} textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
            <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">{selection.user.username}</Text>
          </Td>
          <Td rowSpan={rowSpan} textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
            <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">{selection.user.department}</Text>
          </Td>
          <Td rowSpan={rowSpan} textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
            <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">{selection.user.phone}</Text>
          </Td>
          <Td rowSpan={rowSpan} textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
            <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">{selection.user.email}</Text>
          </Td>
          <Td rowSpan={rowSpan} textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
            <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">{new Date(selection.requestDate).toLocaleString()}</Text>
          </Td>
        </>
      )}
      
      <Td textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
        <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">{selection.category}</Text>
      </Td>
      <Td textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
        <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">{selection.serviceName}</Text>
      </Td>
      <Td textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
        <Button variant="link" onClick={() => handleLongTextClick(selection.content || 'N/A')}>
          <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">View</Text>
        </Button>
      </Td>
      <Td textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
        <Button variant="link" onClick={() => handleLongTextClick(selection.description || 'N/A')}>
          <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">View</Text>
        </Button>
      </Td>
      <Td textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
        <Button variant="link" onClick={() => handleLongTextClick(selection.format || 'N/A')}>
          <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">View</Text>
        </Button>
      </Td>
      <Td textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
        <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">{selection.startDate ? new Date(selection.startDate).toLocaleDateString() : 'Not Assigned Yet'}</Text>
      </Td>
      <Td textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
        <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">{selection.endDate ? new Date(selection.endDate).toLocaleDateString() : 'Not Assigned Yet'}</Text>
      </Td>
      <Td textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
        <Tag colorScheme={statusColorMap[statusKey]} whiteSpace="nowrap">
          {statusIconMap[statusKey]}
          {selection.status}
        </Tag>
      </Td>
      <Td textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
        <Text color={textColor} fontSize="lg" fontWeight="600" whiteSpace="nowrap">{`${selection.price || 'Not Assigned Yet'} `}</Text>
      </Td>
      
      {/* Only show the Download Quote link for the first row in the group */}
      {isGroupStart && !isQuoteAlreadyDisplayed && (
        <Td rowSpan={rowSpan} textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
          {allStatusesResolved ? (
            <Box display="flex" alignItems="center" color="green.500" borderRadius="md" border="1px solid" borderColor="green.500" p="2">
              <DownloadIcon mr={2} />
              <a href={`https://comm6-0-1.onrender.com/api/pdf/generatePdf/${selection.groupId}`} download>
                <Text whiteSpace="nowrap"> Download Quote</Text>
              </a>
            </Box>
          ) : (
            <Box display="flex" alignItems="center" color="red.500" cursor="not-allowed" border="1px solid" borderColor="red.500" borderRadius="md" p="2">
              <NotAllowedIcon mr={2} />
              <Text whiteSpace="nowrap">Quote Unavailable</Text>
            </Box>
          )}
        </Td>
      )}

      {/* Only show the file upload for the first row in the group */}
      {isGroupStart && (
        <Td rowSpan={rowSpan} textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
          <Box display="flex" alignItems="center" justifyContent="center">
            <Input
              type="file"
              onChange={(e) => handleUpload(e.target.files[0], selection.groupId)} // Automatically handle upload
              accept=".pdf,.doc,.docx,.jpg,.png"
              w="auto"
              display="inline-block"
            />
          </Box>
        </Td>
      )}

      {/* Display the "View Our Partners" link for all rows with a status of "redirected" */}
      <Td textAlign="center" border="1px solid" borderColor={borderColor} borderRadius="md">
        {selection.status.trim().toLowerCase() === "redirected" && (
          <Box color="purple.500" cursor="pointer" textDecoration="underline">
            <a href="/user/profile" target="_blank" whiteSpace="nowrap">
            <Text  fontSize="lg" fontWeight="600" whiteSpace="nowrap">

            View Our Partners</Text></a>
          </Box>
        )}
        {selection.status.trim().toLowerCase() !== "redirected" && <Text color={textColor}></Text>}
      </Td>
    </Tr>
  );
})}

</Tbody>

    </Table>
  </Box>
</Box>
  );
};

export default UserDashboard;
