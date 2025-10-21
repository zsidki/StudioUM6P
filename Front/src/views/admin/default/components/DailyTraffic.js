import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is installed
import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";
import Card from "components/card/Card.js";
import { RiArrowUpSFill } from "react-icons/ri";

export default function DailyTraffic(props) {
  const { ...rest } = props;
  const [mostRequestedServices, setMostRequestedServices] = useState([]);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    fetchMostRequestedServices();
  }, []);

  const fetchMostRequestedServices = async () => {
    try {
      const response = await axios.get('https://comm6-0-1.onrender.com/api/selections/all'); // Replace with your actual API endpoint
      const selections = response.data;

      // Count occurrences of each service
      const serviceCounts = {};
      selections.forEach(selection => {
        const serviceName = selection.serviceName; // Assuming `serviceName` exists in selection data
        if (serviceCounts[serviceName]) {
          serviceCounts[serviceName]++;
        } else {
          serviceCounts[serviceName] = 1;
        }
      });

      // Convert to array and sort by count
      const sortedServices = Object.entries(serviceCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); // Get top 5 requested services

      setMostRequestedServices(sortedServices);
    } catch (error) {
      console.error('Failed to fetch most requested services', error);
    }
  };

  return (
    <Card align='center' direction='column' w='100%' {...rest}>

      <Box h='240px' mt='auto'>
        <BarChart
          chartData={mostRequestedServices.map(service => ({
            x: service.name,
            y: service.count,
          }))} // Prepare chart data
          chartOptions={{ /* Your chart options here */ }} 
        />
      </Box>
      <Box mt={4}>
        <Text color={textColor} fontSize='lg' fontWeight='700'>Most Requested Services</Text>
        <Flex flexDirection='column' mt={2}>
          {mostRequestedServices.map((service, index) => (
            <Flex key={index} justify='space-between' w='100%'>
              <Text color='secondaryGray.600' fontSize='md'>{service.name}</Text>
              <Text color={textColor} fontSize='md'>{service.count}</Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Card>
  );
}
