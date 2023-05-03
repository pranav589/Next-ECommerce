import { apiCall } from "@/utils/apiCall";
import { Box, Button, Grid, Typography } from "@mui/material";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { DataContext } from "@/store/GlobalState";
import { addToCart } from "@/store/Actions";
import Wrapper from "@/components/Wrapper/Wrapper";

function ProductDetails() {
  const router = useRouter();
  const [productDetailsData, setProductDetailsData] = useState(null);
  const [tab, setTab] = useState(0);
  const { state, dispatch } = React.useContext(DataContext);
  const { auth } = state;

  const handleAddToCart = async (e, product, userId, quantity = 1) => {
    e.stopPropagation();
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");

    if (product?.inStock === 0) {
      return toast.error("Item is out of stock.");
    }
    if (token && state?.auth?.isVerified) {
      const data = [
        {
          productId: product?._id,
          quantity: quantity,
        },
      ];
      if (product?.inStock < quantity) {
        return toast.error("Item is out of stock.");
      }
      const res = await apiCall("POST", `cart/${auth?.user?.id}`, token, data);
      if (res?.data?.status === "success") {
        toast.success("success");
        // return dispatch(addToCart(res?.data?.Data?.products, state.cart));
        const getCart = await apiCall("GET", `cart/${auth?.user?.id}`, token);
        const totalQuantity = getCart?.data?.Data?.cart?.[0]?.products?.reduce(
          (acc, curr) => acc + curr?.quantity,
          0
        );
        const totalAmount = getCart?.data?.Data?.totalAmount;
        return dispatch(addToCart("", "", totalQuantity, totalAmount));
      }
    } else {
      const cartId =
        typeof window !== "undefined" ? localStorage.getItem("cartId") : "";
      const data = {
        cartId: cartId,
        products: [
          {
            productId: product?._id,
            quantity: quantity,
          },
        ],
      };
      const res = await apiCall("POST", `cart`, "", data);

      if (res?.data?.status === "success") {
        toast.success("success");
        localStorage.setItem("cartId", res?.data?.Data?._id);
        if (cartId !== null) {
          const getCart = await apiCall("GET", `cart/guest/${cartId}`);

          const totalQuantity = getCart?.data?.Data?.[0]?.products?.reduce(
            (acc, curr) => acc + curr?.quantity,
            0
          );
          return dispatch(addToCart("", "", totalQuantity));
        }
      }
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await apiCall("GET", `product/${router.query?.id}`);
        if (res?.data?.status === "success") {
          setProductDetailsData(res?.data?.Data);
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
      }
    };
    fetchProductDetails();
  }, [router]);

  return (
    <>
      <Head>
        <title>Product Details Page</title>
      </Head>
      <Wrapper
        style={{
          maxWidth: "1100px",
        }}
      >
        <Box
          sx={{
            padding: "0px 10px",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={7}>
              <Box>
                <img
                  src={productDetailsData?.images?.[tab]?.url}
                  alt={productDetailsData?.images?.[tab]?.url}
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    maxHeight: "450px",
                    borderRadius: "8px",
                  }}
                />
                <Box>
                  {productDetailsData?.images?.map((image, index) => (
                    <img
                      src={image?.url}
                      key={index}
                      alt={image?.url}
                      onClick={() => setTab(index)}
                      style={{
                        width: 80,
                        height: 80,
                        margin: "5px",
                        objectFit: "cover",
                        border: tab === index ? "2px solid red" : "",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  width: "100%",
                  fontSize: "32px",
                }}
              >
                {productDetailsData?.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "10px 0px",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  {productDetailsData?.discountPrice && (
                    <Typography variant="h6" sx={{ color: "red" }}>
                      Rs. {productDetailsData?.discountPrice}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                    sx={{
                      color: productDetailsData?.discountPrice ? "#000" : "red",
                      marginLeft: "15px",
                      textDecoration: productDetailsData?.discountPrice
                        ? "line-through"
                        : "none",
                    }}
                  >
                    Rs. {productDetailsData?.price}
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ color: "red" }}>
                  Sold: {productDetailsData?.sold}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{ margin: "10px 0px", color: "red" }}
              >
                In Stock: {productDetailsData?.inStock}
              </Typography>
              <Typography variant="body1" sx={{ width: "100%" }}>
                {productDetailsData?.description}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "60%",
                  },
                  mt: 3,
                  mb: 2,
                  background: "#539165",
                  "&:hover": { background: "#539165" },
                  borderRadius: "30px",
                  height: "50px",
                }}
                onClick={(e) =>
                  handleAddToCart(e, productDetailsData, state?.auth?.user?.id)
                }
                disabled={productDetailsData?.inStock === 0}
              >
                {productDetailsData?.inStock === 0
                  ? "Out of stock"
                  : "Add to cart"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Wrapper>
    </>
  );
}

export default ProductDetails;
