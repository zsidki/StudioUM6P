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
import LineChart from "components/charts/LineChart";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
import { RiArrowUpSFill } from "react-icons/ri";

export default function TotalSpent(props) {
  const { ...rest } = props;
  const [totalIncomeData, setTotalIncomeData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    fetchTotalIncomeData();
  }, []);

  const fetchTotalIncomeData = async () => {
    try {
      const response = await axios.get('https://comm6-0-1.onrender.com/api/selections/all'); // Your selections API
      const selections = response.data;

      // Calculate total income for the current month
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyIncome = selections
        .filter(selection => {
          const selectionDate = new Date(selection.date); // Assuming `date` field exists
          return selectionDate.getMonth() === currentMonth && selectionDate.getFullYear() === currentYear;
        })
        .reduce((acc, selection) => acc + (selection.price || 0), 0);

      // Prepare data for the line chart (this needs to be structured based on your chart library's requirements)
      const chartData = selections
        .filter(selection => {
          const selectionDate = new Date(selection.date);
          return selectionDate.getMonth() === currentMonth && selectionDate.getFullYear() === currentYear;
        })
        .map(selection => ({
          x: selection.date, // Use the appropriate format for your chart
          y: selection.price,
        }));

      setTotalIncomeData(chartData); // Set the data for the line chart
      setTotalIncome(monthlyIncome); // Set the total income
    } catch (error) {
      console.error('Failed to fetch total income data', error);
    }
  };

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
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
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%'>
          <Button
            bg={boxBg}
            fontSize='sm'
            fontWeight='500'
            color={textColorSecondary}
            borderRadius='7px'>
            <Icon
              as={MdOutlineCalendarToday}
              color={textColorSecondary}
              me='4px'
            />
            This month
          </Button>
          
        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection='column' me='20px' mt='28px'>
          <Text
            color={textColor}
            fontSize='34px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'>
            ${totalIncome.toFixed(2)} {/* Display total income */}
          </Text>
          <Flex align='center' mb='20px'>
            <Text
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'
              mt='4px'
              me='12px'>
              Total Gained
            </Text>
 
          </Flex>


        </Flex>
        <Box minH='260px' minW='75%' mt='auto'>
          <LineChart
            chartData={totalIncomeData} // Pass the fetched data to LineChart
            chartOptions={{ /* Add your chart options here */ }} 
          />
        </Box>
      </Flex>
    </Card>
  );
}
