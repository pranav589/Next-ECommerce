import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { apiCall } from "@/utils/apiCall";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Wrapper from "@/components/Wrapper/Wrapper";
import CustomTabs from "@/components/CustomTabs/CustomTabs";
import BoxShadowWrapper from "@/components/BoxShadowWrapper";
import TableComponent from "@/components/TableComponent/TableComponent";
import PaginationComponent from "@/components/PaginationComponent/PaginationComponent";

function Orders() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [productLimit, setProductLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [ordersTableData, setOrdersTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const res = await apiCall(
          "GET",
          `order?page=${page}&limit=${productLimit}`,
          token
        );
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
                <Button onClick={() => handleTableCellClick(order?._id)}>
                  Details
                </Button>
              ),
            };
          });
          setOrdersTableData(formattedData);
          setOrders(res?.data?.Data);
        }
        setIsLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        setIsLoading(false);
      }
    };
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const tableHeadings = [
    "Order Id",
    "User",
    "Date",
    "Total",
    "Delivered",
    "Paid",
    "Action",
  ];

  const handleTableCellClick = (orderId) => {
    router.push(`/order/${orderId}`);
  };

  return (
    <Wrapper>
      <Box
        sx={{
          padding: "0px 10px",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <CustomTabs isAdminTabs={true} active={"Orders"}>
          <BoxShadowWrapper>
            <TableComponent
              title={"Order Items"}
              // tableHeadings={[]}
              tableHeadingsStyle={{ fontSize: "18px" }}
              imageContainerStyle={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
              }}
              imageStyle={{ height: "100%", width: "100%", flex: 1 }}
              tableBodyStyle={{ fontSize: "18px" }}
              tableBodyData={ordersTableData}
              tableHeadings={tableHeadings}
              isAdmin={true}
              type={"orders"}
              handleTableCellClick={handleTableCellClick}
              align={"center"}
              loadingState={isLoading}
            />
            {totalCount > 10 && (
              <PaginationComponent
                page={page}
                setPage={setPage}
                count={Math.ceil(totalCount / productLimit)}
              />
            )}
          </BoxShadowWrapper>
        </CustomTabs>
      </Box>
    </Wrapper>
  );
}

export default Orders;
