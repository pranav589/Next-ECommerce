import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, CircularProgress, Typography } from "@mui/material";
import BoxShadowWrapper from "../BoxShadowWrapper";
import DatePickerComponent from "../DatePickerComponent/DatePickerComponent";

export default function LineChartComponent({
  data,
  title,
  dateRange,
  setDateRange,
  startDate,
  endDate,
  handleDateSelect,
  salesDataLoading,
}) {
  return (
    <BoxShadowWrapper style={{ position: "relative", marginBottom: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ fontSize: "22px" }}>{title}</Typography>
        <DatePickerComponent
          dateRange={dateRange}
          setDateRange={setDateRange}
          startDate={startDate}
          endDate={endDate}
          handleDateSelect={handleDateSelect}
          range={true}
          labelProp="Select Date Range"
          isApplyButton={true}
          maxDate={Date.now()}
        />
      </Box>

      <ResponsiveContainer width={"99%"} height={350}>
        {salesDataLoading ? (
          <CircularProgress
            sx={{
              color: "#539165",
              marginLeft: "50%",
              mt: 3,
              mb: 2,
            }}
            size={32}
          />
        ) : (
          <LineChart
            width={500}
            height={500}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Revenue" stroke="#82ca9d" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </BoxShadowWrapper>
  );
}
