import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { DataContext } from "@/store/GlobalState";

const AmountComponent = ({ title, type, value }) => {
  return (
    <Typography
      variant="h6"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "5%",
      }}
    >
      <span>{title}:</span>{" "}
      <span style={{ fontSize: "16px" }}>
        {type} {value}
      </span>
    </Typography>
  );
};

function CartSummary({ totalAmount, discount }) {
  const router = useRouter();
  const { state } = useContext(DataContext);
  const { auth } = state;

  return (
    <Box>
      <Box
        sx={{
          background: "#f2f2f2",
          padding: "15px",
          marginTop: "5px",
          borderRadius: "8px",
        }}
      >
        <AmountComponent
          title={"Total Amount"}
          type={"Rs. "}
          value={totalAmount}
        />
        <AmountComponent
          title={"Total Discount"}
          type={"Rs. "}
          value={discount}
        />
        <hr />
        <AmountComponent
          title={"Amount to be payed"}
          type={"Rs. "}
          value={totalAmount - discount}
        />
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          background: "#539165",
          "&:hover": { background: "#539165" },
          height: "45px",
          borderRadius: "30px",
          fontSize: "18px",
        }}
        onClick={() =>
          auth?.user?.id
            ? router.push(`/checkout/${auth?.user?.id}`)
            : router.push(`/login?from=${router?.route}`)
        }
      >
        Checkout
      </Button>
    </Box>
  );
}

export default CartSummary;
