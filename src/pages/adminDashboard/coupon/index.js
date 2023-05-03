import React, { useContext, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { apiCall } from "@/utils/apiCall";
import "react-datepicker/dist/react-datepicker.css";
import { DataContext } from "@/store/GlobalState";
import Wrapper from "@/components/Wrapper/Wrapper";
import CustomTabs from "@/components/CustomTabs/CustomTabs";
import BoxShadowWrapper from "@/components/BoxShadowWrapper";
import CustomInputBox from "@/components/CustomInputBox/CustomInputBox";
import DatePickerComponent from "@/components/DatePickerComponent/DatePickerComponent";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import PaginationComponent from "@/components/PaginationComponent/PaginationComponent";

function Coupon() {
  const [triggerCouponCall, setTriggerCouponCall] = useState(false);
  const [page, setPage] = useState(1);
  const [productLimit, setProductLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);
  const [error, setError] = useState(null);

  const { state } = useContext(DataContext);
  const { auth } = state;
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isCouponListLoading, setIsCouponListLoading] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setIsCouponListLoading(true);
        const res = await apiCall(
          "GET",
          `coupon?page=${page}&limit=${productLimit}`,
          token
        );
        if (res?.data?.status === "success") {
          console.log({ res });
          setCoupons(res?.data?.Data?.coupons);
          setTotalCount(res?.data?.Data?.totalCount);
        }
        setIsCouponListLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setIsCouponListLoading(false);
      }
    };
    fetchCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerCouponCall, page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (auth?.user?.role !== "admin" || auth?.user?.root === false) {
      return toast.error("Unauthorized access.");
    }
    const data = {
      name: name,
      expiry: expiryDate,
      discount: discountValue,
    };

    try {
      if (isEdit) {
        const res = await apiCall(
          "PATCH",
          `coupon/${selectedCoupon?._id}`,
          token,
          data
        );
        if (res?.data?.status === "success") {
          setName("");
          setDiscountValue(0);
          setExpiryDate(null);
          toast.success("Coupon Updated.");
          setIsLoading(false);
          setIsEdit(false);
          setTriggerCouponCall(!triggerCouponCall);
        }
      } else {
        const res = await apiCall("POST", "coupon", token, data);
        if (res?.data?.status === "success") {
          setName("");
          setDiscountValue(0);
          setExpiryDate(null);
          toast.success(res?.data?.msg);
          setIsLoading(false);
          setTriggerCouponCall(!triggerCouponCall);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.err || "Something went wrong.");
      setIsLoading(false);
      setIsEdit(false);
    }
  };

  const handleDelete = async (coupon) => {
    try {
      const res = await apiCall("DELETE", `coupon/${coupon?._id}`, token);
      if (res?.data?.status === "success") {
        toast.success("Coupon deleted.");
        setTriggerCouponCall(!triggerCouponCall);
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
    }
  };

  const handleEdit = (coupon) => {
    console.log({ coupon });
    setSelectedCoupon(coupon);
    setIsEdit(true);
    setName(coupon?.name);
    setDiscountValue(coupon?.discount);
    setExpiryDate(new Date(coupon?.expiry));
  };
  console.log({ expiryDate });

  return (
    <Wrapper>
      <Box
        sx={{
          padding: "0px 10px",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <CustomTabs isAdminTabs={true} active={"Coupons"}>
          <Grid container columnSpacing={3}>
            <Grid item xs={12} sm={12} md={4}>
              <BoxShadowWrapper
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ fontSize: "18px" }}>
                  {" "}
                  Enter Coupon Details
                </Typography>
                <CustomInputBox
                  id={"name"}
                  label={"Coupon Code"}
                  name={"name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  errorValue={error?.name}
                  inputStyle={{
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  required={true}
                />
                <CustomInputBox
                  id={"discountValue"}
                  label={"Discount in rupees"}
                  name={"discountValue"}
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  errorValue={error?.discountValue}
                  inputStyle={{
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  required={true}
                  type="number"
                />
                <DatePickerComponent
                  dateRange={expiryDate}
                  setDateRange={setExpiryDate}
                  labelProp="Select Expiry Date"
                />

                {isLoading ? (
                  <CircularProgress
                    sx={{
                      color: "#539165",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    size={25}
                  />
                ) : (
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                      width: "100%",
                      mt: 2,
                      mb: 2,
                      background: "#539165",
                      "&:hover": { background: "#539165" },
                      borderRadius: "30px",
                      height: "40px",
                    }}
                    disabled={!expiryDate || !name}
                  >
                    {isEdit ? "Edit" : "Add"}
                  </Button>
                )}
              </BoxShadowWrapper>
            </Grid>

            <Grid item xs={12} sm={12} md={8}>
              <BoxShadowWrapper
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "18px" }}>Coupon Codes</Typography>
                {coupons?.length === 0 && (
                  <Typography sx={{ fontSize: "18px", marginTop: "10px" }}>
                    No Coupon Codes Found. May be add a new one?
                  </Typography>
                )}

                {isCouponListLoading ? (
                  <CircularProgress
                    sx={{
                      color: "#539165",
                      mt: 3,
                      mb: 2,
                    }}
                    size={25}
                  />
                ) : (
                  coupons?.map((category) => (
                    <CategoryCard
                      key={category?._id}
                      card={category}
                      setName={setName}
                      setIsEdit={setIsEdit}
                      setSelectedValue={setSelectedCoupon}
                      setTriggerValueCall={setTriggerCouponCall}
                      triggerValueCall={triggerCouponCall}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      modalMessage={
                        "Are you sure that you want to delete this coupon?"
                      }
                      type="coupon"
                    />
                  ))
                )}
                {totalCount > 10 && (
                  <PaginationComponent
                    page={page}
                    setPage={setPage}
                    count={Math.ceil(totalCount / productLimit)}
                  />
                )}
              </BoxShadowWrapper>
            </Grid>
          </Grid>
        </CustomTabs>
      </Box>
    </Wrapper>
  );
}

export default Coupon;
