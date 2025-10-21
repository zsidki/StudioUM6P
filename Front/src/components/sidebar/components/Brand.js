import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  const logoColor = useColorModeValue("navy.700", "white");
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home"); // Navigate to the HomePage
  };

  return (
    <Flex align="center" direction="column">
      <HorizonLogo
        h="50px"
        w="175px"
        my="32px"
        color={logoColor}
        cursor="pointer"
        onClick={handleLogoClick}
      />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
