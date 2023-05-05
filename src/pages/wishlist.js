import SearchProductList from "@/components/SearchProductList/SearchProductList";
import Wrapper from "@/components/Wrapper/Wrapper";
import { DataContext } from "@/store/GlobalState";

import { Box } from "@mui/material";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";

function WishListPage() {
  const { state } = useContext(DataContext);
  const { wishlist } = state;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (wishlist?.length > 0) {
      const mappedProducts = wishlist?.map((item) => item?.product);
      setProducts(mappedProducts);
    }
  }, [wishlist]);

  return (
    <>
      <Head>
        <title>WishList Page</title>
      </Head>
      <Wrapper>
        <Box
          sx={{
            padding: "0px 10px",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          <SearchProductList type="wishlisted items" products={products} />
        </Box>
      </Wrapper>
    </>
  );
}

export default WishListPage;
