import Head from "next/head";
import DetailOrder from "../../../components/DetailOrder/DetailOrder";
import Wrapper from "../../../components/Wrapper/Wrapper";
import { Box } from "@mui/material";

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
