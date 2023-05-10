import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function HomeCategoryCard({ category }) {
  const router = useRouter();

  return (
    <Paper
      sx={{
        width: { xs: "170px", sm: "170px", md: "250px" },
        height: { xs: "150px", sm: "150px", md: "200px" },
        marginRight: "15px",
        borderRadius: "8px",

        marginBottom: { xs: "40px", sm: "40px", md: "50px" },
        "&:hover": {
          transform: "scale(1.01)",
          background: "white",
          boxShadow: "1px 8px 8px whitesmoke",
          "-webkit-transition": "box-shadow .2s ease-in",
        },
        cursor: "pointer",
      }}
      onClick={() =>
        router.push({
          pathname: `/categories/${category?._id}`,
          query: {
            name: category?.name,
          },
        })
      }
    >
      <Box
        sx={{
          width: { xs: "170px", sm: "170px", md: "250px" },
          height: { xs: "150px", sm: "150px", md: "200px" },
          position: "relative",
        }}
      >
        <Image
          fill
          src={category?.image?.[0]?.url}
          // style={{ width: "100%", height: "100%" }}
          alt={category?.name}
        />
      </Box>

      <Typography
        sx={{
          fontSize: "22px",
          background: "#ffff",
          textAlign: "center",
        }}
      >
        {category?.name}
      </Typography>
    </Paper>
  );
}

export default HomeCategoryCard;
