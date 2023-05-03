import { Box } from "@mui/material";
import React from "react";

function Wrapper(props) {
  const { style } = props;
  return (
    <Box
      sx={{
        maxWidth: "1400px",
        marginLeft: "auto",
        marginRight: "auto",
        ...style,
      }}
    >
      {props?.children}
    </Box>
  );
}

export default Wrapper;
