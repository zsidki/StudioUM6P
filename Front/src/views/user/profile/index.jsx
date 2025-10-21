
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/user/profile/components/Information";



import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "120px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
        />

      </SimpleGrid>
    </Box>
  );
}
