import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../store/GlobalState";
import CartProduct from "../../components/CartProduct";
import CartSummary from "../../components/CartSummary";
import Wrapper from "../../components/Wrapper/Wrapper";
import { apiCall } from "@/utils/apiCall";
import { addToCart } from "../../store/Actions";
import CouponCode from "../../components/CouponCode/CouponCode";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import useWindowSize from "../../hooks/useWindowSize";
import CustomModal from "../../components/Modal/CustomModal";
import shortid from "shortid";

function Cart() {
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const { state, dispatch } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [triggerLoginCart, setTriggerLoginCart] = useState(false);
  const [triggerGuestCart, setTriggerGuestCart] = useState(false);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const windowSize = useWindowSize();

  const { cart, auth } = state;
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const cartId =
    typeof window !== "undefined" && localStorage.getItem("cartId");
  useEffect(() => {
    if (token && auth?.isVerified) {
      const fetchCart = async () => {
        const res = await apiCall("GET", `cart/${auth?.user?.id}`, token);
        if (res?.data?.status === "success") {
          console.log({ res1: res });
          setCartData(res?.data?.Data?.cart?.[0]?.products);
          setDiscount(res?.data?.Data?.cart?.[0]?.discount);
          setCouponCode(res?.data?.Data?.cart?.[0]?.couponCode);
          res?.data?.Data?.cart?.[0]?.couponCode?.length > 0 &&
            setIsCouponApplied(true);
          setTotal(res?.data?.Data?.totalAmount);
          const totalQuantity = res?.data?.Data?.cart?.[0]?.products?.reduce(
            (acc, curr) => acc + curr?.quantity,
            0
          );
          return dispatch(addToCart("", "", totalQuantity, total));
        }
      };
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.isVerified, triggerLoginCart, couponCode?.readOnly]);

  useEffect(() => {
    if (!token && cartId !== null) {
      const fetchGuestCart = async () => {
        const res = await apiCall("GET", `cart/guest/${cartId}`);
        if (res?.data?.status === "success") {
          setCartData(res?.data?.Data?.[0]?.products);
          const totalQuantity = res?.data?.Data?.[0]?.products?.reduce(
            (acc, curr) => acc + curr?.quantity,
            0
          );
          return dispatch(addToCart("", "", totalQuantity));
        }
      };
      fetchGuestCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerGuestCart]);

  const handleCouponCodeApply = async (e) => {
    e.preventDefault();
    console.log("hi");
    setIsCouponLoading(true);
    try {
      const data = {
        name: couponCode,
        isApplied: isCouponApplied,
      };

      const res = await apiCall("PUT", `coupon/applyCoupon`, token, data);
      if (res.data?.status === "success") {
        toast.success(res?.data?.msg);
        setIsCouponApplied(true);
        setTriggerLoginCart(!triggerLoginCart);
        setIsCouponLoading(false);
        setShowConfetti(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
      setIsCouponApplied(false);
      setCouponCode("");
      setIsCouponLoading(false);
    }
  };

  const handleCouponCodeRemove = async (e) => {
    e.preventDefault();
    console.log("remove");
    setIsCouponLoading(true);
    try {
      const data = {
        name: couponCode,
        isApplied: isCouponApplied,
      };

      const res = await apiCall("PUT", `coupon/removeCoupon`, token, data);
      if (res.data?.status === "success") {
        toast.success(res?.data?.msg);
        setIsCouponApplied(false);
        setTriggerLoginCart(!triggerLoginCart);
        setIsCouponLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
      setIsCouponApplied(false);
      setCouponCode("");
      setIsCouponLoading(false);
    }
  };

  if (cartData?.length === 0 || (cartData === undefined && loading === false)) {
    return <Typography>No Products Found!</Typography>;
  }

  return (
    <Wrapper>
      <Box
        sx={{
          padding: "0px 10px",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          Shopping Cart
        </Typography>
        <Grid container sx={{ marginTop: "30px" }} columnSpacing={12}>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            // marginRight={{
            //   xs: 0,
            //   sm: 3,
            // }}

            marginBottom={5}
          >
            <Typography variant="h5">Cart Items</Typography>
            <hr />
            {loading === true ? (
              <CircularProgress
                sx={{
                  color: "#539165",
                  marginLeft: "50%",
                  mt: 3,
                  mb: 2,
                }}
              />
            ) : (
              cartData?.map((product) => (
                <CartProduct
                  key={shortid.generate()}
                  product={product}
                  // setLoading={setLoading}
                  setProducts={setProducts}
                  setCartData={setCartData}
                  setTriggerLoginCart={setTriggerLoginCart}
                  triggerLoginCart={triggerLoginCart}
                  triggerGuestCart={triggerGuestCart}
                  setTriggerGuestCart={setTriggerGuestCart}
                />
              ))
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h5">Summary</Typography>
            <hr />
            <Box sx={{ width: "100% !important" }}>
              {auth?.isVerified && (
                <CouponCode
                  couponCode={couponCode}
                  setCouponCode={setCouponCode}
                  isCouponApplied={isCouponApplied}
                  setIsCouponApplied={setIsCouponApplied}
                  handleCouponCodeApply={handleCouponCodeApply}
                  handleCouponCodeRemove={handleCouponCodeRemove}
                  isCouponLoading={isCouponLoading}
                />
              )}
            </Box>

            <CartSummary
              totalAmount={total}
              discount={discount}
              setDiscount={setDiscount}
            />
          </Grid>
        </Grid>
        {showConfetti === true ? (
          <Confetti
            width={windowSize?.width}
            height={600}
            recycle={false}
            numberOfPieces={500}
          />
        ) : null}
        {showConfetti === true && (
          <CustomModal
            open={showConfetti}
            setOpen={setShowConfetti}
            modalTitle={"Yaayyy!!  Congratulations!!!"}
            declineButtonName={"Close"}
            showAgreedButton={false}
            showDeclineButton={true}
          >
            <Typography>Your coupon code is applied.</Typography>
          </CustomModal>
        )}
      </Box>
    </Wrapper>
  );
}

export default Cart;
