import React from "react";
import Confetti from "react-confetti";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useWindowSize from "@/hooks/useWindowSize";

function Success() {
  const windowSize = useWindowSize();
  const router = useRouter();
  return (
    <Box>
      <Confetti width={windowSize?.width} height={600} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Typography sx={{ fontSize: "32px" }}>
          Yayyy!!! Order has been made!!
        </Typography>
        <Typography sx={{ fontSize: "22px", marginTop: "10px" }}>
          You order will be delivered on time!
        </Typography>
        <Typography sx={{ fontSize: "22px", marginTop: "10px" }}>
          Thank you for ordering from our website.
        </Typography>
        <Typography sx={{ fontSize: "22px", marginTop: "10px" }}>
          Wanna purchase something more?
        </Typography>
        <Button onClick={() => router.push("/")} sx={{ marginTop: "10px" }}>
          Back to products list
        </Button>
      </Box>
    </Box>
  );
}

export default Success;
