import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import { VSeparator } from "components/separator/Separator";
import axios from "axios";

export default function Conversion(props) {
  const { ...rest } = props;

  // State to hold the category data
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get('https://comm6-0-1.onrender.com/api/selections/all');
        const data = response.data;

        // Logic to count categories
        const categoryCounts = {};
        data.forEach(item => {
          const category = item.category; // Adjust based on your data structure
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        // Prepare data for the pie chart
        const formattedData = Object.keys(categoryCounts).map(category => ({
          name: category,
          value: categoryCounts[category],
        }));

        setCategoryData(formattedData);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  if (loading) {
    return <Text color={textColor}>Loading...</Text>;
  }

  return (
    <Card p='20px' align='center' direction='column' w='100%' {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          Category Comparaison
        </Text>

      </Flex>

      <PieChart
        h='100%'
        w='100%'
        chartData={categoryData}
        chartOptions={{
          responsive: true, // Ensure this is a boolean
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Category Distribution',
            },
          },
        }}
      />

    </Card>
  );
}
