import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../store/GlobalState";
import { useRouter } from "next/router";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import Wrapper from "../../../components/Wrapper/Wrapper";
import CustomTabs from "../../../components/CustomTabs/CustomTabs";
import BoxShadowWrapper from "../../../components/BoxShadowWrapper";
import { toast } from "react-toastify";
import { apiCall } from "@/utils/apiCall";
import useWindowSize from "../../../hooks/useWindowSize";
// import LineChart from "../../../components/LineChart/LineChart";
import LineChartComponent from "../../../components/LineChart/LineChart";
// import SwipeableViews from "react-swipeable-views";

const AdminCommerceDetailsBox = ({ title, value, link, image }) => {
  const { width } = useWindowSize();
  return (
    <Grid item xs={6} sm={4} md={2.3}>
      <BoxShadowWrapper
        style={{
          display: "flex",
          // alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "28px", color: "crimson" }}>
            {value}
          </Typography>
          <Typography sx={{ fontSize: "17px", fontWeight: 500 }}>
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              textDecoration: "underline",
              marginTop: "3px",
              color: "blue",
            }}
          >
            {link}
          </Typography>
        </Box>
        {width > 767 && (
          <Paper sx={{ width: "85px", padding: "2px" }}>
            <img
              src={image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              alt={title}
            />
          </Paper>
        )}
      </BoxShadowWrapper>
    </Grid>
  );
};

function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const router = useRouter();
  const { auth } = state;
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const [dashboardData, setDashboardData] = useState([]);
  const [salesData, setSalesData] = useState([]);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [dashboardDataLoading, setDashboardDataLoading] = useState(false);
  const [salesDataLoading, setSalesDataLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setDashboardDataLoading(true);
      try {
        const res = await apiCall("GET", "dashboard", token);
        if (res?.data?.status === "success") {
          setDashboardData(res?.data?.Data);
        }
        setDashboardDataLoading(false);
      } catch (error) {
        toast.error(error?.data?.response?.msg);
        setDashboardDataLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const dateComparison = (dateA, dateB) => {
    const firstDate = new Date(dateA);
    const secondDate = new Date(dateB);
    let data = {};
    if (firstDate > secondDate) {
      data = {
        startDate: secondDate,
        endDate: firstDate,
      };
    } else {
      data = {
        startDate: firstDate,
        endDate: secondDate,
      };
    }
    return data;
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setSalesDataLoading(true);
        const dateComparisonResult = dateComparison(
          Date.now() - 7 * 24 * 60 * 60 * 1000,
          Date.now()
        );
        const data = {
          startDate: dateComparisonResult?.startDate,
          endDate: dateComparisonResult?.endDate,
        };
        const res = await apiCall("POST", "salesData", token, data);
        if (res?.data?.status === "success") {
          setSalesData(res?.data?.Data);
        }
        setSalesDataLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setSalesDataLoading(false);
      }
    };
    fetchSalesData();
  }, []);

  const handleDateFilter = async (startDate, endDate) => {
    try {
      setSalesDataLoading(true);
      const dateComparisonResult = dateComparison(startDate, endDate);
      const data = {
        startDate: dateComparisonResult?.startDate,
        endDate: dateComparisonResult?.endDate,
      };
      const res = await apiCall("POST", "salesData", token, data);
      if (res?.data?.status === "success") {
        setSalesData(res?.data?.Data);
      }
      setSalesDataLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.err);
      setSalesDataLoading(false);
    }
  };

  if (auth?.user?.role === "user") {
    return <Typography>Unauthorized access</Typography>;
  }

  return (
    <Wrapper>
      <Box
        sx={{
          padding: "0px 10px",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <CustomTabs isAdminTabs={true} active={"Dashboard"}>
          {dashboardDataLoading ? (
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
            <Grid container columnSpacing={5} height={"100%"}>
              <AdminCommerceDetailsBox
                title={"Items Sold"}
                value={dashboardData?.ordersCount}
                link={"View All"}
                image={
                  "https://media.istockphoto.com/id/539953664/photo/business-success-with-growing-rising-charts-and-businessman-in-background.jpg?s=612x612&w=0&k=20&c=s9ownrOZkwgHwZdr9AQqPpfMxwh-KwRZZxPnXbECQUo="
                }
              />
              <AdminCommerceDetailsBox
                title={"Revenue"}
                value={`₹ ${dashboardData?.ordersPrice}`}
                link={"View All"}
                image={
                  "https://media.istockphoto.com/id/539953664/photo/business-success-with-growing-rising-charts-and-businessman-in-background.jpg?s=612x612&w=0&k=20&c=s9ownrOZkwgHwZdr9AQqPpfMxwh-KwRZZxPnXbECQUo="
                }
              />
              <AdminCommerceDetailsBox
                title={"Products"}
                value={dashboardData?.productsCount}
                link={"View All"}
                image={
                  "https://media.istockphoto.com/id/539953664/photo/business-success-with-growing-rising-charts-and-businessman-in-background.jpg?s=612x612&w=0&k=20&c=s9ownrOZkwgHwZdr9AQqPpfMxwh-KwRZZxPnXbECQUo="
                }
              />
              <AdminCommerceDetailsBox
                title={"Users"}
                value={dashboardData?.usersCount}
                link={"View All"}
                image={
                  "https://media.istockphoto.com/id/539953664/photo/business-success-with-growing-rising-charts-and-businessman-in-background.jpg?s=612x612&w=0&k=20&c=s9ownrOZkwgHwZdr9AQqPpfMxwh-KwRZZxPnXbECQUo="
                }
              />
              <AdminCommerceDetailsBox
                title={"On Sale"}
                value={5}
                link={"View All"}
                image={
                  "https://media.istockphoto.com/id/539953664/photo/business-success-with-growing-rising-charts-and-businessman-in-background.jpg?s=612x612&w=0&k=20&c=s9ownrOZkwgHwZdr9AQqPpfMxwh-KwRZZxPnXbECQUo="
                }
              />
            </Grid>
          )}

          <LineChartComponent
            data={salesData}
            title={"Daily Revenue Analytics"}
            startDate={startDate}
            endDate={endDate}
            dateRange={dateRange}
            setDateRange={setDateRange}
            handleDateSelect={handleDateFilter}
            salesDataLoading={salesDataLoading}
          />
        </CustomTabs>
      </Box>
    </Wrapper>
  );
}

export default AdminDashboard;
