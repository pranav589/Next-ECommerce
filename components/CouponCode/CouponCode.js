import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";
import CustomInputBox from "../CustomInputBox/CustomInputBox";

function CouponCode({
  couponCode,
  setCouponCode,
  isCouponApplied,
  handleCouponCodeApply,
  handleCouponCodeRemove,
  isCouponLoading,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <CustomInputBox
        containerStyle={{ width: "80%" }}
        id={"couponCode"}
        label={"Codupon Code"}
        name={"couponCode"}
        inputStyle={{
          width: { xs: "100%", sm: "100%", md: "100% !important" },
        }}
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        errorValue={""}
        readOnly={isCouponApplied}
        size="small"
      />
      {isCouponLoading ? (
        <CircularProgress
          sx={{
            color: "#539165",
          }}
          size={25}
        />
      ) : (
        <Button
          sx={{
            background: "#539165",
            "&:hover": { background: "#539165" },
            color: "#fff",
            fontSize: "13px !important",
          }}
          onClick={(e) => {
            isCouponApplied === true
              ? handleCouponCodeRemove(e)
              : handleCouponCodeApply(e);
          }}
        >
          {isCouponApplied ? "Remove" : "Apply"}
        </Button>
      )}
    </Box>
  );
}

export default CouponCode;
