import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { apiCall } from "@/utils/apiCall";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Wrapper from "@/components/Wrapper/Wrapper";
import CustomTabs from "@/components/CustomTabs/CustomTabs";
import BoxShadowWrapper from "@/components/BoxShadowWrapper";
import TableComponent from "@/components/TableComponent/TableComponent";
import PaginationComponent from "@/components/PaginationComponent/PaginationComponent";
import CustomModal from "@/components/Modal/CustomModal";

function Products() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [productLimit, setProductLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [productsTableData, setProductsTableData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productCallTrigger, setProductCallTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await apiCall(
          "GET",
          `product?page=${page}&limit=${productLimit}`
        );
        if (res?.data?.status === "success") {
          setTotalCount(res?.data?.totalCount);
          const formattedData = res?.data?.Data?.map((product) => {
            return {
              firstCol: product?.images?.[0]?.url,
              secondCol: product?.title,

              thirdCol: new Date(product?.updatedAt).toLocaleDateString(),

              fourthCol: `₹ ${product.price}`,
              fifthCol: product.sold,

              sixthCol: product.inStock,
              sevnthCol: (
                <Box>
                  <IconButton
                    onClick={() => {
                      handleDeleteModalOpen();
                      handleButtonClick(product);
                    }}
                    // disabled={user?.root === true}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      // handleClickOpen();
                      // handleButtonClick(product);
                      router.push(
                        `/adminDashboard/products/edit/${product?._id}`
                      );
                    }}
                    // disabled={user?.root === true}
                  >
                    <ModeEditIcon />
                  </IconButton>
                </Box>
              ),
            };
          });

          setProductsTableData(formattedData);
          setProducts(res?.data?.Data);
        }
        setIsLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [productCallTrigger, page]);

  const tableHeadings = [
    "Image",
    "Title",
    "Updated on",
    "Price",
    "Sold",
    "Available Stock",
    "Action",
  ];
  const handleButtonClick = (prod) => {
    setSelectedProduct({
      id: prod?._id,
    });
  };

  const handleProductDelete = async () => {
    try {
      const res = await apiCall(
        "DELETE",
        `product/${selectedProduct?.id}`,
        token
      );
      if (res?.data?.status === "success") {
        // setRoleUpdateCallTriggered(!roleUpdateCallTriggered);
        setProductCallTrigger(!productCallTrigger);
        toast.success("Product deleted!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
    }
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
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
        <CustomTabs isAdminTabs={true} active={"Products"}>
          <BoxShadowWrapper>
            <TableComponent
              title={"Products"}
              // tableHeadings={[]}
              tableHeadingsStyle={{ fontSize: "18px" }}
              imageContainerStyle={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
              }}
              imageStyle={{ height: "100%", width: "100%", flex: 1 }}
              tableBodyStyle={{ fontSize: "18px" }}
              tableBodyData={productsTableData}
              tableHeadings={tableHeadings}
              isAdmin={true}
              type={"products"}
              // handleTableCellClick={handleTableCellClick}
              align={"center"}
              isImage={true}
              headerButtonClick={() =>
                router.push("/adminDashboard/products/create")
              }
              loadingState={isLoading}
            />
            {totalCount > 10 && (
              <PaginationComponent
                page={page}
                setPage={setPage}
                count={Math.ceil(totalCount / productLimit)}
              />
            )}
            <CustomModal
              open={deleteModalOpen}
              setOpen={setDeleteModalOpen}
              modalTitle={"Delete Product?"}
              agreedButtonName={"Delete"}
              declineButtonName={"Cancel"}
              handleAgreedButtonClick={handleProductDelete}
              agreedButtonColor={"#539165"}
              declineButtonColor={"red"}
              showAgreedButton={true}
              showDeclineButton={true}
            >
              <Typography>
                Are you sure that you want to delete this user?
              </Typography>
            </CustomModal>
          </BoxShadowWrapper>
        </CustomTabs>
      </Box>
    </Wrapper>
  );
}

export default Products;
