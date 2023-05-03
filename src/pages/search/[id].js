import Head from "next/head";
import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper/Wrapper";
import SearchProductList from "../../../components/SearchProductList/SearchProductList";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { apiCall } from "@/utils/apiCall";
import PaginationComponent from "../../../components/PaginationComponent/PaginationComponent";

function SearchPage() {
  const [page, setPage] = useState(1);
  const [productLimit, setProductLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const { id, name } = router.query;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (id) {
          const res = await apiCall(
            "GET",
            `search/${id}?page=${page}&limit=${productLimit}`
          );
          if (res?.data?.status === "success") {
            setProducts(res?.data?.Data?.[0]?.products);
            setTotalCount(res?.data?.Data?.[0]?.totalCount?.count);
          }
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  return (
    <>
      <Head>
        <title>Search Results</title>
      </Head>
      <Wrapper>
        <Box
          sx={{
            padding: "0px 10px",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          <SearchProductList
            type="search query"
            products={products}
            name={name}
          />
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

export default SearchPage;
