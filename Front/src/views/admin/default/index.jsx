import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import {
  MdGroup,
  MdWork,
  MdPending,
  MdCheckCircle,
  MdRedo, // New icon for "Redirected"
  MdHourglassEmpty, // New icon for "Work in Progress"
} from "react-icons/md";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import axios from "axios";
import { message } from "antd";

export default function UserReports() {
  const [data, setData] = useState({
    requestStatuses: { pending: 0, completed: 0, redirected: 0, workInProgress: 0 },
    totalUsers: 0,
    totalProjects: 0,
  });

  // Chakra Color Mode
  const boxBg = useColorModeValue("#FEE2E2", "#FEE2E2");

  useEffect(() => {
    fetchUserReports();
  }, []);

  const fetchUserReports = async () => {
    try {
      const selectionsResponse = await axios.get('https://comm6-0-1.onrender.com/api/selections/all');
      const selections = selectionsResponse.data;

      const usersResponse = await axios.get('https://comm6-0-1.onrender.com/api/users');
      const users = usersResponse.data;

      // Process the data to set state
      const requestStatuses = {
        pending: 0,
        completed: 0,
        redirected: 0,
        workInProgress: 0,
      };

      selections.forEach(selection => {
        const { status } = selection;
        if (status) {
          requestStatuses[status.toLowerCase()]++;
        }
      });

      setData({
        requestStatuses,
        totalUsers: users.length,
        totalProjects: selections.length,
      });
    } catch (error) {
      message.error('Failed to fetch data from backend');
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        {/* Pending Status */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdPending} color={'#D4451E'} />}
            />
          }
          name='Pending'
          value={data.requestStatuses.pending}
        />
        {/* Completed Status */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdCheckCircle} color={'#D4451E'} />} // Green color for completion
            />
          }
          name='Completed'
          value={data.requestStatuses.completed}
        />
        {/* Redirected Status */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdRedo} color={'#D4451E'} />} // Orange color for redirected
            />
          }
          name='Redirected'
          value={data.requestStatuses.redirected}
        />
        {/* Work in Progress Status */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdHourglassEmpty} color={'#D4451E'} />} // Blue color for work in progress
            />
          }
          name='Work in Progress'
          value={data.requestStatuses.workInProgress}
        />
        {/* Users */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdGroup} color={'#D4451E'} />}
            />
          }
          name='Users'
          value={data.totalUsers}
        />
        {/* Projects */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdWork} color={'#D4451E'} />}
            />
          }
          name='Projects'
          value={data.totalProjects}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <DailyTraffic />
        <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px'>
          <PieCard />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
