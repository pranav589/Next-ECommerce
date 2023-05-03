import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar/Navbar";
import { Box } from "@mui/material";

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
