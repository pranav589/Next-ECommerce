import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { Box } from "@mui/material";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
      border: "1px solid black",
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

export default function CardInput() {
  return (
    <Box
      sx={{
        border: "1px solid #dadada",
        height: "55px",
        paddingTop: "3.5%",
        paddingLeft: "10px",
        paddingRight: "10px",
        borderRadius: "6px",
      }}
    >
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </Box>
  );
}
