import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box } from "@mui/material";
import Navbar from "./Navbar/Navbar";

function Layout({ children }) {
  return (
    <div style={{ width: "100vw" }}>
      <Navbar />
      <ToastContainer />
      <Box>{children}</Box>
    </div>
  );
}

export default Layout;
