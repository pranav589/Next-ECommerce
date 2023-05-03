import Head from "next/head";
import { Box } from "@mui/material";
import Wrapper from "@/components/Wrapper/Wrapper";
import DetailOrder from "@/components/DetailOrder/DetailOrder";

const OrderDetails = () => {
  return (
    <>
      <Head>
        <title>Order Details</title>
      </Head>
      <Wrapper>
        <Box
          sx={{
            padding: "0px 10px",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          <DetailOrder />
        </Box>
      </Wrapper>
    </>
  );
};

export default OrderDetails;
