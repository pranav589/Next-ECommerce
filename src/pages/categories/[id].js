import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { apiCall } from "@/utils/apiCall";
import Wrapper from "@/components/Wrapper/Wrapper";
import SearchProductList from "@/components/SearchProductList/SearchProductList";
import PaginationComponent from "@/components/PaginationComponent/PaginationComponent";

function CategoryProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const { id, name } = router.query;
  const [page, setPage] = useState(1);
  const [productLimit, setProductLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const res = await apiCall(
            "GET",
            `category/products/${id}?page=${page}&limit=${productLimit}`
          );
          if (res?.data?.status === "success") {
            setProducts(res?.data?.Data?.[0]?.products);
            setTotalCount(res?.data?.Data?.[0]?.totalCount?.count);
            setIsLoading(false);
          }
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setIsLoading(false);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);
  return (
    <>
      <Head>
        <title>Products List</title>
      </Head>
      <Wrapper>
        <Box
          sx={{
            padding: "0px 10px",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          {isLoading ? (
            <CircularProgress
              sx={{
                color: "#539165",
                marginLeft: "50%",
                mt: 3,
                mb: 2,
              }}
              size={32}
            />
          ) : (
            <SearchProductList
              type="category"
              products={products}
              name={name}
            />
          )}
          {totalCount > 10 && (
            <PaginationComponent
              page={page}
              setPage={setPage}
              count={Math.ceil(totalCount / productLimit)}
            />
          )}
        </Box>
      </Wrapper>
    </>
  );
}

export default CategoryProducts;
