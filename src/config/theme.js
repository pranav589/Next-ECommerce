import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    greenShade: {
      main: "#539165",
    },
    blueShade: {
      main: "#3F497F",
    },
    yellowShade: {
      main: "#F7C04A",
    },
    creamShade: {
      main: "#F8F5E4",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
