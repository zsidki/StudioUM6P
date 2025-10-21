import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is installed
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import BarChart from "components/charts/BarChart"; // Ensure you have a BarChart component
import { MdBarChart } from "react-icons/md";

export default function WeeklyRevenue(props) {
  const { ...rest } = props;
  const [weeklyRevenueData, setWeeklyRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchWeeklyRevenueData();
  }, []);

  const fetchWeeklyRevenueData = async () => {
    try {
      const response = await axios.get('https://comm6-0-1.onrender.com/api/selections/all'); // Your selections API
      const selections = response.data;

      // Calculate total revenue for the current week
      const currentDate = new Date();
      const currentWeekStart = currentDate.getDate() - currentDate.getDay(); // Get the first day of the week (Sunday)
      const currentWeekEnd = currentWeekStart + 6; // Get the last day of the week (Saturday)

      const weeklyIncome = selections
        .filter(selection => {
          const selectionDate = new Date(selection.date); // Assuming `date` field exists
          const day = selectionDate.getDate();
          return (
            selectionDate.getMonth() === currentDate.getMonth() &&
            selectionDate.getFullYear() === currentDate.getFullYear() &&
            day >= currentWeekStart &&
            day <= currentWeekEnd
          );
        })
        .reduce((acc, selection) => acc + (selection.price || 0), 0);

      // Prepare data for the bar chart
      const chartData = Array.from({ length: 7 }, (_, index) => {
        const dayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + index));
        const dayRevenue = selections
          .filter(selection => {
            const selectionDate = new Date(selection.date);
            return selectionDate.getDate() === dayOfWeek.getDate() &&
                   selectionDate.getMonth() === dayOfWeek.getMonth() &&
                   selectionDate.getFullYear() === dayOfWeek.getFullYear();
          })
          .reduce((acc, selection) => acc + (selection.price || 0), 0);

        return {
          x: dayOfWeek.toLocaleDateString(), // Format date for display
          y: dayRevenue,
        };
      });

      setWeeklyRevenueData(chartData);
      setTotalRevenue(weeklyIncome);
    } catch (error) {
      console.error('Failed to fetch weekly revenue data', error);
    }
  };

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Weekly Revenue
        </Text>
        
      </Flex>

      <Box h='240px' mt='auto'>
        <BarChart
          chartData={weeklyRevenueData} // Pass the fetched data to BarChart
          chartOptions={{ /* Add your chart options here */ }} 
        />
      </Box>
    </Card>
  );
}
