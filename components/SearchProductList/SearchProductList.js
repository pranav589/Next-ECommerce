import { apiCall } from "@/utils/apiCall";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductCard from "../ProductCard/ProductsCard";

function SearchProductList({ type, products, name }) {
  const router = useRouter();
  const handleCardClick = (product) => {
    router.push(`/product/${product?._id}`);
  };
  return (
    <Box>
      <Typography sx={{ fontSize: "24px" }}>
        Showing results for{" "}
        <span style={{ fontWeight: 600 }}>{name && name} </span>
        {type}
      </Typography>
      {products?.length === 0 ? (
        <Typography sx={{ fontSize: "20px", marginTop: "20px" }}>
          No Products Found
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {products?.map((product) => (
            <ProductCard
              key={product?._id}
              product={product}
              handleClick={handleCardClick}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default SearchProductList;
