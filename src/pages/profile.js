import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import { Box, Button, Grid, Typography } from "@mui/material";
import BoxShadowWrapper from "../../components/BoxShadowWrapper";
import CustomInputBox from "../../components/CustomInputBox/CustomInputBox";
import TableComponent from "../../components/TableComponent/TableComponent";
import { apiCall } from "@/utils/apiCall";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { DataContext } from "../../store/GlobalState";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";

function profile() {
  const initialData = {
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [error, setError] = useState(null);
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [ordersTableData, setOrdersTableData] = useState([]);
  const [profile, setProfile] = useState(initialData);
  const [page, setPage] = useState(1);
  const [productLimit, setProductLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const tableHeadings = [
    "Order Id",
    "User",
    "Date",
    "Total",
    "Delivered",
    "Paid",
    "Action",
  ];
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await apiCall(
        "GET",
        `order?page=${page}&limit=${productLimit}`,
        token
      );
      if (res?.data?.status === "success") {
        if (res?.data?.status === "success") {
          setTotalCount(res?.data?.Data?.totalCount);
          const formattedData = res?.data?.Data?.orders?.map((order) => {
            return {
              firstCol: order?._id,
              secondCol: order?.user?.name,

              thirdCol: new Date(order?.createdAt).toLocaleDateString(),

              fourthCol: `₹ ${order?.total}`,
              fifthCol: order?.delivered?.toString(),

              sixthCol: order?.payment_status?.toString(),
              sevnthCol: (
                <Button onClick={() => handleOrderNavigate(order?._id)}>
                  Details
                </Button>
              ),
            };
          });
          setOrdersTableData(formattedData);
          setOrders(res?.data?.Data?.orders);
        }
      }
    };
    fetchOrders();
  }, [page]);

  useEffect(() => {
    if (auth?.isVerified === true) {
      setProfile({
        ...profile,
        email: auth?.user?.email,
        name: auth?.user?.name,
      });
    }
  }, [auth?.isVerified]);

  const handleOrderNavigate = (orderId) => {
    router.push(`/order/${orderId}`);
  };

  const validate = () => {
    let errors = {};
    let valid = true;
    if (
      !profile?.name ||
      !profile?.email ||
      !profile?.oldPassword ||
      !profile?.newPassword ||
      !profile?.confirmNewPassword
    ) {
      errors["all"] = "Please enter all required fields";
      valid = false;
    }

    if (profile?.newPassword?.length < 6) {
      errors["newPassword"] = "Password should be atleast 6 characters long";
      valid = false;
    }

    if (profile?.newPassword !== profile?.confirmNewPassword) {
      errors["confirmNewPassword"] = "Passwords does not match";
      valid = false;
    }

    setError(errors);
    return valid;
  };

  const handleResetPassword = async () => {
    try {
      const isValid = validate();
      if (isValid) {
        const data = {
          oldPassword: CryptoJS.AES.encrypt(
            profile?.oldPassword,
            "secret key 1"
          ).toString(),
          newPassword: CryptoJS.AES.encrypt(
            profile?.newPassword,
            "secret key 1"
          ).toString(),
          name: profile?.name,
        };
        const res = await apiCall("PATCH", "user/resetPassword", token, data);
        if (res?.data?.status === "success") {
          toast.success("Password Updated Successfuly!");
          setProfile({
            ...profile,
            newPassword: "",
            oldPassword: "",
            confirmNewPassword: "",
          });
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
    }
  };

  const handleProfileInfo = async () => {
    try {
      const data = {
        name: profile?.name,
      };
      const res = await apiCall("PATCH", "user", token, data);
      if (res?.data?.status === "success") {
        toast.success("Profile Updated Successfuly!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
    }
  };

  const handleProfileUpdate = async () => {
    if (profile?.oldPassword || profile?.newPassword) {
      const isValid = validate();
      if (isValid) {
        handleResetPassword();
      }
    }
    if (profile?.name !== auth?.user?.name) {
      handleProfileInfo();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Wrapper>
        <Box
          sx={{
            padding: "0px 10px",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          <Grid container columnSpacing={5}>
            <Grid
              item
              xs={12}
              sm={auth?.user?.role === "user" ? 4 : 12}
              md={auth?.user?.role === "user" ? 4 : 12}
            >
              <BoxShadowWrapper
                style={{
                  maxWidth: auth?.user?.role === "user" ? "100%" : "500px",
                }}
              >
                <Typography sx={{ fontSize: "22px" }}>User Profile</Typography>
                <CustomInputBox
                  id={"name"}
                  label={"Name"}
                  name={"name"}
                  inputStyle={{
                    width: { xs: "100%", sm: "100%", md: "100%" },
                  }}
                  value={profile?.name}
                  onChange={handleChange}
                  errorValue={error?.name}
                />
                <CustomInputBox
                  id={"email"}
                  label={"Email"}
                  name={"email"}
                  inputStyle={{
                    width: { xs: "100%", sm: "100%", md: "100%" },
                  }}
                  value={profile?.email}
                  onChange={handleChange}
                  readOnly={true}
                  errorValue={error?.email}
                />
                <CustomInputBox
                  id={"oldPassword"}
                  label={"Old Password"}
                  name={"oldPassword"}
                  inputStyle={{
                    width: { xs: "100%", sm: "100%", md: "100%" },
                  }}
                  value={profile?.oldPassword}
                  onChange={(e) => handleChange(e)}
                  errorValue={error?.oldPassword}
                  type={"password"}
                />
                <CustomInputBox
                  id={"newPassword"}
                  label={"New Password"}
                  name={"newPassword"}
                  inputStyle={{
                    width: { xs: "100%", sm: "100%", md: "100%" },
                  }}
                  value={profile?.newPassword}
                  onChange={(e) => handleChange(e)}
                  errorValue={error?.newPassword}
                  type={"password"}
                />
                <CustomInputBox
                  id={"confirmNewPassword"}
                  label={"Confirm New Password"}
                  name={"confirmNewPassword"}
                  inputStyle={{
                    width: { xs: "100%", sm: "100%", md: "100%" },
                  }}
                  value={profile?.confirmNewPassword}
                  onChange={(e) => handleChange(e)}
                  errorValue={error?.confirmNewPassword}
                  type={"password"}
                />
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
                  onClick={handleProfileUpdate}
                  disabled={
                    !profile?.email ||
                    // !profile?.oldPassword ||
                    // !profile?.newPassword ||
                    // !profile?.confirmNewPassword ||
                    !profile?.name
                  }
                >
                  Update
                </Button>
              </BoxShadowWrapper>
            </Grid>
            {auth?.user?.role === "user" && (
              <Grid item xs={12} sm={8} md={8}>
                <BoxShadowWrapper>
                  {orders?.length > 0 ? (
                    <TableComponent
                      title={"Orders"}
                      tableHeadings={tableHeadings}
                      tableHeadingsStyle={{ fontSize: "18px" }}
                      imageContainerStyle={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                      imageStyle={{ height: "100%", width: "100%", flex: 1 }}
                      tableBodyStyle={{ fontSize: "18px" }}
                      tableBodyData={ordersTableData}
                      isProfile={true}
                      isImage={false}
                      handleTableCellClick={handleOrderNavigate}
                      align={"center"}
                    />
                  ) : (
                    <Typography sx={{ fontSize: "20px" }}>
                      No Orders Found
                    </Typography>
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
            )}
          </Grid>
        </Box>
      </Wrapper>
    </>
  );
}

export default profile;
