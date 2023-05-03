import Head from "next/head";
import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper/Wrapper";
import { Box, CircularProgress, Typography } from "@mui/material";
import HomeCategoryCard from "../../../components/HomeCategoryCard/HomeCategoryCard";
import { toast } from "react-toastify";
import { apiCall } from "@/utils/apiCall";
import PaginationComponent from "../../../components/PaginationComponent/PaginationComponent";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [productLimit, setProductLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await apiCall(
          "GET",
          `category?page=${page}&limit=${productLimit}`
        );
        if (res?.data?.status === "success") {
          setCategories(res?.data?.Data?.categories);
          setTotalCount(res?.data?.Data?.totalCount);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [page]);
  return (
    <>
      <Head>
        <title>Categories Page</title>
      </Head>
      <Wrapper>
        <Box
          sx={{
            padding: "0px 10px",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            All Categories
          </Typography>
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
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {categories?.map((category) => (
                <HomeCategoryCard key={category?._id} category={category} />
              ))}
            </Box>
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

export default Categories;
