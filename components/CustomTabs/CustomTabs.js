import { Box, Chip } from "@mui/material";
import * as React from "react";
import BoxShadowWrapper from "../BoxShadowWrapper";
import shortid from "shortid";

export default function CustomTabs(props) {
  const { isAdminTabs, tabListing = [], active } = props;
  const tabList = isAdminTabs
    ? [
        {
          id: "1",
          label: "Dashboard",
          url: "/adminDashboard",
          component: "Dashboard",
        },
        {
          id: "2",
          label: "Orders",
          url: "/adminDashboard/orders",
          component: "Orders",
        },
        {
          id: "2",
          label: "Users",
          url: "/adminDashboard/users",
          component: "Users",
        },
        {
          id: "3",
          label: "Products",
          url: "/adminDashboard/products",
          component: "Products",
        },
        {
          id: "4",
          label: "Categories",
          url: "/adminDashboard/categories",
          component: "Categories",
        },
        {
          id: "5",
          label: "Coupons",
          url: "/adminDashboard/coupon",
          component: "Coupon",
        },
      ]
    : tabListing;

  return (
    <Box>
      <BoxShadowWrapper
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: { xs: "start", sm: "start", md: "start" },
          overflowX: "auto",
          padding: "13px",
          boxShadow: "none",
        }}
      >
        {tabList?.map((tab) => (
          <Chip
            key={shortid.generate()}
            label={tab?.label}
            component="a"
            href={tab?.url}
            variant="outlined"
            clickable
            sx={{
              marginRight: "10px",
              fontSize: "18px",
              padding: "5px",
              height: "38px",
              minWidth: "120px",
              borderRadius: "50px",
              background: active === tab?.label ? "#539165" : "",
              color: active === tab?.label ? "#fff" : "",
            }}
          />
        ))}
      </BoxShadowWrapper>
      <Box>{props?.children}</Box>
    </Box>
  );
}
