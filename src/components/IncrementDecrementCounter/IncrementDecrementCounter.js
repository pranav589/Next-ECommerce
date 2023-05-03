import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function IncrementDecrementCounter({
  handleDecrease,
  handleIncrease,
  product,
  isLoading,
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        sx={{
          border: "1px solid black",
          marginRight: "10px",

          padding: "3px",
          minWidth: "fit-content",
        }}
        onClick={handleDecrease}
        disabled={product?.quantity <= 1}
      >
        <RemoveIcon sx={{ color: "black" }} />
      </Button>

      {isLoading ? (
        <CircularProgress
          sx={{
            color: "#539165",
          }}
          size={25}
        />
      ) : (
        <Typography>{product?.quantity}</Typography>
      )}
      <Button
        sx={{
          border: "1px solid black",
          marginRight: "10px",
          padding: "3px",
          minWidth: "fit-content",
          marginLeft: "10px",
        }}
        onClick={handleIncrease}
        disabled={product?.inStock <= product.quantity}
      >
        <AddIcon sx={{ color: "black" }} />
      </Button>
    </Box>
  );
}

export default IncrementDecrementCounter;
