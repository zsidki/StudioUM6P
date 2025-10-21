import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    brand: {
      100: "#FAFAFA",
      200: "#D4451E",
      300: "#D4451E",
      400: "#D4451E",
      500: "#D4451E",
      600: "#D4451E",
      700: "#000",
      800: "#D4451E",
      900: "#D4451E",
    },
    brandScheme: {
      100: "#FAFAFA",
      200: "#D4451E",
      300: "#D4451E",
      400: "#D4451E",
      500: "#D4451E",
      600: "#D4451E",
      700: "#000",
      800: "#000",
      900: "#000",
    },
    brandTabs: {
      100: "#FAFAFA",
      200: "#422AFB",
      300: "#422AFB",
      400: "#422AFB",
      500: "#422AFB",
      600: "#3311DB",
      700: "#000",
      800: "#000",
      900: "#000",
    },
    secondaryGray: {
      100: "#FAFAFA",
      200: "#FAFAFA",
      300: "#FAFAFA",
      400: "#FAFAFA",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#000",
    },
    red: {
      100: "#FEEFEE",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF",
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: "#01B574",
      100: "#aac0fe",
      200: "#a3b9f8",
      300: "#728fea",
      400: "#3652ba",
      500: "#1b3bbb",
      600: "#24388a",
      700: "#000",
      800: "#000",
      900: "#000",
    },
    gray: {
      100: "#FAFAFA",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "DM Sans",
      },
    }),
  },
};
