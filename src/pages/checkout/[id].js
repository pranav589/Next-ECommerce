import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper/Wrapper";
import CustomInputBox from "../../../components/CustomInputBox/CustomInputBox";
import { apiCall } from "@/utils/apiCall";
import { toast } from "react-toastify";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import { DataContext } from "../../../store/GlobalState";

function Checkout() {
  const router = useRouter();
  const initialState = {
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    phone: "",
  };
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(initialState);
  const [cart, setCart] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const isValid = () => {
    let errors = {};
    let valid = true;
    if (
      !address?.name ||
      !address?.address1 ||
      !address?.city ||
      !address?.state ||
      !address?.phone
    ) {
      errors["all"] = "Please enter all required fields";
      valid = false;
    }
    if (address?.name?.length < 3) {
      errors["name"] = "Name should be atleast 3 letters long";
      valid = false;
    }

    if (address?.address1?.length < 8) {
      errors["address1"] = "Address should be atleast 8 letters long";
      valid = false;
    }

    if (address?.city?.length < 3) {
      errors["city"] = "City should be atleast 3 letters long";
      valid = false;
    }

    if (address?.state?.length < 3) {
      errors["state"] = "State should be atleast 3 letters long";
      valid = false;
    }

    if (!validatePhoneNumber(address?.phone)) {
      errors["phone"] = "Please enter valid phone number";
      valid = false;
    }
    setError(errors);
    return valid;
  };

  function validatePhoneNumber(input_str) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    return re.test(input_str);
  }

  useEffect(() => {
    const getAddress = async () => {
      try {
        const res = await apiCall("GET", "address", token);
        if (res?.data?.status === "success") {
          setIsEdit(true);
          const { name, address1, address2, city, state, phone } =
            res?.data?.Data?.[0];
          setAddress({
            name,
            address1,
            address2,
            city,
            state,
            phone,
          });
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setIsEdit(false);
      }
    };
    getAddress();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validate = isValid();
    const data = {
      name: address?.name,
      address1: address?.address1,
      address2: address?.address2,
      city: address?.city,
      state: address?.state,
      phone: address?.phone,
    };
    if (validate === true) {
      try {
        if (isEdit) {
          const res = await apiCall("PUT", "address", token, data);
          if (res?.data?.status === "success") {
            toast.success("Address updated successfully!");
          }

          setLoading(false);
        } else {
          const res = await apiCall("POST", "address", token, data);
          console.log({ res });
          if (res?.data?.status === "success") {
            toast.success("Address added successfully!");
          }
          setLoading(false);
        }
        const orderData = {
          cart: cart,
          total: total,
          address: address,
          couponCode: couponCode,
          discount: discount,
        };

        const createOrderRes = await apiCall("POST", "order", token, orderData);
        console.log({ createOrderRes });
        if (createOrderRes?.data?.status === "success") {
          router.push(`/order/${createOrderRes?.data?.Data?._id}`);
        }
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setLoading(false);
      }
      setLoading(false);
    }
  };

  const { state } = useContext(DataContext);
  const { auth } = state;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (token && auth?.isVerified) {
      const fetchCart = async () => {
        const res = await apiCall("GET", `cart/${auth?.user?.id}`, token);
        if (res?.data?.status === "success") {
          console.log({ res });
          setCouponCode(res?.data?.Data?.cart?.[0]?.couponCode);
          setDiscount(res?.data?.Data?.cart?.[0]?.discount);
          setTotal(res?.data?.Data?.totalAmount);
          setCart(res?.data?.Data?.cart?.[0]?.products);
        }
      };
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.isVerified]);

  return (
    <Wrapper>
      <Box
        component="form"
        noValidate
        sx={{
          mt: 1,
          padding: "20px",

          display: "flex",
          flexDirection: "column",
          maxWidth: {
            xs: "95%",
            md: "700px",
          },
          height: {
            xs: "90vh",
            sm: "fit-content",
          },
          margin: "20px auto 10px auto",
          boxShadow: "1px 8px 8px whitesmoke",
        }}
      >
        <Button
          sx={{
            marginRight: "auto",
            color: "#539165",
          }}
          startIcon={<ArrowBackIosIcon />}
          onClick={() => router.push("/cart")}
        >
          Go Back
        </Button>
        <Typography variant="h5" textAlign={"center"}>
          Enter Address
        </Typography>
        <CustomInputBox
          id={"name"}
          label={"Name"}
          name={"name"}
          value={address?.name}
          onChange={(e) => setAddress({ ...address, name: e.target.value })}
          errorValue={error?.name}
          inputStyle={{
            width: { xs: "100%", sm: "100%", md: "100%" },
          }}
          required={true}
        />
        <CustomInputBox
          id={"address1"}
          label={"Address 1"}
          name={"address1"}
          value={address?.address1}
          onChange={(e) => setAddress({ ...address, address1: e.target.value })}
          errorValue={error?.address1}
          inputStyle={{ width: "100%" }}
          required={true}
        />
        <CustomInputBox
          id={"address2"}
          label={"Address 2"}
          name={"address2"}
          value={address?.address2}
          onChange={(e) => setAddress({ ...address, address2: e.target.value })}
          inputStyle={{ width: "100%" }}
          required={false}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <CustomInputBox
            id={"city"}
            label={"City"}
            name={"city"}
            value={address?.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            errorValue={error?.city}
            containerStyle={{
              width: "100%",
              marginRight: "10px",
            }}
            required={true}
          />
          <CustomInputBox
            id={"state"}
            label={"State"}
            name={"state"}
            value={address?.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            errorValue={error?.state}
            containerStyle={{ width: "100%" }}
            required={true}
          />
        </Box>
        <CustomInputBox
          id={"phone"}
          label={"Phone No."}
          name={"phone"}
          value={address?.phone}
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          errorValue={error?.phone}
          inputStyle={{ width: "100%" }}
          required={true}
        />
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
          <Button
            variant="contained"
            sx={{
              width: "100%",
              mt: 3,
              mb: 2,
              background: "#539165",
              "&:hover": { background: "#539165" },
              borderRadius: "30px",
              height: "50px",
            }}
            onClick={(e) => {
              handleSubmit(e);
            }}
            disabled={
              !address?.name ||
              !address?.address1 ||
              !address?.city ||
              !address?.state ||
              !address?.phone
            }
          >
            {isEdit ? "Edit and proceed" : "Proceed"}
          </Button>
        )}
      </Box>
    </Wrapper>
  );
}

export default Checkout;
