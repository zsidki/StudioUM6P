import {
    Button,
    Text,
    Flex,
  } from '@chakra-ui/react';
  import moment from 'moment';
  import { FilePdfOutlined, StopOutlined } from '@ant-design/icons';
  import { createColumnHelper } from '@tanstack/react-table';
  
  const columnHelper = createColumnHelper();
  
  export const prepareDataWithRowspan = (data) => {
    const groupedData = {};
  
    data.forEach((item) => {
      const requestDateKey = moment(item.requestDate).format('YYYY-MM-DD HH:mm');
      const userKey = `${item.user.username}-${item.user.department}-${item.user.email}`;
      const groupKey = `${requestDateKey}-${item.groupId}-${userKey}`;
  
      if (!groupedData[groupKey]) {
        groupedData[groupKey] = { count: 0, items: [] };
      }
      groupedData[groupKey].count += 1;
      groupedData[groupKey].items.push(item);
    });
  
    return Object.keys(groupedData).flatMap((key) => {
      const group = groupedData[key];
      return group.items.map((item, index) => ({
        ...item,
        requestDate: index === 0 ? { text: moment(item.requestDate).format('YYYY-MM-DD HH:mm'), rowspan: group.count } : null,
        username: index === 0 ? { text: item.user.username, rowspan: group.count } : null,
        department: index === 0 ? { text: item.user.department, rowspan: group.count } : null,
        email: index === 0 ? { text: item.user.email, rowspan: group.count } : null,
        phone: item.user.phone, // Ensure phone is displayed
        devis: index === 0 ? { text: item.devis ? item.devis : 'No Devis', rowspan: group.count } : null,
        rowSpan: group.count,
      }));
    });
  };
  
  export const columns = [
    columnHelper.accessor('requestDate', {
      header: () => <Text fontSize="12px" color="gray.500">REQUEST DATE</Text>,
      cell: (info) => <Text fontSize="lg" fontWeight="600">{info.getValue()?.text}</Text>,
    }),
    columnHelper.accessor('username', {
      header: () => <Text fontSize="12px" color="gray.500">REQUESTED BY</Text>,
      cell: (info) => <Text fontSize="lg" fontWeight="600">{info.getValue()?.text}</Text>,
    }),
    columnHelper.accessor('email', {
      header: () => <Text fontSize="12px" color="gray.500">EMAIL</Text>,
      cell: (info) => <Text fontSize="lg" fontWeight="600">{info.getValue()?.text}</Text>,
    }),
    columnHelper.accessor('phone', {
      header: () => <Text fontSize="12px" color="gray.500">PHONE</Text>,
      cell: (info) => <Text fontSize="lg" fontWeight="600">{info.getValue()}</Text>,
    }),
    // ... other columns ...
    columnHelper.accessor('devis', {
      header: () => <Text fontSize="12px" color="gray.500">QUOTE</Text>,
      cell: (info) => (
        <Flex justifyContent="center">
          {info.getValue()?.text ? (
            <Button
              colorScheme="teal"
              onClick={() => window.open(info.getValue().url, '_blank')}
              leftIcon={<FilePdfOutlined />}
            >
              View Quote
            </Button>
          ) : (
            <StopOutlined style={{ color: 'red' }} />
          )}
        </Flex>
      ),
    }),
  ];
  