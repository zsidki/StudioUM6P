
import { Box, SimpleGrid } from "@chakra-ui/react";
import ComplexTable from "views/admin/requests/components/ComplexTable";

import {
  columnsDataDevelopment,

} from "views/admin/requests/variables/columnsData";

import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "20px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <ComplexTable
          columnsData={columnsDataDevelopment}
        />

      </SimpleGrid>
    </Box>
  );
}
