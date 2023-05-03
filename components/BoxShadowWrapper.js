import { Box } from "@mui/material";
import React from "react";

function BoxShadowWrapper({ children, style }) {
  return (
    <Box
      sx={{
        mt: 1,
        padding: "20px",
        height: "fit-content",
        margin: "20px auto 10px auto",
        boxShadow: "1px 5px 5px 2px whitesmoke",
        border: "1px solid #e6e8ec",
        borderRadius: "8px",
        ...style,
      }}
    >
      {children}
    </Box>
  );
}

export default BoxShadowWrapper;
