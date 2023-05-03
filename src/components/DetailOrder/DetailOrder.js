import { apiCall } from "@/utils/apiCall";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addToCart } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import BoxShadowWrapper from "../BoxShadowWrapper";
import TableComponent from "../TableComponent/TableComponent";

function DetailOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [orderData, setOrderData] = useState([]);
  const [orderTableData, setOrderTableData] = useState([]);
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [cart, setCart] = useState(false);
  const [deliveryCallTriggered, setDeliveryCallTriggered] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (token && auth?.isVerified) {
      const fetchCart = async () => {
        const res = await apiCall("GET", `cart/${auth?.user?.id}`, token);

        if (res?.data?.status === "success") {
          const totalQuantity = res?.data?.Data?.cart?.[0]?.products?.reduce(
            (acc, curr) => acc + curr?.quantity,
            0
          );
          setCart(res?.data?.Data?.cart?.[0]?.products);
          setTotal(
            res?.data?.Data?.totalAmount - res?.data?.Data?.cart?.[0]?.discount
          );
          dispatch(
            addToCart(
              "",
              "",
              totalQuantity,
              res?.data?.Data?.totalAmount -
                res?.data?.Data?.cart?.[0]?.discount
            )
          );
        }
      };
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.isVerified]);

  const tableHeadings = ["Image", "Name", "Price", "Quantity", "Sub-total"];
  const handlePayment = async () => {
    const data = {
      cart: cart,
      userId: auth?.user?.id,
      orderId: router?.query?.id,
      total: total,
    };
    router.push(`/payment?orderId=${router?.query?.id}`);
  };

  const handleDelivery = async () => {
    if (orderData?.payment_status === true) {
      try {
        if (auth?.user?.role === "admin" || auth?.root === true) {
          const data = {
            orderId: router?.query?.id,
            payment_status: orderData?.payment_status,
          };
          const res = await apiCall("PUT", "order/delivery", token, data);
          if (res?.data?.status === "success") {
            setDeliveryCallTriggered(true);
          }
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
      }
    } else {
      toast.error(
        "Payment for this order is not done yet. It cannot be marked as delivered."
      );
    }
  };
  console.log({ state });

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      if (router?.query?.id) {
        const res = await apiCall("GET", `order/${router?.query?.id}`, token);
        console.log(res);
        if (res?.data?.status === "success") {
          const formatedData = res?.data?.Data?.cart?.map((order) => {
            return {
              firstCol: order?.productId?.images?.[0]?.url,
              secondCol: order?.productId?.title,
              thirdCol: (
                <Box>
                  {`₹ ${
                    order?.productId?.discount > 0
                      ? order?.productId?.discountPrice
                      : order?.productId?.price
                  }`}
                </Box>
              ),
              fourthCol: order?.quantity,
              fifthCol: `₹ ${
                order?.productId?.discount > 0
                  ? order?.productId?.discountPrice * order?.quantity
                  : order?.productId?.price * order?.quantity
              }`,
            };
          });
          setOrderTableData(formatedData);
          setOrderData(res?.data?.Data);
          setIsLoading(false);
        }
      }
    };
    fetchOrder();
  }, [router.query, deliveryCallTriggered]);
  if (isLoading) {
    return (
      <CircularProgress
        sx={{
          color: "#539165",
          marginLeft: "50%",
          mt: 3,
          mb: 2,
        }}
        size={32}
      />
    );
  }

  return (
    <Grid container columnSpacing={5}>
      <Grid item xs={12} sm={8} md={9}>
        <Typography sx={{ fontSize: "24px", textTransform: "uppercase" }}>
          Order Id: {orderData?._id}
        </Typography>
        <BoxShadowWrapper>
          <Typography sx={{ fontSize: "22px", marginBottom: "10px" }}>
            Shipping Address
          </Typography>
          <Typography
            sx={{ fontSize: "18px", display: "flex", flexWrap: "wrap" }}
          >
            <span>{orderData?.address?.name && orderData?.address?.name}</span>,
            <span>
              {orderData?.address?.address1 && orderData?.address?.address1}
            </span>
            ,
            <span>
              {orderData?.address?.address2 && orderData?.address?.address2}
            </span>
            ,<span>{orderData?.address?.city && orderData?.address?.city}</span>
            ,
            <span>
              {orderData?.address?.state && orderData?.address?.state}
            </span>
            ,
            <span>
              {orderData?.address?.phone && orderData?.address?.phone}
            </span>
          </Typography>
        </BoxShadowWrapper>
        <BoxShadowWrapper>
          <Typography sx={{ fontSize: "22px", marginBottom: "10px" }}>
            Payment Status
          </Typography>
          <Typography
            sx={{
              background:
                orderData?.payment_status === true ? "lightgreen" : "#fee2e2",
              padding: "8px 12px",
              fontSize: "18px",
              color: orderData?.payment_status === true ? "green" : "#c04856",
              borderRadius: "5px",
            }}
          >
            {orderData?.payment_status === true
              ? `Paid -  ${new Date(orderData?.dateOfPayment)?.toDateString()}`
              : "Not Paid"}
          </Typography>
        </BoxShadowWrapper>
        <BoxShadowWrapper>
          <Typography sx={{ fontSize: "22px", marginBottom: "10px" }}>
            Delivery Status
          </Typography>
          <Typography
            sx={{
              background:
                orderData?.delivered === true ? "lightgreen" : "#fee2e2",
              padding: "8px 12px",
              fontSize: "18px",
              color: orderData?.delivered === true ? "green" : "#c04856",
              borderRadius: "5px",
            }}
          >
            {orderData?.delivered === false
              ? "Not Delivered"
              : `Delivered - ${new Date(
                  orderData?.dateOfDelivery
                )?.toDateString()}`}
          </Typography>
        </BoxShadowWrapper>
        <BoxShadowWrapper>
          <TableComponent
            title={"Order Items"}
            tableHeadings={tableHeadings}
            tableHeadingsStyle={{ fontSize: "18px" }}
            imageContainerStyle={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
            }}
            imageStyle={{ height: "100%", width: "100%", flex: 1 }}
            tableBodyStyle={{ fontSize: "18px" }}
            tableBodyData={orderTableData}
            isImage={true}
          />
        </BoxShadowWrapper>
      </Grid>
      <Grid item xs={12} sm={3} md={3} marginTop={"35px"}>
        <BoxShadowWrapper>
          <Typography sx={{ fontSize: "24px", textTransform: "uppercase" }}>
            Total: ₹{Math.floor(orderData?.total - orderData?.discount)}
          </Typography>
          {auth?.user?.role === "user" && orderData?.payment_status === true ? (
            <Typography sx={{ fontSize: "18px", marginTop: "10px" }}>
              Already Paid
            </Typography>
          ) : (auth?.user?.role === "admin" || auth?.root === true) &&
            orderData?.delivered === false ? (
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
              onClick={() => handleDelivery()}
            >
              Deliver Order
            </Button>
          ) : (auth?.user?.role === "admin" || auth?.root === true) &&
            orderData?.delivered === true ? (
            <Typography sx={{ fontSize: "18px", marginTop: "10px" }}>
              Delivered
            </Typography>
          ) : (
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
              onClick={() => handlePayment()}
            >
              Pay
            </Button>
          )}
        </BoxShadowWrapper>
      </Grid>
    </Grid>
  );
}

export default DetailOrder;
